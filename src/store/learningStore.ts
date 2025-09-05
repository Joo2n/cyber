import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Course, CourseProgress, Lecture, Progress, Certificate } from '../types'

interface LearningState {
  // 상태
  enrolledCourses: CourseProgress[]
  currentCourse: Course | null
  currentLecture: Lecture | null
  progress: { [courseId: string]: Progress[] }
  certificates: Certificate[]
  isLoading: boolean
  error: string | null

  // 액션
  enrollCourse: (courseId: string) => Promise<boolean>
  updateProgress: (lectureId: string, currentTime: number, totalTime: number) => Promise<void>
  completeLecture: (lectureId: string) => Promise<boolean>
  loadCourseProgress: (userId: string) => Promise<void>
  setCurrentCourse: (course: Course | null) => void
  setCurrentLecture: (lecture: Lecture | null) => void
  generateCertificate: (courseId: string) => Promise<Certificate | null>
  clearError: () => void
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      enrolledCourses: [],
      currentCourse: null,
      currentLecture: null,
      progress: {},
      certificates: [],
      isLoading: false,
      error: null,

      // 수강신청
      enrollCourse: async (courseId: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // Mock API 호출 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const { enrolledCourses } = get()
          
          // 이미 수강 중인지 확인
          const alreadyEnrolled = enrolledCourses.some(course => course.courseId === courseId)
          if (alreadyEnrolled) {
            throw new Error('이미 수강 중인 과정입니다')
          }

          // 새로운 수강 과정 추가
          const newCourseProgress: CourseProgress = {
            courseId,
            userId: 'current-user', // 실제로는 authStore에서 가져와야 함
            enrolledAt: new Date().toISOString(),
            totalLectures: 10, // Mock 데이터
            completedLectures: 0,
            totalDuration: 3600, // 1시간 (초)
            watchedDuration: 0,
            progressPercentage: 0,
            lastAccessedAt: new Date().toISOString(),
            isCompleted: false
          }

          set({
            enrolledCourses: [...enrolledCourses, newCourseProgress],
            isLoading: false,
            error: null
          })
          
          return true
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '수강신청 중 오류가 발생했습니다'
          set({ 
            isLoading: false, 
            error: errorMessage
          })
          return false
        }
      },

      // 진도율 업데이트
      updateProgress: async (lectureId: string, currentTime: number, totalTime: number) => {
        const { progress, currentCourse } = get()
        
        if (!currentCourse) return

        try {
          const courseProgress = progress[currentCourse.id] || []
          const lectureProgressIndex = courseProgress.findIndex(p => p.lectureId === lectureId)
          
          const progressData: Progress = {
            id: `progress-${lectureId}`,
            userId: 'current-user',
            courseId: currentCourse.id,
            lectureId,
            currentTime,
            totalTime,
            lastWatchedAt: new Date().toISOString()
          }

          let updatedProgress
          if (lectureProgressIndex >= 0) {
            // 기존 진도 업데이트
            updatedProgress = [...courseProgress]
            updatedProgress[lectureProgressIndex] = progressData
          } else {
            // 새 진도 추가
            updatedProgress = [...courseProgress, progressData]
          }

          set({
            progress: {
              ...progress,
              [currentCourse.id]: updatedProgress
            }
          })

          // 강의 완료 체크 (80% 이상 시청 시 완료)
          if (currentTime / totalTime >= 0.8) {
            await get().completeLecture(lectureId)
          }
        } catch (error) {
          console.error('진도율 업데이트 오류:', error)
        }
      },

      // 강의 완료
      completeLecture: async (lectureId: string) => {
        const { progress, currentCourse, enrolledCourses } = get()
        
        if (!currentCourse) return false

        try {
          // 진도에 완료 표시
          const courseProgress = progress[currentCourse.id] || []
          const updatedProgress = courseProgress.map(p => 
            p.lectureId === lectureId 
              ? { ...p, completedAt: new Date().toISOString() }
              : p
          )

          // 수강 과정 진도율 업데이트
          const completedLecturesCount = updatedProgress.filter(p => p.completedAt).length
          const progressPercentage = Math.round((completedLecturesCount / 10) * 100) // Mock: 총 10개 강의

          const updatedEnrolledCourses = enrolledCourses.map(course => 
            course.courseId === currentCourse.id
              ? {
                  ...course,
                  completedLectures: completedLecturesCount,
                  progressPercentage,
                  isCompleted: progressPercentage >= 100,
                  completedAt: progressPercentage >= 100 ? new Date().toISOString() : undefined,
                  lastAccessedAt: new Date().toISOString()
                }
              : course
          )

          set({
            progress: {
              ...progress,
              [currentCourse.id]: updatedProgress
            },
            enrolledCourses: updatedEnrolledCourses
          })

          // 과정 완료 시 수료증 자동 생성
          if (progressPercentage >= 100) {
            await get().generateCertificate(currentCourse.id)
          }

          return true
        } catch (error) {
          console.error('강의 완료 처리 오류:', error)
          return false
        }
      },

      // 수강 진도 로드
      loadCourseProgress: async (userId: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // Mock API 호출 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 800))
          
          // Mock 데이터 로드 (실제로는 서버에서 가져와야 함)
          const mockEnrolledCourses: CourseProgress[] = [
            {
              courseId: '1',
              userId,
              enrolledAt: '2024-08-01T00:00:00Z',
              totalLectures: 10,
              completedLectures: 8,
              totalDuration: 3600,
              watchedDuration: 2880,
              progressPercentage: 80,
              lastAccessedAt: '2024-08-19T10:00:00Z',
              isCompleted: false
            },
            {
              courseId: '2',
              userId,
              enrolledAt: '2024-07-15T00:00:00Z',
              totalLectures: 8,
              completedLectures: 8,
              totalDuration: 2400,
              watchedDuration: 2400,
              progressPercentage: 100,
              lastAccessedAt: '2024-08-10T15:30:00Z',
              isCompleted: true,
              completedAt: '2024-08-10T15:30:00Z'
            }
          ]

          const mockCertificates: Certificate[] = [
            {
              id: 'cert-1',
              userId,
              courseId: '2',
              certificateNumber: 'TP-2024-001',
              issuedAt: '2024-08-10T15:30:00Z',
              templateType: 'standard'
            }
          ]

          set({
            enrolledCourses: mockEnrolledCourses,
            certificates: mockCertificates,
            isLoading: false,
            error: null
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '학습 정보 로드 중 오류가 발생했습니다'
          set({ 
            isLoading: false, 
            error: errorMessage
          })
        }
      },

      // 현재 과정 설정
      setCurrentCourse: (course: Course | null) => {
        set({ currentCourse: course })
      },

      // 현재 강의 설정
      setCurrentLecture: (lecture: Lecture | null) => {
        set({ currentLecture: lecture })
      },

      // 수료증 생성
      generateCertificate: async (courseId: string) => {
        set({ isLoading: true, error: null })
        
        try {
          // Mock API 호출 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          const { certificates } = get()
          
          // 이미 수료증이 있는지 확인
          const existingCertificate = certificates.find(cert => cert.courseId === courseId)
          if (existingCertificate) {
            set({ isLoading: false })
            return existingCertificate
          }

          // 새 수료증 생성
          const newCertificate: Certificate = {
            id: `cert-${Date.now()}`,
            userId: 'current-user',
            courseId,
            certificateNumber: `TP-${new Date().getFullYear()}-${String(certificates.length + 1).padStart(3, '0')}`,
            issuedAt: new Date().toISOString(),
            templateType: 'standard'
          }

          set({
            certificates: [...certificates, newCertificate],
            isLoading: false,
            error: null
          })

          return newCertificate
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '수료증 생성 중 오류가 발생했습니다'
          set({ 
            isLoading: false, 
            error: errorMessage
          })
          return null
        }
      },

      // 에러 초기화
      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'learning-storage',
      partialize: (state) => ({
        enrolledCourses: state.enrolledCourses,
        progress: state.progress,
        certificates: state.certificates,
        // currentCourse, currentLecture, isLoading, error는 저장하지 않음
      }),
    }
  )
)