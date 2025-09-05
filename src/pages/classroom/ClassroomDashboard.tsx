// React 훅 및 라우터 import
import { useEffect, useMemo, useCallback } from 'react'
import { Navigate, Link } from 'react-router-dom'

// 아이콘 라이브러리 import
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  MessageCircle,
  Package
} from 'lucide-react'

// 상태 관리 스토어 import
import { useAuthStore } from '../../store/authStore'
import { useLearningStore } from '../../store/learningStore'

// UI 컴포넌트 import
import StatsCard from '../../components/ui/StatsCard'
import OptimizedCourseItem from '../../components/ui/OptimizedCourseItem'
import LoadingSkeleton from '../../components/ui/LoadingSkeleton'

/**
 * 강의실 대시보드 컴포넌트
 * 사용자의 학습 현황을 종합적으로 보여주는 메인 페이지
 * - 학습 통계 카드 (수강중/완료/진도율/수료증)
 * - 진행 중인 강의 목록
 * - 완료된 강의 목록
 * - 최근 학습 활동
 * - 빠른 메뉴 (Q&A, 주문배송조회)
 */
const ClassroomDashboard = () => {
  const { isAuthenticated, user } = useAuthStore()
  const { 
    enrolledCourses, 
    certificates, 
    isLoading, 
    loadCourseProgress 
  } = useLearningStore()

  // 과정 진행률 로드 (메모이제이션으로 최적화)
  const loadProgress = useCallback(() => {
    if (isAuthenticated && user) {
      loadCourseProgress(user.id)
    }
  }, [isAuthenticated, user, loadCourseProgress])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  // 통계 계산 (useMemo로 최적화)
  const courseStats = useMemo(() => {
    const inProgressCourses = enrolledCourses.filter(course => !course.isCompleted)
    const completedCourses = enrolledCourses.filter(course => course.isCompleted)
    const totalProgress = enrolledCourses.length > 0 
      ? Math.round(enrolledCourses.reduce((sum, course) => sum + course.progressPercentage, 0) / enrolledCourses.length)
      : 0

    return {
      inProgressCourses,
      completedCourses,
      totalProgress
    }
  }, [enrolledCourses])

  // 최근 학습 과정 (useMemo로 최적화)
  const recentCourses = useMemo(() => {
    return [...enrolledCourses]
      .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())
      .slice(0, 3)
  }, [enrolledCourses])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 스켈레톤 */}
        <div className="mb-8">
          <LoadingSkeleton variant="text" className="h-8 w-48 mb-2" />
          <LoadingSkeleton variant="text" className="h-5 w-96" />
        </div>

        {/* 통계 카드 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <LoadingSkeleton variant="stats" count={4} />
        </div>

        {/* 강의 목록 스켈레톤 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <div className="card-body">
              <LoadingSkeleton variant="text" className="h-6 w-32 mb-6" />
              <LoadingSkeleton variant="card" count={3} />
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <LoadingSkeleton variant="text" className="h-6 w-32 mb-6" />
              <LoadingSkeleton variant="card" count={2} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">나의 강의실</h1>
            <p className="text-neutral-600 dark:text-neutral-400">안녕하세요 {user?.name}님, 오늘도 학습에 열정을 보여주세요!</p>
          </div>
          
          {/* 빠른 메뉴 */}
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Link
              to="/classroom/qna"
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              질문과 답변
            </Link>
            <Link
              to="/classroom/orders"
              className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <Package className="w-4 h-4" />
              주문배송조회
            </Link>
          </div>
        </div>
      </div>

      {/* 학습 현황 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="수강 중인 과정"
          value={courseStats.inProgressCourses.length}
          icon={<BookOpen className="w-6 h-6" />}
          color="blue"
          trend={{ value: 2, direction: 'up' }}
        />
        
        <StatsCard
          title="완료한 과정"
          value={courseStats.completedCourses.length}
          icon={<Award className="w-6 h-6" />}
          color="green"
          trend={{ value: 1, direction: 'up' }}
        />
        
        <StatsCard
          title="전체 진도율"
          value={`${courseStats.totalProgress}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
          trend={{ value: 5, direction: 'up' }}
        />
        
        <Link to="/certificates">
          <StatsCard
            title="수료증"
            value={certificates.length}
            icon={<Award className="w-6 h-6" />}
            color="orange"
            className="transition-transform hover:scale-105"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 진행 중인 강의 */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">진행 중인 강의</h2>
              <span className="text-sm text-neutral-500">{courseStats.inProgressCourses.length}개 과정</span>
            </div>
            
            {courseStats.inProgressCourses.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500 mb-4">진행 중인 강의가 없습니다</p>
                <Link to="/courses" className="btn btn-primary">
                  수강신청하기
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {courseStats.inProgressCourses.map((course) => (
                  <OptimizedCourseItem
                    key={course.courseId}
                    course={course}
                    variant="progress"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 완료된 강의 */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">완료된 강의</h2>
              <span className="text-sm text-neutral-500">{courseStats.completedCourses.length}개 과정</span>
            </div>
            
            {courseStats.completedCourses.length === 0 ? (
              <div className="text-center py-8">
                <Award className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">완료한 강의가 없습니다</p>
              </div>
            ) : (
              <div className="space-y-4">
                {courseStats.completedCourses.map((course) => {
                  const certificate = certificates.find(cert => cert.courseId === course.courseId)
                  
                  return (
                    <OptimizedCourseItem
                      key={course.courseId}
                      course={course}
                      certificate={certificate}
                      variant="completed"
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 최근 학습 활동 */}
      {recentCourses.length > 0 && (
        <div className="mt-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">최근 학습 활동</h2>
              
              <div className="space-y-3">
                {recentCourses.map((course) => (
                  <OptimizedCourseItem
                    key={course.courseId}
                    course={course}
                    variant="recent"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassroomDashboard