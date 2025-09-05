import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Award,
  PlayCircle,
  Download,
  CheckCircle,
  Globe,
  Smartphone
} from 'lucide-react'
import { Course, Lecture } from '../../types'
import { useLearningStore } from '../../store/learningStore'
import { useAuthStore } from '../../store/authStore'

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { enrollCourse, enrolledCourses } = useLearningStore()
  const { isAuthenticated } = useAuthStore()
  const [course, setCourse] = useState<Course | null>(null)
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolling, setIsEnrolling] = useState(false)

  // Mock 데이터 - 실제로는 API에서 가져와야 함
  useEffect(() => {
    const loadCourseData = async () => {
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock 과정 데이터
      const mockCourse: Course = {
        id: id || '1',
        title: 'Python 기초 프로그래밍',
        description: '프로그래밍이 처음인 분을 위한 Python 기초 과정입니다. 변수, 함수, 제어문 등 기본 문법을 차근차근 배워보세요. 실습 위주의 강의로 실제 코딩 능력을 기를 수 있습니다.',
        category: 'IT',
        level: 'beginner',
        duration: 20,
        rating: 4.8,
        studentCount: 1250,
        instructor: '김개발',
        price: 99000,
        tags: ['Python', '프로그래밍', '기초'],
        lectureCount: 15,
        isPopular: true,
        hasQuiz: true,
        hasCertificate: true,
        createdAt: '2024-08-01T00:00:00Z',
        updatedAt: '2024-08-15T00:00:00Z'
      }

      // Mock 강의 목록
      const mockLectures: Lecture[] = [
        {
          id: '1-1',
          courseId: id || '1',
          title: '프로그래밍과 Python 소개',
          description: 'Python의 특징과 개발환경 설정 방법을 알아봅니다',
          videoUrl: '',
          duration: 720, // 12분
          order: 1
        },
        {
          id: '1-2',
          courseId: id || '1',
          title: '변수와 데이터 타입',
          description: 'Python의 기본 데이터 타입과 변수 사용법을 학습합니다',
          videoUrl: '',
          duration: 900, // 15분
          order: 2
        },
        {
          id: '1-3',
          courseId: id || '1',
          title: '조건문과 반복문',
          description: 'if문, for문, while문을 활용한 프로그램 제어를 배웁니다',
          videoUrl: '',
          duration: 1080, // 18분
          order: 3
        },
        {
          id: '1-4',
          courseId: id || '1',
          title: '함수 정의와 사용',
          description: '함수를 만들고 사용하는 방법을 실습합니다',
          videoUrl: '',
          duration: 960, // 16분
          order: 4
        },
        {
          id: '1-5',
          courseId: id || '1',
          title: '리스트와 딕셔너리',
          description: 'Python의 핵심 자료구조인 리스트와 딕셔너리를 다룹니다',
          videoUrl: '',
          duration: 1140, // 19분
          order: 5
        }
      ]

      setCourse(mockCourse)
      setLectures(mockLectures)
      setIsLoading(false)
    }

    if (id) {
      loadCourseData()
    }
  }, [id])

  // 수강신청 처리
  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (!course) return

    setIsEnrolling(true)
    const success = await enrollCourse(course.id)
    
    if (success) {
      // 수강신청 성공 시 나의 강의실로 이동
      setTimeout(() => {
        navigate('/classroom')
      }, 1500)
    }
    
    setIsEnrolling(false)
  }

  // 이미 신청한 과정인지 확인
  const isEnrolled = course ? enrolledCourses.some(c => c.courseId === course.id) : false

  // 강의 시간 포맷팅
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}분`
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">과정 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">과정을 찾을 수 없습니다</h3>
          <p className="text-neutral-600 mb-4">요청하신 과정이 존재하지 않거나 삭제되었습니다</p>
          <Link to="/courses" className="btn btn-primary">
            과정 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 뒤로 가기 */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>뒤로 가기</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-2">
          {/* 과정 정보 */}
          <div className="card mb-8">
            <div className="card-body">
              {/* 카테고리 및 레벨 */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {course.level === 'beginner' ? '초급' : course.level === 'intermediate' ? '중급' : '고급'}
                </span>
                <span className="text-sm text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                {course.isPopular && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                    🔥 인기
                  </span>
                )}
              </div>

              {/* 제목 */}
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">{course.title}</h1>

              {/* 평점 및 통계 */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-sm text-neutral-500">({course.studentCount.toLocaleString()}명 평가)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm text-neutral-600">{course.studentCount.toLocaleString()}명 수강</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-neutral-500" />
                  <span className="text-sm text-neutral-600">{course.duration}시간</span>
                </div>
              </div>

              {/* 설명 */}
              <div className="prose max-w-none mb-6">
                <p className="text-neutral-700 leading-relaxed">{course.description}</p>
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 강사 정보 */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">강사 소개</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{course.instructor[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{course.instructor}</p>
                    <p className="text-sm text-neutral-600">전문 강사</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 강의 목록 */}
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">강의 목록</h2>
              
              <div className="space-y-3">
                {lectures.map((lecture, index) => (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">{lecture.title}</h3>
                        <p className="text-sm text-neutral-600">{lecture.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-neutral-500">{formatDuration(lecture.duration)}</span>
                      <PlayCircle className="w-5 h-5 text-neutral-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 수강신청 카드 */}
          <div className="card sticky top-4">
            <div className="card-body">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-neutral-900 mb-2">
                  {course.price.toLocaleString()}원
                </p>
                <p className="text-sm text-neutral-600">일시불 결제</p>
              </div>

              <button
                onClick={handleEnroll}
                disabled={isEnrolled || isEnrolling}
                className={`w-full h-12 rounded-lg font-medium transition-all duration-200 mb-4 ${
                  isEnrolled
                    ? 'bg-success text-white cursor-default'
                    : isEnrolling
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-dark hover:shadow-sm'
                }`}
              >
                {isEnrolled ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>수강신청 완료</span>
                  </div>
                ) : isEnrolling ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-600 rounded-full animate-spin"></div>
                    <span>신청 처리 중...</span>
                  </div>
                ) : (
                  '수강신청하기'
                )}
              </button>

              {isEnrolled && (
                <Link
                  to="/classroom"
                  className="w-full h-10 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>강의실로 이동</span>
                </Link>
              )}

              {/* 과정 특징 */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-semibold text-neutral-900 mb-4">과정 포함 사항</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{course.lectureCount}개 강의 ({course.duration}시간)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span>평생 무제한 수강</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-green-600" />
                    <span>모바일/태블릿 지원</span>
                  </li>
                  {course.hasQuiz && (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>퀴즈 및 실습</span>
                    </li>
                  )}
                  {course.hasCertificate && (
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span>수료증 발급</span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-600" />
                    <span>강의 자료 다운로드</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 관련 과정 */}
          <div className="card">
            <div className="card-body">
              <h3 className="font-semibold text-neutral-900 mb-4">비슷한 과정</h3>
              <div className="space-y-3">
                <Link to="/courses/2" className="block p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <h4 className="font-medium text-neutral-900 mb-1">React 웹개발 완주 과정</h4>
                  <p className="text-sm text-neutral-600">4.9 ★ • 40시간 • 중급</p>
                </Link>
                <Link to="/courses/6" className="block p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <h4 className="font-medium text-neutral-900 mb-1">Excel 데이터 분석 마스터</h4>
                  <p className="text-sm text-neutral-600">4.8 ★ • 28시간 • 고급</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage