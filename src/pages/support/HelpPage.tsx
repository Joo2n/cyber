import { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp, Phone, Mail, Clock, MessageCircle, BookOpen, Settings, CreditCard, Award } from 'lucide-react'

/**
 * FAQ 아이템 인터페이스
 */
interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
  helpful: number
  views: number
}

/**
 * 도움말/FAQ 페이지 컴포넌트
 * 자주 묻는 질문과 고객 지원 정보를 제공하는 페이지
 */
const HelpPage = () => {
  // 상태 관리
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 카테고리 목록
  const categories = ['전체', '회원가입/로그인', '강의수강', '결제/환불', '수료증', '기술문의', '기타']

  /**
   * FAQ 데이터 초기화
   */
  useEffect(() => {
    const mockFAQData: FAQItem[] = [
      {
        id: 1,
        question: '회원가입은 어떻게 하나요?',
        answer: '회원가입은 다음과 같은 방법으로 가능합니다.\n\n1. 홈페이지 우상단 "회원가입" 버튼 클릭\n2. 이메일, 비밀번호, 이름, 연락처 입력\n3. 이용약관 및 개인정보처리방침 동의\n4. 이메일 인증 완료\n\n📧 이메일 인증이 완료되어야 로그인이 가능합니다.\n소셜 로그인(구글, 네이버, 카카오)도 지원합니다.',
        category: '회원가입/로그인',
        helpful: 156,
        views: 2341
      },
      {
        id: 2,
        question: '비밀번호를 분실했어요. 어떻게 재설정하나요?',
        answer: '비밀번호 재설정 방법:\n\n1. 로그인 페이지에서 "비밀번호 찾기" 클릭\n2. 가입했던 이메일 주소 입력\n3. 이메일로 전송된 재설정 링크 클릭\n4. 새로운 비밀번호 입력 후 저장\n\n⚠️ 재설정 링크는 30분간 유효합니다.\n이메일이 오지 않으면 스팸함을 확인해주세요.',
        category: '회원가입/로그인',
        helpful: 89,
        views: 1567
      },
      {
        id: 3,
        question: '강의는 어떻게 수강하나요?',
        answer: '강의 수강 방법:\n\n1. 수강신청 페이지에서 원하는 강의 선택\n2. "수강신청" 버튼 클릭 후 결제\n3. 나의 강의실에서 강의 목록 확인\n4. "이어보기" 또는 "처음부터" 버튼으로 수강 시작\n\n📱 모바일 앱에서도 동일하게 수강 가능합니다.\n💡 Wi-Fi 환경에서 강의를 미리 다운로드하면 오프라인에서도 시청 가능합니다.',
        category: '강의수강',
        helpful: 234,
        views: 3456
      },
      {
        id: 4,
        question: '강의를 다운로드해서 오프라인으로 볼 수 있나요?',
        answer: '네, 모바일 앱에서 강의 다운로드가 가능합니다.\n\n📲 다운로드 방법:\n1. 모바일 앱에서 강의 페이지 접속\n2. 강의 제목 옆 다운로드 아이콘 클릭\n3. Wi-Fi 환경에서 다운로드 진행\n\n📝 다운로드 주의사항:\n- Wi-Fi 환경에서만 다운로드 가능\n- 다운로드한 강의는 30일간 시청 가능\n- 수강 기간 만료 시 자동 삭제\n- 웹 브라우저에서는 스트리밍만 가능',
        category: '강의수강',
        helpful: 167,
        views: 2234
      },
      {
        id: 5,
        question: '강의 배속은 어떻게 조절하나요?',
        answer: '강의 배속 조절 방법:\n\n🖥️ 웹에서:\n- 동영상 플레이어 우하단 "배속" 버튼 클릭\n- 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x 중 선택\n\n📱 모바일에서:\n- 화면을 한 번 탭하여 컨트롤 메뉴 표시\n- "배속" 버튼을 탭하여 원하는 배속 선택\n\n💡 팁: 키보드 단축키 사용 가능\n- 스페이스바: 재생/일시정지\n- 좌우 화살표: 10초 앞뒤 이동\n- 상하 화살표: 볼륨 조절',
        category: '강의수강',
        helpful: 198,
        views: 2789
      },
      {
        id: 6,
        question: '결제는 어떤 방법으로 가능한가요?',
        answer: '다양한 결제 수단을 지원합니다.\n\n💳 지원 결제 수단:\n- 신용카드 (국내 모든 카드사)\n- 체크카드\n- 계좌이체\n- 휴대폰 소액결제\n- 카카오페이, 네이버페이\n- 페이코, 토스페이\n\n🏢 법인 결제:\n- 세금계산서 발행 가능\n- 계좌이체 및 가상계좌 지원\n- 구매 확인서 발급\n\n⚠️ 해외카드는 일부 제한될 수 있습니다.',
        category: '결제/환불',
        helpful: 143,
        views: 1987
      },
      {
        id: 7,
        question: '강의 환불은 어떻게 하나요?',
        answer: '강의 환불 정책 및 절차:\n\n🕐 환불 가능 기간:\n- 수강신청 후 7일 이내\n- 강의 진도율 10% 미만인 경우\n\n📞 환불 신청 방법:\n1. 고객센터 전화 (1600-9922)\n2. 이메일 문의 (refund@tomatopass.com)\n3. 1:1 문의 게시판 이용\n\n💰 환불 금액:\n- 7일 이내, 진도율 0%: 100% 환불\n- 7일 이내, 진도율 10% 미만: 90% 환불\n- 그 외: 환불 불가\n\n⏰ 환불 처리 기간: 신청일로부터 3-5영업일',
        category: '결제/환불',
        helpful: 276,
        views: 4123
      },
      {
        id: 8,
        question: '수료증은 언제 발급되나요?',
        answer: '수료증 발급 조건 및 방법:\n\n✅ 발급 조건:\n- 전체 강의 80% 이상 수강 완료\n- 모든 필수 과제 제출 완료\n- 최종 평가 60점 이상 (해당 시)\n\n📜 발급 방법:\n1. 나의 강의실 → 수료증 메뉴 접속\n2. 발급 가능한 강의 목록 확인\n3. "수료증 발급" 버튼 클릭\n4. PDF 다운로드 또는 인쇄\n\n🎨 수료증 특징:\n- A4 크기 고품질 디자인\n- 공식 인증 QR코드 포함\n- 평생 재발급 가능\n- 영문 수료증도 발급 가능',
        category: '수료증',
        helpful: 312,
        views: 3876
      },
      {
        id: 9,
        question: '수료증을 분실했어요. 재발급 가능한가요?',
        answer: '네, 수료증 재발급이 가능합니다.\n\n🔄 재발급 방법:\n1. 나의 강의실 → 수료증 메뉴\n2. "발급된 수료증" 탭 클릭\n3. 해당 강의의 "재다운로드" 버튼 클릭\n\n💡 재발급 혜택:\n- 무료 무제한 재발급\n- 원본과 동일한 품질\n- 발급일자는 최초 발급일 유지\n- 개인정보 변경 시에도 업데이트 적용\n\n📧 이메일로도 재발급 요청 가능:\ncert@tomatopass.com\n(성명, 생년월일, 강의명 명시)',
        category: '수료증',
        helpful: 187,
        views: 2654
      },
      {
        id: 10,
        question: '동영상이 재생되지 않아요.',
        answer: '동영상 재생 문제 해결 방법:\n\n🔧 기본 해결 방법:\n1. 브라우저 새로고침 (F5)\n2. 다른 브라우저로 접속 시도\n3. 브라우저 캐시 및 쿠키 삭제\n4. 인터넷 연결 상태 확인\n\n💻 브라우저별 권장사항:\n- Chrome 최신 버전 권장\n- Internet Explorer 사용 불가\n- Safari, Firefox, Edge 지원\n\n📱 모바일 문제 시:\n- 앱 강제 종료 후 재실행\n- 앱 업데이트 확인\n- Wi-Fi 연결 상태 확인\n\n여전히 문제가 지속되면 고객센터로 문의해주세요.\n(기기 정보, 브라우저 버전 함께 알려주시면 빠른 해결 가능)',
        category: '기술문의',
        helpful: 445,
        views: 5643
      },
      {
        id: 11,
        question: '모바일 앱은 어디서 다운로드하나요?',
        answer: '토마토패스 모바일 앱 다운로드:\n\n📱 안드로이드:\n- Google Play 스토어에서 "토마토패스" 검색\n- 또는 QR 코드 스캔하여 바로 이동\n\n🍎 iOS:\n- App Store에서 "토마토패스" 검색\n- iOS 12.0 이상 지원\n\n🔗 직접 링크:\nhttps://app.tomatopass.com\n\n✨ 앱 전용 기능:\n- 오프라인 강의 다운로드\n- 푸시 알림\n- 학습 진도 위젯\n- 빠른 접속 및 로그인 유지',
        category: '기술문의',
        helpful: 234,
        views: 3421
      },
      {
        id: 12,
        question: '학습 시간은 어떻게 인정되나요?',
        answer: '학습 시간 인정 기준:\n\n⏰ 시청 시간 측정:\n- 실제 동영상 재생 시간 기준\n- 일시정지 시간은 제외\n- 배속 재생 시에도 실제 시간으로 계산\n\n📊 진도율 계산:\n- 강의별 총 시간 대비 시청한 시간\n- 80% 이상 시청 시 완료 처리\n- 중간에 건너뛴 부분도 미완료 처리\n\n💾 자동 저장:\n- 30초마다 학습 진도 자동 저장\n- 브라우저 종료 시에도 진도 유지\n- 여러 기기에서 동기화\n\n📈 학습 통계:\n- 일별, 주별, 월별 학습 시간 확인 가능\n- 나의 강의실에서 상세 통계 제공',
        category: '강의수강',
        helpful: 189,
        views: 2876
      },
      {
        id: 13,
        question: '회원 탈퇴는 어떻게 하나요?',
        answer: '회원 탈퇴 절차:\n\n⚠️ 탈퇴 전 확인사항:\n- 진행 중인 강의는 모두 소실됩니다\n- 수료증 재발급이 불가능합니다\n- 결제/환불 내역 확인이 어렵습니다\n\n🔄 탈퇴 방법:\n1. 마이페이지 → 계정 설정\n2. 하단 "회원 탈퇴" 버튼 클릭\n3. 탈퇴 사유 선택 및 비밀번호 입력\n4. 탈퇴 확인 버튼 클릭\n\n📋 개인정보 처리:\n- 개인정보는 즉시 삭제 처리\n- 법정 보관 의무 정보는 1년간 보관\n- 학습 이력은 완전 삭제\n\n💡 휴면 계정 전환도 고려해보세요!\n6개월간 로그인하지 않으면 자동 휴면 처리됩니다.',
        category: '회원가입/로그인',
        helpful: 123,
        views: 1789
      },
      {
        id: 14,
        question: '강의 자료(PDF, 예제파일)는 어디서 다운로드하나요?',
        answer: '강의 자료 다운로드 방법:\n\n📁 자료 위치:\n1. 강의 페이지 내 "강의 자료" 탭\n2. 각 차시별 하단 "첨부 파일" 섹션\n3. 나의 강의실 → 해당 강의 → "자료실"\n\n📥 다운로드 방법:\n- PDF: 바로 다운로드 또는 새 창에서 보기\n- 예제 파일: ZIP 형태로 일괄 다운로드\n- 소스 코드: GitHub 저장소 링크 제공\n\n💾 자료 유형:\n- 강의 슬라이드 (PDF)\n- 실습 예제 파일\n- 참고 자료 및 도서 목록\n- 소스 코드 및 프로젝트 파일\n\n⚠️ 저작권 보호를 위해 수강 기간 내에만 다운로드 가능합니다.',
        category: '강의수강',
        helpful: 267,
        views: 3214
      },
      {
        id: 15,
        question: '고객센터 운영 시간이 궁금해요.',
        answer: '토마토패스 고객센터 안내:\n\n📞 전화 상담:\n- 번호: 1600-9922\n- 운영시간: 평일 09:00 ~ 18:00\n- 점심시간: 12:00 ~ 13:00\n- 주말 및 공휴일 휴무\n\n💬 온라인 상담:\n- 1:1 문의: 24시간 접수 (답변은 영업시간 내)\n- 실시간 채팅: 평일 09:00 ~ 18:00\n- 카카오톡 플러스친구: @토마토패스\n\n📧 이메일 문의:\n- 일반 문의: support@tomatopass.com\n- 결제/환불: billing@tomatopass.com\n- 기술 문의: tech@tomatopass.com\n- 수료증: cert@tomatopass.com\n\n⏰ 평균 답변 시간: 24시간 이내 (영업일 기준)',
        category: '기타',
        helpful: 345,
        views: 4567
      }
    ]

    setFaqs(mockFAQData)
    setFilteredFaqs(mockFAQData)
    setIsLoading(false)
  }, [])

  /**
   * 검색 및 필터링 처리
   */
  useEffect(() => {
    let filtered = faqs

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(faq => faq.category === selectedCategory)
    }

    // 도움이 된다고 평가한 수 순으로 정렬
    filtered.sort((a, b) => b.helpful - a.helpful)

    setFilteredFaqs(filtered)
  }, [faqs, searchTerm, selectedCategory])

  /**
   * FAQ 아이템 확장/축소 토글
   */
  const toggleExpanded = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
    
    // 조회수 증가
    setFaqs(prev => prev.map(faq =>
      faq.id === id ? { ...faq, views: faq.views + 1 } : faq
    ))
  }

  /**
   * 도움이 됨 버튼 클릭
   */
  const markHelpful = (id: number) => {
    setFaqs(prev => prev.map(faq =>
      faq.id === id ? { ...faq, helpful: faq.helpful + 1 } : faq
    ))
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
          도움말 센터
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          자주 묻는 질문과 문제 해결 방법을 찾아보세요.
        </p>
      </div>

      {/* 빠른 연락처 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
          <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">전화 상담</h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium">1600-9922</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">평일 09:00 ~ 18:00</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
          <Mail className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">이메일 문의</h3>
          <p className="text-green-600 dark:text-green-400 font-medium">support@tomatopass.com</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">24시간 접수</p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center">
          <MessageCircle className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1:1 문의</h3>
          <p className="text-purple-600 dark:text-purple-400 font-medium">온라인 상담</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">평일 09:00 ~ 18:00</p>
        </div>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 검색 입력 */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="궁금한 내용을 검색해보세요..."
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

      {/* 인기 카테고리 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">인기 카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">강의수강</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
            <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">결제/환불</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
            <Award className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">수료증</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
            <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">기술문의</span>
          </div>
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">자주 묻는 질문</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredFaqs.length}개 결과</span>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">❓</div>
            <p className="text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</p>
          </div>
        ) : (
          filteredFaqs.map(faq => (
            <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* FAQ 헤더 */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                onClick={() => toggleExpanded(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                        {faq.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        조회 {faq.views.toLocaleString()} • 도움됨 {faq.helpful}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  
                  {expandedItems.includes(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </div>

              {/* FAQ 답변 (확장 시) */}
              {expandedItems.includes(faq.id) && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="pt-4">
                    <div className="prose prose-sm max-w-none dark:text-gray-300">
                      {faq.answer.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          이 답변이 도움이 되었나요?
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              markHelpful(faq.id)
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                          >
                            👍 도움됨 ({faq.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* 추가 도움 섹션 */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          원하는 답변을 찾지 못하셨나요?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          고객센터에 직접 문의하시면 더 자세한 도움을 받으실 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            1:1 문의하기
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            전화 상담 신청
          </button>
        </div>
      </div>
    </div>
  )
}

export default HelpPage