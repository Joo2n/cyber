import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Eye, Pin, Paperclip } from 'lucide-react'
import { Notice } from '../../types'

interface NoticeCardProps {
  notice: Notice
  compact?: boolean
  className?: string
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  compact = false,
  className = ''
}) => {
  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return '오늘'
    } else if (diffDays === 1) {
      return '어제'
    } else if (diffDays < 7) {
      return `${diffDays}일 전`
    } else {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  // 카테고리별 색상
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '긴급':
        return 'bg-red-100 text-red-700'
      case '시스템':
        return 'bg-blue-100 text-blue-700'
      case '학습':
        return 'bg-green-100 text-green-700'
      case '이벤트':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  // 내용 미리보기 (compact 모드에서)
  const getPreview = (content: string, maxLength: number = 80) => {
    if (content.length <= maxLength) return content
    return content.slice(0, maxLength) + '...'
  }

  if (compact) {
    // 컴팩트 버전 (사이드바용)
    return (
      <Link 
        to={`/notices/${notice.id}`}
        className={`block p-3 hover:bg-neutral-50 rounded-lg transition-colors ${className}`}
      >
        <div className="flex items-start gap-3">
          {notice.important && (
            <Pin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <h3 className={`font-medium text-sm line-clamp-2 mb-1 ${
              notice.important ? 'text-red-700' : 'text-neutral-900'
            }`}>
              {notice.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>{formatDate(notice.createdAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {notice.viewCount}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // 전체 버전
  return (
    <div className={`card hover:shadow-medium transition-all duration-200 ${className}`}>
      <div className="card-body">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
              {notice.category}
            </span>
            {notice.important && (
              <div className="flex items-center gap-1 text-red-600">
                <Pin className="w-4 h-4" />
                <span className="text-xs font-medium">중요</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(notice.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{notice.viewCount}</span>
            </div>
          </div>
        </div>

        <Link to={`/notices/${notice.id}`} className="block group">
          <h2 className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors ${
            notice.important ? 'text-red-700' : 'text-neutral-900'
          }`}>
            {notice.title}
          </h2>
          
          <p className="text-neutral-600 line-clamp-2 mb-3">
            {getPreview(notice.content, 120)}
          </p>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span>작성자: {notice.author}</span>
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip className="w-4 h-4" />
                <span>{notice.attachments.length}개 첨부파일</span>
              </div>
            )}
          </div>
          
          <Link 
            to={`/notices/${notice.id}`}
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            자세히 보기 →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NoticeCard