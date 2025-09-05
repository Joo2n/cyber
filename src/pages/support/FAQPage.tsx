import React, { useState, useEffect, useMemo } from 'react'
import { Search, HelpCircle, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import FAQItem from '../../components/ui/FAQItem'
import { FAQ } from '../../types'

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  const categories = ['전체', '로그인', '강의', '기술문의', '수료증', '결제']

  // Mock 데이터
  useEffect(() => {
    const loadFAQs = async () => {
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockFAQs: FAQ[] = [
        {
          id: '1',
          question: '로그인이 안 돼요. 어떻게 해야 하나요?',
          answer: `로그인 문제는 다음과 같은 방법으로 해결할 수 있습니다:

**1. 아이디와 비밀번호 확인**
• 대소문자를 정확히 입력했는지 확인해주세요
• 특수문자나 공백이 포함되지 않았는지 확인해주세요
• 한글/영어 입력 상태를 확인해주세요

**2. 브라우저 관련 문제**
• 쿠키와 캐시를 삭제해보세요
• 다른 브라우저에서 시도해보세요
• 시크릿 모드에서 접속해보세요

**3. 비밀번호 재설정**
• 로그인 페이지에서 "비밀번호 찾기"를 클릭하세요
• 등록하신 이메일로 재설정 링크가 발송됩니다

여전히 문제가 해결되지 않으면 고객지원센터(1600-9922)로 연락주세요.`,
          category: '로그인',
          helpful: 245,
          notHelpful: 12,
          viewCount: 1856,
          createdAt: '2024-07-01T00:00:00Z',
          updatedAt: '2024-08-15T00:00:00Z'
        },
        {
          id: '2',
          question: '강의 동영상이 재생되지 않아요.',
          answer: `동영상 재생 문제는 다음과 같이 해결해보세요:

**1. 네트워크 연결 확인**
• 인터넷 연결 상태를 확인해주세요
• 다른 사이트나 앱이 정상 작동하는지 확인해주세요
• Wi-Fi 연결을 끊고 모바일 데이터로 시도해보세요

**2. 브라우저 설정**
• 최신 버전의 브라우저를 사용해주세요
• JavaScript가 활성화되어 있는지 확인해주세요
• 팝업 차단기를 해제해주세요

**3. 시스템 요구사항**
• Chrome 80+, Firefox 75+, Safari 13+ 사용 권장
• 최소 2Mbps 이상의 인터넷 속도 필요

**4. 기타 해결방법**
• 페이지 새로고침(F5)
• 브라우저 재시작
• 컴퓨터 재부팅

문제가 지속되면 사용 중인 브라우저와 운영체제 정보를 알려주세요.`,
          category: '강의',
          helpful: 189,
          notHelpful: 8,
          viewCount: 1423,
          createdAt: '2024-07-05T00:00:00Z',
          updatedAt: '2024-08-10T00:00:00Z'
        },
        {
          id: '3',
          question: '수료증은 언제 발급받을 수 있나요?',
          answer: `수료증 발급 조건과 방법은 다음과 같습니다:

**발급 조건**
• 전체 강의의 80% 이상 수강 완료
• 모든 퀴즈 응시 및 60점 이상 획득
• 과정별 필수 과제 제출 (해당 과정에 한함)

**발급 시점**
• 수료 조건 충족 즉시 자동 발급
• 발급까지 최대 24시간 소요
• 주말 및 공휴일에는 발급이 지연될 수 있습니다

**발급 확인 방법**
1. 나의 강의실 → 수료증 확인 메뉴
2. 발급된 수료증을 PDF로 다운로드
3. 수료증 번호로 진위 확인 가능

**주의사항**
• 수료증은 과정 완료 후 1년간 다운로드 가능
• 분실 시 재발급 수수료 5,000원
• 수료증 내용 오류 시 즉시 연락주세요`,
          category: '수료증',
          helpful: 156,
          notHelpful: 3,
          viewCount: 892,
          createdAt: '2024-07-10T00:00:00Z',
          updatedAt: '2024-08-01T00:00:00Z'
        },
        {
          id: '4',
          question: '모바일에서도 강의를 들을 수 있나요?',
          answer: `네, 모바일에서도 강의 수강이 가능합니다:

**지원 기기**
• Android 6.0 이상
• iOS 12.0 이상
• 태블릿 PC (Android/iPad)

**모바일 앱 기능**
• 강의 동영상 스트리밍
• 오프라인 다운로드 (일부 과정)
• 학습 진도 동기화
• 수료증 확인 및 다운로드

**모바일 웹 기능**
• 모든 브라우저에서 접속 가능
• 반응형 디자인으로 최적화
• 앱과 동일한 기능 제공

**데이터 사용량**
• 고화질: 시간당 약 500MB
• 일반화질: 시간당 약 300MB
• 저화질: 시간당 약 150MB

Wi-Fi 환경에서 학습을 권장하며, 모바일 데이터 사용 시 요금이 발생할 수 있습니다.`,
          category: '강의',
          helpful: 201,
          notHelpful: 7,
          viewCount: 1156,
          createdAt: '2024-07-15T00:00:00Z',
          updatedAt: '2024-08-12T00:00:00Z'
        },
        {
          id: '5',
          question: '결제 후 바로 수강할 수 있나요?',
          answer: `네, 결제 완료 후 즉시 수강 가능합니다:

**결제 확인 시간**
• 신용카드: 즉시 승인
• 실시간 계좌이체: 즉시 승인
• 무통장입금: 입금 확인 후 (평일 기준 2-3시간)

**수강 시작 방법**
1. 결제 완료 후 "나의 강의실" 메뉴 확인
2. 결제한 과정이 자동으로 등록됨
3. "수강하기" 버튼 클릭하여 학습 시작

**결제 관련 주의사항**
• 중복 결제 시 자동 환불 처리
• 결제 오류 시 고객센터로 즉시 연락
• 영수증은 마이페이지에서 출력 가능

**환불 정책**
• 7일 이내, 진도 10% 미만: 100% 환불
• 7일 초과, 진도 30% 미만: 70% 환불
• 진도 30% 이상: 환불 불가

궁금한 점이 있으시면 언제든 문의해주세요!`,
          category: '결제',
          helpful: 178,
          notHelpful: 5,
          viewCount: 943,
          createdAt: '2024-07-20T00:00:00Z',
          updatedAt: '2024-08-05T00:00:00Z'
        },
        {
          id: '6',
          question: 'Mac에서 동영상 재생이 안 돼요.',
          answer: `Mac에서 동영상 재생 문제 해결 방법:

**Safari 브라우저 사용 시**
• Safari 환경설정 → 웹사이트 → 자동 재생 설정 확인
• 개인정보 보호 → 팝업 차단 해제
• Safari 버전 13.0 이상 업데이트 권장

**Chrome 브라우저 사용 시**
• 브라우저 주소창에 chrome://settings/content 입력
• JavaScript 허용으로 설정
• 사이트 설정에서 팝업 및 광고 차단 해제

**공통 해결 방법**
• 키체인 접근에서 관련 인증서 삭제 후 재설치
• 시스템 환경설정 → 보안 및 개인정보 확인
• macOS 최신 버전 업데이트

**macOS 버전별 주의사항**
• Big Sur 이상: 추가 보안 설정 필요
• Monterey: Safari 개인정보 보호 기능 조정
• Ventura: 스테이지 매니저 비활성화 권장

여전히 문제가 있다면 스크린샷과 함께 문의해주세요.`,
          category: '기술문의',
          helpful: 89,
          notHelpful: 12,
          viewCount: 456,
          createdAt: '2024-07-25T00:00:00Z',
          updatedAt: '2024-08-08T00:00:00Z'
        }
      ]
      
      setFaqs(mockFAQs)
      setIsLoading(false)
    }

    loadFAQs()
  }, [])

  // 필터링 및 검색
  const filteredFAQs = useMemo(() => {
    let filtered = faqs

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(faq => faq.category === selectedCategory)
    }

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 도움됨 비율 기준 정렬
    return filtered.sort((a, b) => {
      const aRate = (a.helpful / (a.helpful + a.notHelpful)) || 0
      const bRate = (b.helpful / (b.helpful + b.notHelpful)) || 0
      return bRate - aRate
    })
  }, [faqs, selectedCategory, searchQuery])

  // FAQ 토글
  const toggleFAQ = (id: string) => {
    const newExpandedItems = new Set(expandedItems)
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id)
    } else {
      newExpandedItems.add(id)
    }
    setExpandedItems(newExpandedItems)
  }

  // 도움됨 클릭 핸들러
  const handleHelpfulClick = (faqId: string, helpful: boolean) => {
    setFaqs(prev => prev.map(faq => 
      faq.id === faqId 
        ? { 
            ...faq, 
            helpful: helpful ? faq.helpful + 1 : faq.helpful,
            notHelpful: helpful ? faq.notHelpful : faq.notHelpful + 1
          }
        : faq
    ))
  }

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">FAQ를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">자주 묻는 질문</h1>
        <p className="text-lg text-neutral-600 mb-8">
          궁금한 점이 있으시면 먼저 FAQ를 확인해보세요
        </p>

        {/* 검색 */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="FAQ를 검색하세요 (예: 로그인, 강의, 수료증)"
              className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg"
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <div className="card-body">
              {/* 카테고리 필터 */}
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">카테고리</h3>
              <div className="space-y-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {category}
                    {category !== '전체' && (
                      <span className="ml-2 text-sm opacity-75">
                        ({faqs.filter(faq => faq.category === category).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* 빠른 도움말 */}
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">더 많은 도움이 필요하신가요?</h3>
              <div className="space-y-3">
                <Link 
                  to="/help/qna"
                  className="flex items-center gap-3 p-3 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-neutral-900">1:1 문의하기</p>
                    <p className="text-sm text-neutral-500">개별 상담이 필요한 경우</p>
                  </div>
                </Link>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-neutral-900">전화 상담</p>
                    <p className="text-sm text-neutral-500">1600-9922</p>
                    <p className="text-xs text-neutral-400">평일 09:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3">
          {/* 결과 표시 */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-neutral-600">
              총 <span className="font-semibold text-neutral-900">{filteredFAQs.length}</span>개의 FAQ
              {searchQuery && (
                <span className="ml-2 text-sm">
                  '<span className="text-primary font-medium">{searchQuery}</span>' 검색 결과
                </span>
              )}
            </p>
          </div>

          {/* FAQ 목록 */}
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-neutral-600 mb-4">다른 검색어나 카테고리를 시도해보세요</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('전체')
                }}
                className="btn btn-primary"
              >
                전체 FAQ 보기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  expanded={expandedItems.has(faq.id)}
                  onToggle={() => toggleFAQ(faq.id)}
                  onHelpfulClick={(helpful) => handleHelpfulClick(faq.id, helpful)}
                />
              ))}
            </div>
          )}

          {/* 추가 안내 */}
          {filteredFAQs.length > 0 && (
            <div className="mt-12 text-center">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">원하는 답변을 찾지 못하셨나요?</h3>
                  <p className="text-neutral-600 mb-4">
                    더 자세한 도움이 필요하시면 언제든 문의해주세요
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link to="/help/qna" className="btn btn-primary">
                      1:1 문의하기
                    </Link>
                    <button className="btn btn-outline">
                      전화 상담 신청
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQPage