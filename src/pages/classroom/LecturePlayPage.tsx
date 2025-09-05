import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Clock,
  Target,
  FileText,
  Download
} from 'lucide-react'
import VideoPlayer from '../../components/ui/VideoPlayer'
import ProgressBar from '../../components/ui/ProgressBar'
import { Lecture, Course, Progress } from '../../types'
import { useLearningStore } from '../../store/learningStore'
import { useAuthStore } from '../../store/authStore'

const LecturePlayPage = () => {
  const { courseId, lectureId } = useParams<{ courseId: string; lectureId: string }>()
  const navigate = useNavigate()
  const { updateProgress, completeLecture, progress } = useLearningStore()
  const { isAuthenticated } = useAuthStore()
  
  const [course, setCourse] = useState<Course | null>(null)
  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [currentProgress, setCurrentProgress] = useState<Progress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCompleting, setIsCompleting] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')

  // Mock 비디오 URL - 실제로는 서버에서 제공되어야 함
  const mockVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

  // 데이터 로드
  useEffect(() => {
    const loadLectureData = async () => {
      if (!courseId || !lectureId) return
      
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock 과정 데이터
      const mockCourse: Course = {
        id: courseId,
        title: 'Python 기초 프로그래밍',
        description: '프로그래밍 기초를 배우는 과정입니다',
        category: 'IT',
        level: 'beginner',
        duration: 20,
        rating: 4.8,
        studentCount: 1250,
        instructor: '김개발',
        price: 99000,
        tags: ['Python', '프로그래밍'],
        lectureCount: 5,
        createdAt: '2024-08-01T00:00:00Z',
        updatedAt: '2024-08-15T00:00:00Z'
      }

      // Mock 강의 목록
      const mockLectures: Lecture[] = [
        {
          id: '1-1',
          courseId,
          title: 'Python 소개 및 환경 설정',
          description: 'Python의 특징과 개발환경 설정 방법을 알아봅니다. 코딩을 시작하기 전에 필요한 모든 준비 과정을 다룹니다.',
          videoUrl: mockVideoUrl,
          duration: 720, // 12분
          order: 1
        },
        {
          id: '1-2',
          courseId,
          title: '변수와 데이터 타입',
          description: 'Python의 기본 데이터 타입과 변수 사용법을 학습합니다. 문자열, 숫자, 불린 등 기본 타입들을 실습합니다.',
          videoUrl: mockVideoUrl,
          duration: 900, // 15분
          order: 2
        },
        {
          id: '1-3',
          courseId,
          title: '조건문과 반복문',
          description: 'if문, for문, while문을 활용한 프로그램 제어를 배웁니다. 실제 예제를 통해 실습합니다.',
          videoUrl: mockVideoUrl,
          duration: 1080, // 18분
          order: 3
        },
        {
          id: '1-4',
          courseId,
          title: '함수 정의와 사용',
          description: '함수를 만들고 사용하는 방법을 실습합니다. 매개변수와 반환값의 개념을 이해합니다.',
          videoUrl: mockVideoUrl,
          duration: 960, // 16분
          order: 4
        },
        {
          id: '1-5',
          courseId,
          title: '리스트와 딕셔너리',
          description: 'Python의 핵심 자료구조인 리스트와 딕셔너리를 다룹니다. 데이터를 효율적으로 관리하는 방법을 학습합니다.',
          videoUrl: mockVideoUrl,
          duration: 1140, // 19분
          order: 5
        }
      ]

      const currentLecture = mockLectures.find(l => l.id === lectureId)
      const lectureProgress = progress[courseId]?.find(p => p.lectureId === lectureId)

      setCourse(mockCourse)
      setLectures(mockLectures)
      setLecture(currentLecture || null)
      setCurrentProgress(lectureProgress || null)
      setIsLoading(false)
    }

    if (isAuthenticated) {
      loadLectureData()
    }
  }, [courseId, lectureId, isAuthenticated, progress])

  // 진도율 업데이트 핸들러
  const handleProgress = async (currentTime: number, totalTime: number) => {
    if (!lecture || !courseId) return
    
    await updateProgress(lecture.id, currentTime, totalTime)
    
    // 현재 진도율 업데이트
    setCurrentProgress({
      id: `progress-${lecture.id}`,
      userId: 'current-user',
      courseId,
      lectureId: lecture.id,
      currentTime,
      totalTime,
      lastWatchedAt: new Date().toISOString()
    })
  }

  // 강의 완료 핸들러
  const handleComplete = async () => {
    if (!lecture || !courseId) return
    
    setIsCompleting(true)
    const success = await completeLecture(lecture.id)
    
    if (success) {
      // 다음 강의로 자동 이동
      const currentIndex = lectures.findIndex(l => l.id === lecture.id)
      const nextLecture = lectures[currentIndex + 1]
      
      if (nextLecture) {
        setTimeout(() => {
          navigate(`/classroom/course/${courseId}/lecture/${nextLecture.id}`)
        }, 1500)
      } else {
        // 마지막 강의인 경우 강의실로 이동
        setTimeout(() => {
          navigate('/classroom')
        }, 1500)
      }
    }
    
    setIsCompleting(false)
  }

  // 이전/다음 강의 이동
  const navigateToLecture = (direction: 'prev' | 'next') => {
    if (!lecture || !courseId) return
    
    const currentIndex = lectures.findIndex(l => l.id === lecture.id)
    const targetIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1
    const targetLecture = lectures[targetIndex]
    
    if (targetLecture) {
      navigate(`/classroom/course/${courseId}/lecture/${targetLecture.id}`)
    }
  }

  // 강의 시간 포맷팅
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (hours > 0) {
      return `${hours}시간 ${remainingMinutes}분`
    }
    return `${minutes}분`
  }

  // 진도율 계산
  const progressPercent = currentProgress 
    ? Math.round((currentProgress.currentTime / currentProgress.totalTime) * 100)
    : 0

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">로그인이 필요합니다</h3>
          <p className="text-neutral-600 mb-4">강의를 시청하려면 먼저 로그인해주세요</p>
          <Link to="/login" className="btn btn-primary">
            로그인하기
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">강의를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!course || !lecture) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">강의를 찾을 수 없습니다</h3>
          <p className="text-neutral-600 mb-4">요청하신 강의가 존재하지 않거나 접근 권한이 없습니다</p>
          <Link to="/classroom" className="btn btn-primary">
            강의실로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const currentIndex = lectures.findIndex(l => l.id === lecture.id)
  const prevLecture = lectures[currentIndex - 1]
  const nextLecture = lectures[currentIndex + 1]

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* 헤더 */}
      <div className="bg-neutral-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/classroom')}
              className="flex items-center space-x-2 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>강의실로 돌아가기</span>
            </button>
            
            <div className="border-l border-neutral-600 pl-4">
              <h1 className="text-lg font-semibold">{course.title}</h1>
              <p className="text-sm text-neutral-400">
                {currentIndex + 1}강 / {lectures.length}강
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-neutral-400">학습 진도</p>
              <p className="text-lg font-semibold">{progressPercent}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* 메인 비디오 영역 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 비디오 플레이어 */}
          <div className="aspect-video">
            <VideoPlayer
              src={lecture.videoUrl}
              title={lecture.title}
              onProgress={handleProgress}
              onComplete={handleComplete}
              initialTime={currentProgress?.currentTime || 0}
              className="w-full h-full"
            />
          </div>

          {/* 강의 정보 */}
          <div className="card bg-white">
            <div className="card-body">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">{lecture.title}</h2>
                  <p className="text-neutral-600 leading-relaxed">{lecture.description}</p>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-600">{formatDuration(lecture.duration)}</span>
                </div>
              </div>

              {/* 진도율 */}
              <div className="mb-6">
                <ProgressBar
                  value={progressPercent}
                  label="학습 진도"
                  color={progressPercent >= 80 ? 'green' : progressPercent >= 50 ? 'blue' : 'yellow'}
                  size="md"
                />
              </div>

              {/* 학습 완료 버튼 */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                  {progressPercent >= 80 ? (
                    <span className="text-green-600 font-medium">✅ 완료 조건 충족 (80% 이상 시청)</span>
                  ) : (
                    <span>완료하려면 80% 이상 시청해주세요</span>
                  )}
                </div>
                
                <button
                  onClick={handleComplete}
                  disabled={progressPercent < 80 || isCompleting}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    progressPercent >= 80 && !isCompleting
                      ? 'bg-success text-white hover:bg-success/90 hover:shadow-sm'
                      : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {isCompleting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-600 rounded-full animate-spin"></div>
                      <span>완료 처리 중...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>학습 완료</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 학습 목표 */}
          <div className="card bg-white">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                학습 목표
              </h3>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>Python의 기본 개념과 특징을 이해할 수 있습니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>개발환경을 직접 설정하고 활용할 수 있습니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>기본 코딩 실습을 통해 프로그래밍 감각을 기를 수 있습니다</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 강의 네비게이션 */}
          <div className="card bg-white">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">강의 이동</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigateToLecture('prev')}
                  disabled={!prevLecture}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    prevLecture 
                      ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                      : 'bg-neutral-50 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">이전 강의</p>
                    <p className="text-xs truncate">{prevLecture?.title || '없음'}</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigateToLecture('next')}
                  disabled={!nextLecture}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    nextLecture 
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-neutral-50 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">다음 강의</p>
                    <p className="text-xs truncate">{nextLecture?.title || '마지막 강의입니다'}</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 강의 목록 */}
          <div className="card bg-white">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">전체 강의</h3>
              
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {lectures.map((lectureItem, index) => (
                  <button
                    key={lectureItem.id}
                    onClick={() => navigate(`/classroom/course/${courseId}/lecture/${lectureItem.id}`)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      lectureItem.id === lecture.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{lectureItem.title}</p>
                        <p className="text-xs opacity-75">{formatDuration(lectureItem.duration)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 학습 자료 */}
          <div className="card bg-white">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                학습 자료
              </h3>
              
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm">강의 슬라이드.pdf</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm">실습 코드.py</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm">참고 자료.txt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LecturePlayPage