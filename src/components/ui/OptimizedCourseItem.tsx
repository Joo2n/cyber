import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Play, Award, Clock, Download, ChevronRight } from 'lucide-react'
import ProgressBar from './ProgressBar'

interface CourseItemProps {
  course: {
    courseId: string
    progressPercentage: number
    completedLectures: number
    totalLectures: number
    lastAccessedAt: string
    isCompleted: boolean
    completedAt?: string
  }
  certificate?: {
    courseId: string
    issuedAt: string
    certificateUrl: string
  }
  variant?: 'progress' | 'completed' | 'recent'
}

/**
 * 최적화된 과정 아이템 컴포넌트
 * React.memo로 불필요한 리렌더링 방지
 */
const OptimizedCourseItem: React.FC<CourseItemProps> = memo(({
  course,
  certificate,
  variant = 'progress'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'completed':
        return 'border-green-200 bg-green-50/50'
      case 'recent':
        return 'hover:bg-neutral-50'
      default:
        return 'border-neutral-200 hover:border-primary/30'
    }
  }

  const getProgressColor = () => {
    if (course.progressPercentage >= 80) return 'green'
    if (course.progressPercentage >= 50) return 'blue'
    return 'yellow'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (variant === 'recent') {
    return (
      <Link
        to={`/classroom/course/${course.courseId}/lecture/1-1`}
        className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${
            course.isCompleted ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {course.isCompleted ? (
              <Award className="w-5 h-5 text-green-600" />
            ) : (
              <Clock className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-neutral-900">
              {`과정 ${course.courseId}: 기본 교육과정`}
            </h3>
            <p className="text-sm text-neutral-500">
              {formatDate(course.lastAccessedAt)} • {course.progressPercentage}% 완료
            </p>
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-neutral-400" />
      </Link>
    )
  }

  return (
    <div className={`p-4 border rounded-lg transition-colors ${getVariantStyles()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-900 mb-1">
            {`과정 ${course.courseId}: 기본 교육과정`}
          </h3>
          <p className="text-sm text-neutral-600">
            {variant === 'completed' ? (
              <>완료일: {course.completedAt ? formatDate(course.completedAt) : '-'}</>
            ) : (
              <>
                {course.completedLectures}/{course.totalLectures}강 완료 • 
                마지막 학습: {formatDate(course.lastAccessedAt)}
              </>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {variant === 'completed' ? (
            <>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                완료
              </span>
              {certificate && (
                <button className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm transition-colors">
                  <Download className="w-4 h-4" />
                  <span>수료증</span>
                </button>
              )}
            </>
          ) : (
            <Link
              to={`/classroom/course/${course.courseId}/lecture/1-1`}
              className="flex items-center space-x-1 text-primary hover:text-primary-dark text-sm transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>이어보기</span>
            </Link>
          )}
        </div>
      </div>
      
      <ProgressBar
        value={variant === 'completed' ? 100 : course.progressPercentage}
        label={variant === 'completed' ? undefined : "진도율"}
        color={variant === 'completed' ? 'green' : getProgressColor()}
        size={variant === 'completed' ? 'sm' : 'md'}
        showPercentage={variant !== 'completed'}
      />
    </div>
  )
})

OptimizedCourseItem.displayName = 'OptimizedCourseItem'

export default OptimizedCourseItem
