import { Course, Lecture, Notice, FAQ, QnA } from '../types'

// 샘플 강의 데이터
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Python 기초 프로그래밍',
    description: '파이썬의 기초 문법부터 실습까지 체계적으로 학습하는 과정입니다. 프로그래밍 입문자도 쉽게 따라할 수 있도록 구성되어 있습니다.',
    category: 'IT',
    level: 'beginner',
    duration: 40,
    lectureCount: 20,
    rating: 4.8,
    studentCount: 1250,
    instructor: '김파이썬',
    thumbnail: '/images/courses/python-basic.jpg',
    price: 89000,
    tags: ['프로그래밍', '파이썬', '기초', '입문'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-08-01T00:00:00Z'
  },
  {
    id: '2',
    title: '데이터 분석 실무',
    description: '실제 데이터를 활용하여 분석 기법을 익히고, 비즈니스 인사이트를 도출하는 방법을 학습합니다.',
    category: 'IT',
    level: 'intermediate',
    duration: 30,
    lectureCount: 15,
    rating: 4.9,
    studentCount: 980,
    instructor: '박데이터',
    thumbnail: '/images/courses/data-analysis.jpg',
    price: 129000,
    tags: ['데이터분석', '파이썬', 'pandas', '시각화'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-07-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'React 웹 개발',
    description: '모던 웹 개발의 핵심인 React를 활용하여 동적인 웹 애플리케이션을 개발하는 방법을 학습합니다.',
    category: 'IT',
    level: 'intermediate',
    duration: 50,
    lectureCount: 25,
    rating: 4.7,
    studentCount: 850,
    instructor: '이리액트',
    thumbnail: '/images/courses/react-web.jpg',
    price: 149000,
    tags: ['React', 'JavaScript', '웹개발', '프론트엔드'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-08-10T00:00:00Z'
  },
  {
    id: '4',
    title: '디지털 마케팅 전략',
    description: '온라인 마케팅의 핵심 전략과 실무 노하우를 체계적으로 학습하는 과정입니다.',
    category: '경영',
    level: 'beginner',
    duration: 25,
    lectureCount: 12,
    rating: 4.6,
    studentCount: 720,
    instructor: '최마케팅',
    thumbnail: '/images/courses/digital-marketing.jpg',
    price: 79000,
    tags: ['마케팅', '디지털', '전략', '온라인'],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-07-20T00:00:00Z'
  },
  {
    id: '5',
    title: '비즈니스 영어 회화',
    description: '실무에서 바로 활용할 수 있는 비즈니스 영어 표현과 회화를 집중적으로 학습합니다.',
    category: '어학',
    level: 'intermediate',
    duration: 35,
    lectureCount: 18,
    rating: 4.5,
    studentCount: 650,
    instructor: '제임스 스미스',
    thumbnail: '/images/courses/business-english.jpg',
    price: 99000,
    tags: ['영어', '회화', '비즈니스', '실무'],
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-08-05T00:00:00Z'
  },
  {
    id: '6',
    title: 'UI/UX 디자인 기초',
    description: '사용자 중심의 디자인 사고와 실무에서 활용할 수 있는 UI/UX 디자인 방법론을 학습합니다.',
    category: 'IT',
    level: 'beginner',
    duration: 30,
    lectureCount: 15,
    rating: 4.7,
    studentCount: 540,
    instructor: '김디자인',
    thumbnail: '/images/courses/ui-ux-design.jpg',
    price: 109000,
    tags: ['디자인', 'UI', 'UX', '기초'],
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-08-12T00:00:00Z'
  }
]

// 샘플 강의 상세 데이터
export const mockLectures: { [courseId: string]: Lecture[] } = {
  '1': [
    {
      id: 'lecture-1-1',
      courseId: '1',
      title: '1강. 파이썬 소개 및 개발환경 설정',
      description: '파이썬의 특징과 장점을 알아보고, 개발환경을 설정하는 방법을 학습합니다.',
      videoUrl: '/videos/python/lecture-1.mp4',
      duration: 1200, // 20분
      order: 1,
      resources: [
        {
          id: 'resource-1-1-1',
          type: 'pdf',
          title: '1강 강의자료.pdf',
          url: '/resources/python/lecture-1-slides.pdf',
          size: 2048000 // 2MB
        }
      ]
    },
    {
      id: 'lecture-1-2',
      courseId: '1',
      title: '2강. 변수와 데이터 타입',
      description: '파이썬의 기본 데이터 타입과 변수 사용법을 학습합니다.',
      videoUrl: '/videos/python/lecture-2.mp4',
      duration: 1800, // 30분
      order: 2,
      resources: [
        {
          id: 'resource-1-2-1',
          type: 'pdf',
          title: '2강 강의자료.pdf',
          url: '/resources/python/lecture-2-slides.pdf',
          size: 1536000 // 1.5MB
        },
        {
          id: 'resource-1-2-2',
          type: 'link',
          title: '실습 코드 GitHub',
          url: 'https://github.com/example/python-basic-lecture2',
          size: 0
        }
      ]
    }
    // ... 더 많은 강의들
  ],
  '2': [
    {
      id: 'lecture-2-1',
      courseId: '2',
      title: '1강. 데이터 분석 개요',
      description: '데이터 분석의 기본 개념과 프로세스를 이해합니다.',
      videoUrl: '/videos/data-analysis/lecture-1.mp4',
      duration: 1500, // 25분
      order: 1
    },
    {
      id: 'lecture-2-2',
      courseId: '2',
      title: '2강. Pandas 라이브러리 기초',
      description: 'Pandas를 활용한 데이터 처리 방법을 학습합니다.',
      videoUrl: '/videos/data-analysis/lecture-2.mp4',
      duration: 2100, // 35분
      order: 2
    }
    // ... 더 많은 강의들
  ]
}

// 샘플 공지사항 데이터
export const mockNotices: Notice[] = [
  {
    id: 'notice-1',
    title: '2024년 하반기 신규 과정 안내',
    content: `안녕하세요. 토마토패스 사이버연수원입니다.

2024년 하반기 신규 과정을 안내드립니다.

📚 신규 개설 과정
1. AI 기초와 활용 (8월 말 개강 예정)
2. 클라우드 컴퓨팅 기초 (9월 초 개강 예정)
3. 프로젝트 관리 실무 (9월 중순 개강 예정)

🎯 수강 혜택
- 얼리버드 할인: 8월 31일까지 20% 할인
- 추천 할인: 지인 추천 시 추가 10% 할인
- 수강 완료 시 수료증 발급

많은 관심과 참여 부탁드립니다.

감사합니다.`,
    category: '과정안내',
    important: true,
    author: '관리자',
    createdAt: '2024-08-15T09:00:00Z',
    updatedAt: '2024-08-15T09:00:00Z',
    viewCount: 1250,
    attachments: ['/attachments/new-courses-2024h2.pdf']
  },
  {
    id: 'notice-2',
    title: '시스템 정기 점검 안내 (8월 20일)',
    content: `서비스 안정성 향상을 위한 정기 점검을 실시합니다.

🔧 점검 일시
- 일시: 2024년 8월 20일 (화) 02:00 ~ 06:00 (4시간)
- 대상: 전체 서비스

⚠️ 점검 중 이용 제한 사항
- 로그인 및 강의 시청 불가
- 수강신청 및 결제 불가
- 고객지원 서비스 제한

점검 완료 후 정상 서비스가 제공될 예정입니다.
이용에 불편을 드려 죄송합니다.`,
    category: '시스템',
    important: true,
    author: '기술팀',
    createdAt: '2024-08-10T14:30:00Z',
    updatedAt: '2024-08-10T14:30:00Z',
    viewCount: 850
  },
  {
    id: 'notice-3',
    title: '여름휴가 고객지원 운영시간 안내',
    content: `여름휴가 기간 중 고객지원 운영시간이 변경됩니다.

📞 변경 기간: 8월 5일 ~ 8월 25일
📞 운영시간: 평일 10:00 ~ 17:00 (기존 09:00 ~ 18:00)
📞 토요일: 휴무 (기존 09:00 ~ 13:00)

긴급한 문의사항은 이메일(support@tomatopass.com)로 연락해 주시기 바랍니다.`,
    category: '운영안내',
    important: false,
    author: '고객지원팀',
    createdAt: '2024-08-05T11:00:00Z',
    updatedAt: '2024-08-05T11:00:00Z',
    viewCount: 420
  },
  {
    id: 'notice-4',
    title: '모바일 앱 업데이트 안내 (v2.1.0)',
    content: `토마토패스 모바일 앱이 업데이트되었습니다.

📱 주요 업데이트 내용
- 강의 재생 품질 개선
- 오프라인 다운로드 기능 추가
- 학습 알림 기능 강화
- 버그 수정 및 안정성 향상

앱스토어 및 플레이스토어에서 업데이트해 주세요.`,
    category: '앱업데이트',
    important: false,
    author: '개발팀',
    createdAt: '2024-07-28T16:20:00Z',
    updatedAt: '2024-07-28T16:20:00Z',
    viewCount: 680
  }
]

// 샘플 FAQ 데이터
export const mockFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: '강의는 언제부터 시청할 수 있나요?',
    answer: '수강신청 완료 즉시 바로 시청 가능합니다. 결제 완료 후 "나의 강의실"에서 수강하실 수 있습니다.',
    category: '수강',
    helpful: 125,
    notHelpful: 8,
    viewCount: 850,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'faq-2',
    question: '강의 수강 기간은 얼마나 되나요?',
    answer: '모든 강의는 수강신청일로부터 6개월간 무제한 시청 가능합니다. 기간 연장을 원하시면 고객센터로 문의해 주세요.',
    category: '수강',
    helpful: 98,
    notHelpful: 12,
    viewCount: 720,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'faq-3',
    question: '수료증은 어떻게 발급받나요?',
    answer: '강의 진도율 80% 이상 달성 시 자동으로 수료증이 발급됩니다. "나의 강의실 > 수료증" 메뉴에서 다운로드 가능합니다.',
    category: '수료증',
    helpful: 156,
    notHelpful: 5,
    viewCount: 920,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'faq-4',
    question: '모바일에서도 강의를 들을 수 있나요?',
    answer: '네, 모바일 앱 또는 모바일 웹에서 모든 강의를 시청하실 수 있습니다. 학습 진도는 모든 기기에서 동기화됩니다.',
    category: '기술',
    helpful: 87,
    notHelpful: 3,
    viewCount: 650,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z'
  },
  {
    id: 'faq-5',
    question: '환불은 언제까지 가능한가요?',
    answer: '강의 시청률 20% 미만이고 수강신청일로부터 7일 이내에는 100% 환불 가능합니다. 자세한 환불 정책은 이용약관을 참고해 주세요.',
    category: '결제/환불',
    helpful: 76,
    notHelpful: 15,
    viewCount: 580,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  }
]

// 샘플 Q&A 데이터
export const mockQnAs: QnA[] = [
  {
    id: 'qna-1',
    userId: '1',
    title: '강의 재생이 안 됩니다',
    content: '파이썬 기초 강의 2강을 시청하려고 하는데 동영상이 로딩되지 않습니다. 브라우저는 크롬을 사용하고 있습니다.',
    category: 'technical',
    status: 'answered',
    answer: '안녕하세요. 브라우저 캐시 삭제 후 다시 시도해 보시기 바랍니다. 그래도 문제가 지속되면 다른 브라우저에서 접속해 보세요. 추가 문의사항이 있으시면 언제든지 연락 주세요.',
    answeredBy: '기술지원팀',
    answeredAt: '2024-08-19T10:30:00Z',
    createdAt: '2024-08-19T09:15:00Z'
  },
  {
    id: 'qna-2',
    userId: '2',
    title: '수료증 발급 관련 문의',
    content: '데이터 분석 과정을 100% 완주했는데 수료증이 발급되지 않았습니다. 언제쯤 받을 수 있나요?',
    category: 'course',
    status: 'answered',
    answer: '수료증은 과정 완료 후 24시간 이내에 자동 발급됩니다. "나의 강의실 > 수료증" 메뉴에서 확인하실 수 있습니다. 만약 48시간이 지나도 발급되지 않으면 다시 연락 주세요.',
    answeredBy: '학습지원팀',
    answeredAt: '2024-08-18T14:20:00Z',
    createdAt: '2024-08-18T11:45:00Z'
  },
  {
    id: 'qna-3',
    userId: '1',
    title: '로그인이 안 됩니다',
    content: '비밀번호를 올바르게 입력했는데 로그인이 되지 않습니다. 비밀번호 재설정을 해도 같은 문제가 발생합니다.',
    category: 'login',
    status: 'pending',
    createdAt: '2024-08-19T15:30:00Z'
  }
]

// 카테고리 옵션
export const courseCategories = [
  { value: 'all', label: '전체' },
  { value: 'IT', label: 'IT' },
  { value: '경영', label: '경영' },
  { value: '어학', label: '어학' },
  { value: '디자인', label: '디자인' }
]

export const courseLevels = [
  { value: 'all', label: '전체' },
  { value: 'beginner', label: '초급' },
  { value: 'intermediate', label: '중급' },
  { value: 'advanced', label: '고급' }
]

export const noticeCategories = [
  { value: 'all', label: '전체' },
  { value: '과정안내', label: '과정안내' },
  { value: '시스템', label: '시스템' },
  { value: '운영안내', label: '운영안내' },
  { value: '앱업데이트', label: '앱업데이트' }
]

export const faqCategories = [
  { value: 'all', label: '전체' },
  { value: '수강', label: '수강' },
  { value: '수료증', label: '수료증' },
  { value: '기술', label: '기술' },
  { value: '결제/환불', label: '결제/환불' }
]

export const qnaCategories = [
  { value: 'login', label: '로그인' },
  { value: 'course', label: '강의' },
  { value: 'technical', label: '기술' },
  { value: 'other', label: '기타' }
]