import React from 'react'
import { Star, Clock, Users, BookOpen } from 'lucide-react'
import { Course } from '../../types'
import SearchHighlight from './SearchHighlight'

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
  enrolled?: boolean
  searchTerm?: string
  className?: string
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  enrolled = false,
  searchTerm = '',
  className = ''
}) => {
  const levelColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-blue-100 text-blue-700',
    advanced: 'bg-purple-100 text-purple-700'
  }

  const levelText = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급'
  }

  const handleEnrollClick = () => {
    if (!enrolled && onEnroll) {
      onEnroll(course.id)
    }
  }

  return (
    <div className={`card hover:shadow-medium transition-all duration-300 ${className}`}>
      {/* 썸네일 */}
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-primary/10 rounded-t-lg relative overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen className="w-16 h-16 text-primary/30" />
          </div>
        )}
        
        {/* 인기 과정 배지 */}
        {course.isPopular && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
              🔥 인기
            </span>
          </div>
        )}
      </div>

      {/* 내용 */}
      <div className="card-body">
        {/* 카테고리 및 레벨 */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
            {levelText[course.level]}
          </span>
          <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
            {course.category}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="font-bold text-lg text-neutral-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          <SearchHighlight text={course.title} searchTerm={searchTerm} />
        </h3>

        {/* 설명 */}
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          <SearchHighlight text={course.description} searchTerm={searchTerm} />
        </p>

        {/* 통계 정보 */}
        <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}시간</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-neutral-700 font-medium">{course.rating}</span>
          </div>
        </div>

        {/* 수강생 수 및 신청 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <Users className="w-4 h-4" />
            <span>{course.studentCount.toLocaleString()}명 수강</span>
          </div>
          
          <button
            onClick={handleEnrollClick}
            disabled={enrolled}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              enrolled
                ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-dark hover:shadow-sm'
            }`}
          >
            {enrolled ? '신청완료' : '신청하기'}
          </button>
        </div>

        {/* 강의 수 표시 */}
        <div className="mt-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>총 {course.lectureCount}강</span>
            {course.hasQuiz && <span>퀴즈 포함</span>}
            {course.hasCertificate && <span>수료증 발급</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard