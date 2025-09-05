import React, { useState } from 'react'
import { ChevronDown, ThumbsUp, ThumbsDown, Eye } from 'lucide-react'
import { FAQ } from '../../types'

interface FAQItemProps {
  faq: FAQ
  expanded?: boolean
  onToggle: () => void
  onHelpfulClick?: (helpful: boolean) => void
  className?: string
}

const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  expanded = false,
  onToggle,
  onHelpfulClick,
  className = ''
}) => {
  const [helpfulClicked, setHelpfulClicked] = useState<boolean | null>(null)

  // 카테고리별 색상
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '로그인':
        return 'bg-blue-100 text-blue-700'
      case '강의':
        return 'bg-green-100 text-green-700'
      case '기술문의':
        return 'bg-purple-100 text-purple-700'
      case '수료증':
        return 'bg-orange-100 text-orange-700'
      case '결제':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  // 도움됨 클릭 핸들러
  const handleHelpfulClick = (helpful: boolean) => {
    if (helpfulClicked === null) {
      setHelpfulClicked(helpful)
      if (onHelpfulClick) {
        onHelpfulClick(helpful)
      }
    }
  }

  // 도움됨 비율 계산
  const totalVotes = faq.helpful + faq.notHelpful
  const helpfulRate = totalVotes > 0 ? Math.round((faq.helpful / totalVotes) * 100) : 0

  return (
    <div className={`border border-neutral-200 rounded-lg bg-white hover:shadow-sm transition-shadow ${className}`}>
      {/* 질문 헤더 */}
      <button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(faq.category)}`}>
              {faq.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Eye className="w-3 h-3" />
              <span>{faq.viewCount}</span>
            </div>
            {helpfulRate >= 80 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                👍 {helpfulRate}%
              </span>
            )}
          </div>
          <h3 className="font-semibold text-neutral-900 pr-4">
            {faq.question}
          </h3>
        </div>
        
        <ChevronDown 
          className={`w-5 h-5 text-neutral-500 transition-transform duration-200 flex-shrink-0 ${
            expanded ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* 답변 내용 */}
      {expanded && (
        <div className="border-t border-neutral-200 bg-neutral-50">
          <div className="p-4">
            {/* 답변 내용 */}
            <div 
              className="prose prose-sm max-w-none text-neutral-700 mb-4"
              dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br>') }}
            />

            {/* 도움됨 평가 */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-600">이 답변이 도움이 되었나요?</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleHelpfulClick(true)}
                    disabled={helpfulClicked !== null}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                      helpfulClicked === true
                        ? 'bg-green-100 text-green-700'
                        : helpfulClicked === null
                        ? 'hover:bg-green-50 text-neutral-600'
                        : 'text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>도움됨 ({faq.helpful + (helpfulClicked === true ? 1 : 0)})</span>
                  </button>
                  
                  <button
                    onClick={() => handleHelpfulClick(false)}
                    disabled={helpfulClicked !== null}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                      helpfulClicked === false
                        ? 'bg-red-100 text-red-700'
                        : helpfulClicked === null
                        ? 'hover:bg-red-50 text-neutral-600'
                        : 'text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>도움안됨 ({faq.notHelpful + (helpfulClicked === false ? 1 : 0)})</span>
                  </button>
                </div>
              </div>

              {/* 통계 정보 */}
              <div className="text-xs text-neutral-500">
                <span>마지막 업데이트: {new Date(faq.updatedAt).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>

            {/* 추가 도움말 */}
            {helpfulClicked === false && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">더 자세한 도움이 필요하신가요?</p>
                <div className="flex gap-2">
                  <button className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded transition-colors">
                    1:1 문의하기
                  </button>
                  <button className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded transition-colors">
                    전화 상담 신청
                  </button>
                </div>
              </div>
            )}

            {/* 감사 메시지 */}
            {helpfulClicked === true && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  👍 소중한 의견 감사합니다! 더 나은 서비스를 위해 노력하겠습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FAQItem