import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  User, 
  Pin, 
  Download,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Notice } from '../../types'

const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [notice, setNotice] = useState<Notice | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedNotices, setRelatedNotices] = useState<Notice[]>([])

  useEffect(() => {
    const loadNotice = async () => {
      if (!id) return
      
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock 공지사항 데이터
      const mockNotice: Notice = {
        id,
        title: '[긴급] 시스템 점검으로 인한 일시 서비스 중단 안내',
        content: `안녕하세요. 토마토패스 사이버연수원입니다.

서버 안정성 향상을 위한 시스템 점검이 예정되어 있어 안내드립니다.

**점검 상세 정보**
• 점검 일시: 2024년 8월 20일(화) 02:00 ~ 06:00 (4시간)
• 점검 내용: 서버 하드웨어 교체 및 소프트웨어 업데이트
• 영향 범위: 전체 서비스 이용 불가

**점검 중 이용 불가 서비스**
1. 웹사이트 전체 접속
2. 모바일 앱 이용
3. 강의 동영상 시청
4. 수강신청 및 결제
5. 고객지원 온라인 문의

**주의사항**
점검 시간 동안에는 웹사이트 접속이 불가능하며, 강의 시청도 중단됩니다. 
점검 시작 전에 학습 중인 강의가 있다면 미리 완료해주시기 바랍니다.

**문의사항**
점검과 관련된 문의사항이 있으시면 고객지원센터(1600-9922)로 연락주시기 바랍니다.
점검 시간 중에는 전화 문의만 가능합니다.

이용에 불편을 드려 죄송하며, 더욱 안정적인 서비스 제공을 위해 최선을 다하겠습니다.

감사합니다.`,
        category: '긴급',
        important: true,
        author: '관리자',
        createdAt: '2024-08-19T10:00:00Z',
        updatedAt: '2024-08-19T10:00:00Z',
        viewCount: 1245,
        attachments: ['system_maintenance_guide.pdf', 'backup_access_info.docx']
      }

      // Mock 관련 공지사항
      const mockRelatedNotices: Notice[] = [
        {
          id: '2',
          title: '정기 서버 점검 완료 안내',
          content: '7월 30일 새벽에 진행된 정기 서버 점검이 완료되었습니다.',
          category: '시스템',
          important: false,
          author: '기술팀',
          createdAt: '2024-07-30T08:00:00Z',
          updatedAt: '2024-07-30T08:00:00Z',
          viewCount: 234,
          attachments: []
        },
        {
          id: '3',
          title: '모바일 앱 업데이트 완료 안내 (v2.1.0)',
          content: '토마토패스 모바일 앱이 업데이트되었습니다.',
          category: '시스템',
          important: false,
          author: '개발팀',
          createdAt: '2024-08-17T09:15:00Z',
          updatedAt: '2024-08-17T09:15:00Z',
          viewCount: 656,
          attachments: []
        }
      ]
      
      setNotice(mockNotice)
      setRelatedNotices(mockRelatedNotices)
      setIsLoading(false)

      // 조회수 증가 (실제로는 API 호출)
      setTimeout(() => {
        setNotice(prev => prev ? { ...prev, viewCount: prev.viewCount + 1 } : null)
      }, 1000)
    }

    loadNotice()
  }, [id])

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

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 공유하기
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: notice?.title,
        text: notice?.title,
        url: window.location.href
      })
    } else {
      // 링크 복사
      navigator.clipboard.writeText(window.location.href)
      alert('링크가 복사되었습니다.')
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">공지사항을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <Pin className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">공지사항을 찾을 수 없습니다</h3>
          <p className="text-neutral-600 mb-4">요청하신 공지사항이 존재하지 않거나 삭제되었습니다</p>
          <Link to="/notices" className="btn btn-primary">
            공지사항 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 뒤로 가기 */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>목록으로 돌아가기</span>
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="card mb-8">
        <div className="card-body">
          {/* 헤더 */}
          <div className="border-b border-neutral-200 pb-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(notice.category)}`}>
                  {notice.category}
                </span>
                {notice.important && (
                  <div className="flex items-center gap-1 text-red-600">
                    <Pin className="w-4 h-4" />
                    <span className="text-sm font-medium">중요</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1 text-sm text-neutral-600 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>공유</span>
              </button>
            </div>

            <h1 className={`text-2xl font-bold mb-4 ${
              notice.important ? 'text-red-700' : 'text-neutral-900'
            }`}>
              {notice.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{notice.author}</span>
              </div>
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

          {/* 본문 */}
          <div className="prose prose-lg max-w-none mb-6">
            <div className="whitespace-pre-wrap leading-relaxed text-neutral-700">
              {notice.content}
            </div>
          </div>

          {/* 첨부파일 */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">첨부파일</h3>
              <div className="space-y-2">
                {notice.attachments.map((file, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors w-full text-left"
                  >
                    <Download className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium text-neutral-900">{file}</p>
                      <p className="text-sm text-neutral-500">클릭하여 다운로드</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-left">
          <ChevronLeft className="w-5 h-5 text-neutral-400" />
          <div className="min-w-0">
            <p className="text-sm text-neutral-500">이전 공지</p>
            <p className="font-medium text-neutral-900 truncate">이전 공지사항이 없습니다</p>
          </div>
        </button>
        
        <button className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-left justify-end">
          <div className="min-w-0 text-right">
            <p className="text-sm text-neutral-500">다음 공지</p>
            <p className="font-medium text-neutral-900 truncate">새로운 Python 고급 과정 오픈 안내</p>
          </div>
          <ChevronRight className="w-5 h-5 text-neutral-400" />
        </button>
      </div>

      {/* 관련 공지사항 */}
      {relatedNotices.length > 0 && (
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">관련 공지사항</h3>
            <div className="space-y-3">
              {relatedNotices.map((relatedNotice) => (
                <Link
                  key={relatedNotice.id}
                  to={`/notices/${relatedNotice.id}`}
                  className="block p-3 hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(relatedNotice.category)}`}>
                          {relatedNotice.category}
                        </span>
                      </div>
                      <h4 className="font-medium text-neutral-900 truncate">{relatedNotice.title}</h4>
                      <p className="text-sm text-neutral-500">{formatDate(relatedNotice.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-neutral-500 ml-4">
                      <Eye className="w-4 h-4" />
                      <span>{relatedNotice.viewCount}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoticeDetailPage