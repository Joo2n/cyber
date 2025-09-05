import { useState, useEffect } from 'react'
import { Search, Plus, MessageCircle, Calendar, User, ChevronDown, Filter } from 'lucide-react'

/**
 * QnA 아이템 인터페이스 정의
 */
interface QnAItem {
  id: number
  title: string
  content: string
  answer?: string
  author: string
  courseTitle: string
  createdAt: string
  answeredAt?: string
  status: 'pending' | 'answered'
  category: string
}

/**
 * 질문과 답변 페이지 컴포넌트
 * 학생들이 강의 관련 질문을 올리고 답변을 확인할 수 있는 페이지
 */
const QnAPage = () => {
  // 상태 관리
  const [qnaList, setQnaList] = useState<QnAItem[]>([])
  const [filteredQnA, setFilteredQnA] = useState<QnAItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [statusFilter, setStatusFilter] = useState('전체')
  const [isLoading, setIsLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  // 카테고리 목록
  const categories = ['전체', '강의내용', '과제', '시험', '기술문의', '기타']
  const statusOptions = ['전체', '답변대기', '답변완료']

  /**
   * QnA 목록 데이터 초기화
   */
  useEffect(() => {
    const mockQnAData: QnAItem[] = [
      {
        id: 1,
        title: '자바스크립트 비동기 처리에 대한 질문',
        content: 'Promise와 async/await의 차이점이 무엇인가요? 실제 프로젝트에서 어떤 상황에 어떤 것을 사용해야 할까요? 특히 에러 처리 방법이 궁금합니다.',
        answer: 'Promise는 ES6에서 도입된 비동기 처리 패턴이고, async/await는 ES2017에서 도입되어 Promise를 더 쉽게 사용할 수 있게 해주는 문법입니다.\n\n주요 차이점:\n1. 가독성: async/await가 더 직관적이고 읽기 쉽습니다\n2. 에러 처리: try-catch 문으로 동기 코드처럼 처리 가능\n3. 디버깅: 스택 트레이스가 더 명확합니다\n\n사용 권장사항:\n- 단순한 비동기 작업: async/await 사용\n- 여러 비동기 작업의 병렬 처리: Promise.all() 사용\n- 레거시 코드와의 호환성: Promise 체이닝',
        author: '홍길동',
        courseTitle: '웹 개발 기초',
        createdAt: '2024-03-15 14:30',
        answeredAt: '2024-03-15 16:45',
        status: 'answered',
        category: '강의내용'
      },
      {
        id: 2,
        title: '과제 제출 방법 문의',
        content: '1차 과제를 어디에 제출해야 하는지 알고 싶습니다. 강의실에서 찾을 수 없어요.',
        author: '김영희',
        courseTitle: '웹 개발 기초',
        createdAt: '2024-03-16 09:15',
        status: 'pending',
        category: '과제'
      },
      {
        id: 3,
        title: 'CSS 플렉스박스 정렬 이슈',
        content: '플렉스 아이템들이 원하는 대로 정렬되지 않습니다. align-items와 justify-content의 차이점을 알고 싶어요.',
        answer: 'align-items는 교차축(cross-axis) 정렬을 담당하고, justify-content는 주축(main-axis) 정렬을 담당합니다.\n\n- flex-direction: row일 때\n  - justify-content: 수평 정렬 (좌우)\n  - align-items: 수직 정렬 (상하)\n\n- flex-direction: column일 때\n  - justify-content: 수직 정렬 (상하)\n  - align-items: 수평 정렬 (좌우)\n\n실습 예제를 첨부해드릴게요!',
        author: '박민수',
        courseTitle: '프론트엔드 심화',
        createdAt: '2024-03-14 11:20',
        answeredAt: '2024-03-14 15:30',
        status: 'answered',
        category: '강의내용'
      },
      {
        id: 4,
        title: '기말시험 범위 및 일정 문의',
        content: '기말시험 범위가 어디까지인지 궁금합니다. 또한 정확한 시험 일정과 방식(온라인/오프라인)도 알고 싶어요.',
        answer: '기말시험 안내사항입니다.\n\n📅 시험 일정: 2024년 3월 25일(월) ~ 3월 29일(금)\n📚 시험 범위: 1~10강 전체 (실습 과제 포함)\n💻 시험 방식: 온라인 객관식 + 실습 문제\n⏰ 시험 시간: 90분\n\n자세한 내용은 공지사항을 확인해주세요.',
        author: '이철수',
        courseTitle: '데이터베이스 설계',
        createdAt: '2024-03-13 16:20',
        answeredAt: '2024-03-13 18:15',
        status: 'answered',
        category: '시험'
      },
      {
        id: 5,
        title: 'React Hook 사용 시 주의사항',
        content: 'useEffect의 의존성 배열을 제대로 이해하지 못하겠어요. 언제 넣어야 하고 언제 빼야 하는지 설명 부탁드립니다.',
        answer: 'useEffect의 의존성 배열 사용법을 설명드리겠습니다.\n\n🎯 의존성 배열의 역할:\n- effect 내부에서 사용하는 모든 변수, 함수, state를 포함해야 합니다\n- 의존성이 변경될 때만 effect가 재실행됩니다\n\n📝 사용 패턴:\n1. 빈 배열 []: 컴포넌트 마운트 시에만 실행\n2. 배열 없음: 매 렌더링마다 실행\n3. [value]: value가 변경될 때만 실행\n\n⚠️ 주의사항:\n- eslint-plugin-react-hooks 사용 권장\n- 함수나 객체를 의존성으로 사용할 때는 useCallback, useMemo 고려',
        author: '정민지',
        courseTitle: 'React 마스터클래스',
        createdAt: '2024-03-12 10:30',
        answeredAt: '2024-03-12 14:20',
        status: 'answered',
        category: '강의내용'
      },
      {
        id: 6,
        title: '과제 제출 파일 형식 문의',
        content: '2차 과제에서 HTML, CSS 파일을 어떤 형식으로 제출해야 하나요? zip 파일로 압축해서 올리면 되나요?',
        author: '최수현',
        courseTitle: '웹 디자인 실무',
        createdAt: '2024-03-11 15:45',
        status: 'pending',
        category: '과제'
      },
      {
        id: 7,
        title: 'Node.js 서버 배포 관련 질문',
        content: 'AWS EC2에 Node.js 애플리케이션을 배포하려고 하는데 포트 설정과 PM2 사용법이 헷갈려요.',
        answer: 'AWS EC2 Node.js 배포 가이드입니다.\n\n🔧 기본 설정:\n1. EC2 보안 그룹에서 포트 열기 (예: 3000, 80, 443)\n2. 환경변수로 PORT 설정: process.env.PORT || 3000\n\n📦 PM2 사용법:\n```bash\n# PM2 설치\nnpm install -g pm2\n\n# 앱 실행\npm2 start app.js --name "myapp"\n\n# 부팅시 자동 실행\npm2 startup\npm2 save\n```\n\n🔒 추가 고려사항:\n- SSL 인증서 설정\n- 로드 밸런서 구성\n- 로그 관리',
        author: '강태현',
        courseTitle: 'Node.js 백엔드 개발',
        createdAt: '2024-03-10 09:15',
        answeredAt: '2024-03-10 16:30',
        status: 'answered',
        category: '기술문의'
      },
      {
        id: 8,
        title: '강의 동영상 재생 오류',
        content: '크롬 브라우저에서 5강 동영상이 재생되지 않습니다. 다른 브라우저에서는 정상 재생됩니다.',
        author: '윤서연',
        courseTitle: '파이썬 프로그래밍',
        createdAt: '2024-03-09 13:20',
        status: 'pending',
        category: '기술문의'
      },
      {
        id: 9,
        title: 'Git 브랜치 전략 질문',
        content: '팀 프로젝트에서 Git Flow와 GitHub Flow 중 어떤 것을 선택해야 할까요? 각각의 장단점이 궁금합니다.',
        answer: 'Git 브랜치 전략 비교입니다.\n\n🌊 Git Flow:\n장점:\n- 명확한 브랜치 구조\n- 릴리스 관리에 적합\n- 대규모 팀에 효과적\n\n단점:\n- 복잡한 구조\n- 느린 배포 주기\n\n🚀 GitHub Flow:\n장점:\n- 단순하고 직관적\n- 빠른 배포 가능\n- CI/CD에 적합\n\n단점:\n- 릴리스 관리 어려움\n- 안정성 확보 필요\n\n💡 선택 기준:\n- 소규모 팀, 빠른 배포: GitHub Flow\n- 대규모 팀, 체계적 릴리스: Git Flow',
        author: '임현우',
        courseTitle: '협업 도구 마스터',
        createdAt: '2024-03-08 11:10',
        answeredAt: '2024-03-08 15:45',
        status: 'answered',
        category: '강의내용'
      },
      {
        id: 10,
        title: '수료증 발급 조건 문의',
        content: '모든 강의를 수강했는데 수료증 발급이 안 됩니다. 다른 조건이 더 있나요?',
        author: '송지현',
        courseTitle: 'UI/UX 디자인 기초',
        createdAt: '2024-03-07 14:30',
        status: 'pending',
        category: '기타'
      },
      {
        id: 11,
        title: 'TypeScript 제네릭 사용법',
        content: '제네릭을 언제 사용해야 하는지, 그리고 실제 사용 예시를 알고 싶습니다. 특히 함수와 클래스에서의 활용법이 궁금해요.',
        answer: 'TypeScript 제네릭 사용법을 설명드리겠습니다.\n\n🎯 제네릭을 사용하는 경우:\n1. 재사용 가능한 컴포넌트/함수\n2. 타입 안전성 보장\n3. 런타임까지 타입을 알 수 없는 경우\n\n📝 기본 사용법:\n```typescript\n// 함수 제네릭\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\n// 인터페이스 제네릭\ninterface ApiResponse<T> {\n  data: T;\n  status: number;\n}\n\n// 클래스 제네릭\nclass Stack<T> {\n  private items: T[] = [];\n  \n  push(item: T): void {\n    this.items.push(item);\n  }\n}\n```\n\n🔧 고급 사용법:\n- 제약 조건: <T extends SomeType>\n- 조건부 타입: T extends U ? X : Y\n- 매핑 타입: { [K in keyof T]: T[K] }',
        author: '조민호',
        courseTitle: 'TypeScript 마스터클래스',
        createdAt: '2024-03-06 16:15',
        answeredAt: '2024-03-06 19:20',
        status: 'answered',
        category: '강의내용'
      },
      {
        id: 12,
        title: '기말 프로젝트 주제 승인 요청',
        content: '쇼핑몰 웹사이트 개발을 기말 프로젝트로 하고 싶은데 괜찮을까요? 사용할 기술스택도 문의드립니다.',
        author: '한지원',
        courseTitle: '풀스택 웹 개발',
        createdAt: '2024-03-05 10:45',
        status: 'pending',
        category: '과제'
      }
    ]
    
    setQnaList(mockQnAData)
    setFilteredQnA(mockQnAData)
    setIsLoading(false)
  }, [])

  /**
   * 검색 및 필터링 처리
   */
  useEffect(() => {
    let filtered = qnaList

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // 상태 필터링
    if (statusFilter !== '전체') {
      const status = statusFilter === '답변완료' ? 'answered' : 'pending'
      filtered = filtered.filter(item => item.status === status)
    }

    setFilteredQnA(filtered)
  }, [qnaList, searchTerm, selectedCategory, statusFilter])

  /**
   * QnA 아이템 확장/축소 토글
   */
  const toggleExpanded = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  /**
   * 상태별 스타일 반환
   */
  const getStatusStyle = (status: string) => {
    return status === 'answered'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }

  /**
   * 날짜 포맷팅
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
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
    <div className="p-6 max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          질문과 답변
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          강의와 관련된 질문을 올리고 답변을 확인하세요.
        </p>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 검색 입력 */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="질문 제목이나 내용을 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 카테고리 필터 */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* 상태 필터 */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* 새 질문 작성 버튼 */}
        <div className="mt-4 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            새 질문 작성
          </button>
        </div>
      </div>

      {/* QnA 목록 */}
      <div className="space-y-4">
        {filteredQnA.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</p>
          </div>
        ) : (
          filteredQnA.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* QnA 헤더 */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                onClick={() => toggleExpanded(item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                        {item.status === 'answered' ? '답변완료' : '답변대기'}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {item.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.createdAt)}
                      </div>
                      <span>{item.courseTitle}</span>
                    </div>
                  </div>
                  
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedItems.includes(item.id) ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>

              {/* QnA 내용 (확장 시) */}
              {expandedItems.includes(item.id) && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                  {/* 질문 내용 */}
                  <div className="pt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">질문:</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {item.content}
                    </p>
                  </div>

                  {/* 답변 내용 */}
                  {item.answer && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">답변:</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                        {item.answer}
                      </p>
                      {item.answeredAt && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          답변일: {formatDate(item.answeredAt)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default QnAPage