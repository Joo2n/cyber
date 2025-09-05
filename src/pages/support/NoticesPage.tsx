import { useState, useEffect } from 'react'
import { Search, Calendar, Pin, Eye, ChevronRight } from 'lucide-react'

/**
 * 공지사항 아이템 인터페이스
 */
interface NoticeItem {
  id: number
  title: string
  content: string
  createdAt: string
  viewCount: number
  isPinned: boolean
  category: string
  author: string
}

/**
 * 공지사항 페이지 컴포넌트
 * 시스템 공지사항과 중요한 안내사항을 표시하는 페이지
 */
const NoticesPage = () => {
  // 상태 관리
  const [notices, setNotices] = useState<NoticeItem[]>([])
  const [filteredNotices, setFilteredNotices] = useState<NoticeItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 카테고리 목록
  const categories = ['전체', '시스템', '교육과정', '이벤트', '점검', '업데이트']

  /**
   * 공지사항 목록 데이터 초기화
   */
  useEffect(() => {
    const mockNoticesData: NoticeItem[] = [
      {
        id: 1,
        title: '[중요] 2024년 상반기 시스템 정기점검 안내',
        content: `안녕하세요. 토마토패스 사이버연수원입니다.

서비스 품질 향상을 위한 시스템 정기점검을 실시합니다.

📅 점검 일시: 2024년 3월 30일(토) 오전 2시 ~ 오전 6시 (4시간)
🔧 점검 내용: 
- 서버 보안 업데이트
- 데이터베이스 최적화
- 강의 플레이어 성능 개선
- 모바일 앱 안정성 향상

⚠️ 점검 시간 중에는 다음 서비스가 일시 중단됩니다:
- 강의 시청
- 과제 제출
- 로그인/로그아웃
- 수료증 발급

점검 완료 후 더욱 안정적인 서비스를 제공하겠습니다.
이용에 불편을 드려 죄송합니다.

문의사항: support@tomatopass.com`,
        createdAt: '2024-03-25 10:00:00',
        viewCount: 1542,
        isPinned: true,
        category: '점검',
        author: '관리자'
      },
      {
        id: 2,
        title: '[신규] AI 프로그래밍 마스터클래스 개설 안내',
        content: `🤖 AI 시대를 선도할 개발자를 위한 특별한 과정이 출시되었습니다!

📚 과정명: AI 프로그래밍 마스터클래스
🎯 대상: Python 기초 지식이 있는 개발자
⏰ 총 40시간 (주 3회, 8주 과정)
💰 수강료: 300,000원 → 런칭 기념 240,000원 (20% 할인)

📖 커리큘럼:
1주차: 머신러닝 기초와 Scikit-learn
2주차: 딥러닝 이론과 TensorFlow
3주차: 자연어 처리 (NLP)
4주차: 컴퓨터 비전 (CV)
5주차: 강화학습 기초
6주차: ChatGPT API 활용
7주차: 실전 프로젝트 - AI 챗봇 개발
8주차: 모델 배포와 서비스화

🎁 특별 혜택:
- GPU 서버 무료 이용권 (3개월)
- 실습용 데이터셋 제공
- 1:1 멘토링 세션 (월 2회)
- 수료 후 취업 지원

📅 신청 기간: 2024년 3월 25일 ~ 4월 10일
📅 개강일: 2024년 4월 15일

지금 신청하고 AI 전문가로 거듭나세요!`,
        createdAt: '2024-03-25 14:30:00',
        viewCount: 892,
        isPinned: true,
        category: '교육과정',
        author: '교육팀'
      },
      {
        id: 3,
        title: '모바일 앱 v2.1.0 업데이트 안내',
        content: `📱 토마토패스 모바일 앱이 더욱 편리해집니다!

🆕 새로운 기능:
- 오프라인 강의 다운로드 (Wi-Fi 환경에서 미리 저장)
- 학습 진도율 위젯 추가
- 다크모드 지원
- 푸시 알림 세부 설정

🔧 개선사항:
- 동영상 재생 속도 개선 (로딩 시간 50% 단축)
- 배터리 사용량 최적화
- 안드로이드 14, iOS 17 호환성 확보
- 크래시 버그 수정

📲 업데이트 방법:
- Android: Play 스토어
- iOS: App Store

자동 업데이트를 활성화하시면 항상 최신 버전을 이용하실 수 있습니다.`,
        createdAt: '2024-03-22 11:15:00',
        viewCount: 467,
        isPinned: false,
        category: '업데이트',
        author: '개발팀'
      },
      {
        id: 4,
        title: '[이벤트] 봄맞이 학습 챌린지 이벤트 (3/20~4/20)',
        content: `🌸 봄과 함께 시작하는 학습 챌린지에 참여하세요!

🎯 챌린지 목표: 30일 동안 매일 1시간씩 학습하기

🏆 참여 혜택:
- 완주자 전원: 스타벅스 아메리카노 쿠폰
- 상위 10명: 교보문고 도서교환권 5만원
- 1등: 맥북 에어 M2 (1명)

📊 순위 기준:
- 학습 시간 (50%)
- 과제 완료율 (30%)
- 질문 및 답변 활동 (20%)

📅 이벤트 기간: 2024년 3월 20일 ~ 4월 20일
📅 결과 발표: 2024년 4월 25일

💡 참여 방법:
1. 이벤트 페이지에서 '참여하기' 클릭
2. 매일 최소 1시간 이상 학습
3. 학습 인증 완료

지금 바로 참여하고 봄의 에너지로 성장하세요!`,
        createdAt: '2024-03-20 09:00:00',
        viewCount: 1234,
        isPinned: false,
        category: '이벤트',
        author: '마케팅팀'
      },
      {
        id: 5,
        title: '강의 품질 향상을 위한 수강생 만족도 조사',
        content: `📝 더 나은 교육 서비스 제공을 위해 여러분의 의견을 듣고자 합니다.

🎯 조사 목적:
- 강의 내용 및 구성 개선
- 강사진 교육 품질 향상  
- 플랫폼 사용성 개선
- 신규 과정 개설 방향성 결정

⏰ 조사 기간: 2024년 3월 18일 ~ 3월 31일
📊 소요 시간: 약 5분
🎁 참여 혜택: 추첨을 통해 치킨 기프티콘 증정 (100명)

📋 조사 내용:
- 수강 중인 과정 만족도
- 강의 난이도 적절성
- 강사 만족도
- 플랫폼 편의성
- 개선 사항 및 건의사항

여러분의 소중한 의견이 더 좋은 교육 환경을 만드는 밑거름이 됩니다.

🔗 설문 참여: https://survey.tomatopass.com/satisfaction2024`,
        createdAt: '2024-03-18 15:45:00',
        viewCount: 678,
        isPinned: false,
        category: '시스템',
        author: '교육팀'
      },
      {
        id: 6,
        title: '개인정보 처리방침 개정 안내',
        content: `📋 개인정보 처리방침이 아래와 같이 개정됩니다.

🗓 시행일: 2024년 4월 1일

📝 주요 변경사항:

1. 개인정보 수집 항목 추가
   - 선택항목: 관심 분야, 학습 목적
   - 수집 목적: 맞춤형 교육 과정 추천

2. 개인정보 보유 기간 명확화
   - 회원탈퇴 후 3년 → 1년으로 단축
   - 학습 이력: 회원탈퇴 후 즉시 삭제

3. 제3자 제공 기준 강화
   - 사전 동의 절차 강화
   - 제공 목적 및 범위 명시

4. 개인정보 처리 위탁업체 현행화
   - 신규: 챗봇 서비스 업체
   - 삭제: SMS 발송 업체

전문은 홈페이지 하단 개인정보 처리방침에서 확인하실 수 있습니다.

문의: privacy@tomatopass.com`,
        createdAt: '2024-03-15 13:20:00',
        viewCount: 234,
        isPinned: false,
        category: '시스템',
        author: '법무팀'
      },
      {
        id: 7,
        title: '[완료] 결제 시스템 장애 복구 안내',
        content: `⚠️ 결제 시스템 일시 장애가 발생했으나, 현재 정상 복구되었습니다.

🕐 장애 발생 시간: 2024년 3월 12일 오후 2시 ~ 오후 4시 30분

🔧 장애 원인:
- 외부 PG사 서버 점검으로 인한 일시적 연결 불안정
- 트래픽 급증으로 인한 응답 지연

✅ 복구 완료:
- 모든 결제 수단 정상 작동
- 실패된 결제 건 자동 재처리 완료
- 중복 결제 발생 시 자동 환불 처리

📞 추가 문의:
- 고객센터: 1600-9922
- 이메일: billing@tomatopass.com

이용에 불편을 드려 진심으로 사과드립니다.`,
        createdAt: '2024-03-12 17:00:00',
        viewCount: 445,
        isPinned: false,
        category: '점검',
        author: '기술팀'
      },
      {
        id: 8,
        title: '2024년 1분기 인기 강의 TOP 10 발표',
        content: `🏆 2024년 1분기 가장 사랑받은 강의들을 발표합니다!

📊 집계 기간: 2024년 1월 ~ 3월
📈 기준: 수강생 수 + 평점 + 완주율 종합

🥇 1위: 웹 개발 입문 (React + Node.js)
   - 수강생: 2,847명 | 평점: 4.9/5.0

🥈 2위: 파이썬 데이터 분석 실무
   - 수강생: 2,134명 | 평점: 4.8/5.0

🥉 3위: 디지털 마케팅 전략
   - 수강생: 1,923명 | 평점: 4.7/5.0

4위: UX/UI 디자인 씽킹 (1,678명)
5위: 블록체인 개발 입문 (1,445명)
6위: 영상 편집 마스터클래스 (1,289명)
7위: 엑셀 데이터 분석 (1,156명)
8위: 포토샵 실무 디자인 (1,034명)
9위: 디지털 드로잉 기초 (967명)
10위: SNS 콘텐츠 제작 (889명)

🎉 TOP 10 강의 수강 시 특별 혜택:
- 수료증 프리미엄 템플릿 제공
- 수강 후기 작성 시 다음 강의 10% 할인

여러분의 관심과 사랑에 감사드립니다!`,
        createdAt: '2024-03-10 16:30:00',
        viewCount: 756,
        isPinned: false,
        category: '교육과정',
        author: '교육팀'
      }
    ]

    setNotices(mockNoticesData)
    setFilteredNotices(mockNoticesData)
    setIsLoading(false)
  }, [])

  /**
   * 검색 및 필터링 처리
   */
  useEffect(() => {
    let filtered = notices

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(notice => notice.category === selectedCategory)
    }

    // 고정 공지사항을 상단에, 그 다음은 최신순으로 정렬
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    setFilteredNotices(filtered)
  }, [notices, searchTerm, selectedCategory])

  /**
   * 공지사항 클릭 시 상세 보기
   */
  const openNoticeDetail = (notice: NoticeItem) => {
    setSelectedNotice(notice)
    // 조회수 증가
    setNotices(prev => prev.map(n => 
      n.id === notice.id 
        ? { ...n, viewCount: n.viewCount + 1 }
        : n
    ))
  }

  /**
   * 상세 보기 모달 닫기
   */
  const closeNoticeDetail = () => {
    setSelectedNotice(null)
  }

  /**
   * 날짜 포맷팅
   */
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          공지사항
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          토마토패스 사이버연수원의 최신 소식과 중요한 안내사항을 확인하세요.
        </p>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 검색 입력 */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="공지사항 제목이나 내용을 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 카테고리 필터 */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📢</div>
            <p className="text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotices.map((notice, index) => (
              <div
                key={notice.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                onClick={() => openNoticeDetail(notice)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {notice.isPinned && (
                        <Pin className="h-4 w-4 text-red-500 flex-shrink-0" />
                      )}
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                        {notice.category}
                      </span>
                      {notice.isPinned && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded text-xs font-medium">
                          중요
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {notice.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(notice.createdAt)}
                      </div>
                      <span>{notice.author}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {notice.viewCount.toLocaleString()}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {notice.content.slice(0, 150)}...
                    </p>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 공지사항 상세 모달 */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {selectedNotice.isPinned && (
                    <Pin className="h-4 w-4 text-red-500" />
                  )}
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                    {selectedNotice.category}
                  </span>
                  {selectedNotice.isPinned && (
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded text-xs font-medium">
                      중요
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedNotice.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>{selectedNotice.author}</span>
                  <span>{formatDate(selectedNotice.createdAt)}</span>
                  <span>조회 {selectedNotice.viewCount.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={closeNoticeDetail}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
              >
                ✕
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                {selectedNotice.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoticesPage