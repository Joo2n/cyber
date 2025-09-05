import React, { useState, useEffect, useMemo } from 'react'
import { Search, Filter, Pin, Calendar, Eye } from 'lucide-react'
import NoticeCard from '../../components/ui/NoticeCard'
import { Notice } from '../../types'

const NoticeListPage = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  const itemsPerPage = 10
  const categories = ['전체', '긴급', '시스템', '학습', '이벤트', '일반']

  // Mock 데이터
  useEffect(() => {
    const loadNotices = async () => {
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockNotices: Notice[] = [
        {
          id: '1',
          title: '[긴급] 시스템 점검으로 인한 일시 서비스 중단 안내',
          content: '안녕하세요. 토마토패스 사이버연수원입니다.\n\n서버 안정성 향상을 위한 시스템 점검이 예정되어 있어 안내드립니다.\n\n점검 일시: 2024년 8월 20일(화) 02:00 ~ 06:00 (4시간)\n점검 내용: 서버 하드웨어 교체 및 소프트웨어 업데이트\n영향 범위: 전체 서비스 이용 불가\n\n점검 시간 동안에는 웹사이트 접속이 불가능하며, 강의 시청도 중단됩니다. 이용에 불편을 드려 죄송합니다.',
          category: '긴급',
          important: true,
          author: '관리자',
          createdAt: '2024-08-19T10:00:00Z',
          updatedAt: '2024-08-19T10:00:00Z',
          viewCount: 1245,
          attachments: []
        },
        {
          id: '2',
          title: '새로운 Python 고급 과정 오픈 안내',
          content: '안녕하세요. 토마토패스 사이버연수원입니다.\n\n많은 분들이 요청해주신 Python 고급 과정이 드디어 오픈되었습니다!\n\n과정명: Python 고급 프로그래밍 및 데이터 분석\n강사: 김파이썬 (전 네이버 개발자)\n기간: 40시간 (총 25강)\n수강료: 199,000원 (런칭 기념 30% 할인)\n\n지금 바로 수강신청하시고 파이썬 전문가가 되어보세요!',
          category: '학습',
          important: false,
          author: '교육팀',
          createdAt: '2024-08-18T14:30:00Z',
          updatedAt: '2024-08-18T14:30:00Z',
          viewCount: 892,
          attachments: ['Python_advanced_curriculum.pdf']
        },
        {
          id: '3',
          title: '모바일 앱 업데이트 완료 안내 (v2.1.0)',
          content: '토마토패스 모바일 앱이 업데이트되었습니다.\n\n주요 변경사항:\n- 비디오 플레이어 성능 개선\n- 다운로드 강의 관리 기능 추가\n- 오프라인 시청 안정성 향상\n- 푸시 알림 설정 개선\n- 기타 버그 수정\n\n구글 플레이스토어와 앱스토어에서 업데이트해주세요.',
          category: '시스템',
          important: false,
          author: '개발팀',
          createdAt: '2024-08-17T09:15:00Z',
          updatedAt: '2024-08-17T09:15:00Z',
          viewCount: 656,
          attachments: []
        },
        {
          id: '4',
          title: '여름 휴가철 고객지원 운영시간 변경 안내',
          content: '여름 휴가철을 맞아 고객지원 운영시간이 일시 변경됩니다.\n\n변경 기간: 8월 15일(목) ~ 8월 25일(일)\n운영시간: 평일 10:00 ~ 17:00 (기존 09:00 ~ 18:00)\n주말 및 공휴일: 휴무\n\n긴급한 문의사항은 1:1 문의게시판을 이용해주세요. 순차적으로 답변드리겠습니다.',
          category: '일반',
          important: false,
          author: '고객지원팀',
          createdAt: '2024-08-14T16:00:00Z',
          updatedAt: '2024-08-14T16:00:00Z',
          viewCount: 423,
          attachments: []
        },
        {
          id: '5',
          title: '[이벤트] 여름 특별 할인 이벤트 진행 중!',
          content: '🌞 여름 특별 할인 이벤트를 진행합니다!\n\n이벤트 기간: 8월 1일 ~ 8월 31일\n할인 혜택:\n- 전체 과정 20% 할인\n- 2개 이상 구매 시 추가 10% 할인\n- 친구 추천 시 5,000원 쿠폰 지급\n\n이 기회를 놓치지 마세요! 지금 바로 수강신청하세요.',
          category: '이벤트',
          important: true,
          author: '마케팅팀',
          createdAt: '2024-08-01T00:00:00Z',
          updatedAt: '2024-08-01T00:00:00Z',
          viewCount: 2156,
          attachments: ['summer_event_details.pdf']
        },
        {
          id: '6',
          title: '정기 서버 점검 완료 안내',
          content: '7월 30일 새벽에 진행된 정기 서버 점검이 완료되었습니다.\n\n점검 내용:\n- 데이터베이스 최적화\n- 보안 패치 적용\n- 캐시 시스템 개선\n\n이제 더욱 빠르고 안정적인 서비스를 이용하실 수 있습니다.',
          category: '시스템',
          important: false,
          author: '기술팀',
          createdAt: '2024-07-30T08:00:00Z',
          updatedAt: '2024-07-30T08:00:00Z',
          viewCount: 234,
          attachments: []
        },
        {
          id: '7',
          title: '수료증 발급 시스템 개선 안내',
          content: '수료증 발급 시스템이 개선되었습니다.\n\n개선 사항:\n- 발급 속도 50% 향상\n- 새로운 디자인 템플릿 적용\n- PDF 품질 향상\n- 모바일에서도 바로 다운로드 가능\n\n이제 과정 완료 즉시 고품질 수료증을 받아보세요!',
          category: '학습',
          important: false,
          author: '교육팀',
          createdAt: '2024-07-25T11:30:00Z',
          updatedAt: '2024-07-25T11:30:00Z',
          viewCount: 567,
          attachments: ['certificate_sample.pdf']
        }
      ]
      
      setNotices(mockNotices)
      setIsLoading(false)
    }

    loadNotices()
  }, [])

  // 필터링 및 검색
  const filteredNotices = useMemo(() => {
    let filtered = notices

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(notice => notice.category === selectedCategory)
    }

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 중요 공지사항을 상단으로
    return filtered.sort((a, b) => {
      if (a.important && !b.important) return -1
      if (!a.important && b.important) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [notices, selectedCategory, searchQuery])

  // 페이지네이션
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">공지사항을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">공지사항</h1>
        <p className="text-neutral-600">토마토패스 사이버연수원의 최신 소식을 확인하세요</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="card mb-8">
        <div className="card-body">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="공지사항을 검색하세요"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                검색
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* 필터 옵션 */}
          {showFilters && (
            <div className="border-t border-neutral-200 pt-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-neutral-700">카테고리:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setCurrentPage(1)
                    }}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 결과 표시 */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-neutral-600">
          총 <span className="font-semibold text-neutral-900">{filteredNotices.length}</span>개의 공지사항
          {searchQuery && (
            <span className="ml-2 text-sm">
              '<span className="text-primary font-medium">{searchQuery}</span>' 검색 결과
            </span>
          )}
        </p>
      </div>

      {/* 공지사항 목록 */}
      {paginatedNotices.length === 0 ? (
        <div className="text-center py-16">
          <Pin className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">공지사항이 없습니다</h3>
          <p className="text-neutral-600">검색 조건을 변경해보세요</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 disabled:text-neutral-400 disabled:cursor-not-allowed"
            >
              이전
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 disabled:text-neutral-400 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

export default NoticeListPage