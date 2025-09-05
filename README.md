# 🍅 토마토패스 사이버연수원

**심플하고 직관적인 온라인 교육 플랫폼**

React + TypeScript로 구현된 현대적인 사이버교육원 시스템입니다.

## 📋 프로젝트 개요

토마토패스 사이버연수원은 사용자 경험을 최우선으로 하는 온라인 학습 플랫폼입니다. 복잡한 기존 LMS 시스템의 문제점을 해결하고, 핵심 학습 기능에 집중한 심플한 인터페이스를 제공합니다.

### 🎯 핵심 기능
- **🔐 사용자 인증**: 로그인/회원가입, 세션 관리
- **📚 나의 강의실**: 개인 학습 현황 대시보드, 진도율 추적
  - **❓ 질문과 답변**: 강의 관련 Q&A 시스템, 카테고리별 분류
  - **📦 주문배송조회**: 교재 및 학습자료 주문 현황, 실시간 배송 추적
- **🎓 수강신청**: 과정 검색/필터링, 상세 정보, 신청 기능
- **🎬 강의 재생**: 커스텀 비디오 플레이어, 배속 조절, 진도 기록
- **🏆 수료증 관리**: 수료 조건 확인, PDF 수료증 생성/다운로드
- **📢 고객지원**: 공지사항, FAQ, Q&A 문의 시스템

## 🛠 기술 스택

### Frontend
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **React Router v6** - 라우팅

### 상태 관리
- **Zustand** - 전역 상태 관리
- **React Hook Form** - 폼 상태 관리

### 외부 라이브러리
- **Lucide React** - 아이콘 세트
- **html2canvas + jsPDF** - PDF 생성
- **React Query** (예정) - 서버 상태 관리

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/your-username/tomatopass-cyber-academy.git
cd tomatopass-cyber-academy

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 테스트 계정
```
이메일: test@example.com
비밀번호: password123
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   └── ui/             # UI 기본 컴포넌트
├── pages/              # 페이지별 컴포넌트
│   ├── auth/           # 인증 관련
│   ├── classroom/      # 강의실 (대시보드, 강의재생, Q&A, 주문배송조회)
│   ├── courses/        # 수강신청
│   ├── certificates/   # 수료증
│   └── support/        # 고객지원
├── store/              # Zustand 스토어
├── types/              # TypeScript 타입 정의
├── utils/              # 헬퍼 함수
└── assets/             # 정적 파일
```

## 🎨 UI/UX 디자인

### 디자인 원칙
- **단순함**: 불필요한 요소 제거, 핵심 기능 강조
- **직관성**: 사용자가 생각하지 않아도 사용할 수 있는 인터페이스
- **일관성**: 모든 화면에서 동일한 패턴과 규칙 적용
- **접근성**: 모든 사용자가 쉽게 접근할 수 있는 디자인

### 컬러 팔레트
- **Primary**: `#2563eb` (Blue)
- **Success**: `#059669` (Green)
- **Error**: `#dc2626` (Red)
- **Warning**: `#ea580c` (Orange)
- **Neutral**: Gray scale

### 반응형 디자인
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📱 주요 화면

### 1. 메인 페이지
- 로그인 중심의 깔끔한 레이아웃
- 인기 과정, 공지사항, 학습지원센터 정보 제공

### 2. 나의 강의실
- 학습 현황 요약 (수강 중, 완료, 진도율, 수료증)
- 진행 중인 강의 목록 및 이어보기 기능
- 완료 강의 및 수료증 다운로드 링크
- 질문과 답변: 강의 관련 Q&A, 검색/필터링, 답변 상태 추적
- 주문배송조회: 교재 주문 내역, 배송 추적, 상세 정보 모달

### 3. 수강신청
- 과정 검색 및 카테고리 필터링
- 과정 카드 형태의 직관적인 목록
- 상세 정보 및 신청 기능

### 4. 강의 재생
- 커스텀 비디오 플레이어
- 재생 속도 조절 (0.5x ~ 2x)
- 진도율 실시간 업데이트
- 이전/다음 강의 네비게이션

### 5. 수료증 관리
- 발급된 수료증 목록 및 발급 가능한 과정
- 수료 조건 자동 확인
- A4 크기 전문 수료증 템플릿
- PDF 다운로드 기능

## 🔧 개발 가이드라인

### 코딩 스타일
- TypeScript 엄격 모드 사용
- 함수형 컴포넌트 + 훅 패턴
- ESLint + Prettier 규칙 준수
- 명확한 네이밍 (한글 주석 허용)

### 컴포넌트 작성 규칙
- 한 파일당 하나의 컴포넌트
- Props interface 명시
- 재사용 가능한 컴포넌트 우선
- 접근성 고려 (ARIA 속성)

### 상태 관리 패턴
- 로컬 상태: `useState`
- 전역 상태: Zustand
- 폼 상태: React Hook Form
- 서버 상태: React Query (예정)

## 📈 성능 최적화

### 현재 적용된 최적화
- Vite 번들러로 빠른 개발 및 빌드
- Tailwind CSS Purge로 불필요한 CSS 제거
- React Hook 최적화 (`useMemo`, `useCallback`)
- 코드 스플리팅 (예정)

### 추가 최적화 예정
- 이미지 Lazy Loading
- React.memo 적용
- Service Worker 캐싱
- Lighthouse 성능 점수 90+ 달성

## ♿ 접근성 (A11y)

### 적용된 접근성 기능
- 시맨틱 HTML 사용
- ARIA 라벨 및 설명
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 색상 대비 4.5:1 이상

### 지원하는 보조 기술
- NVDA, JAWS (스크린 리더)
- 키보드 전용 사용자
- 색약/색맹 사용자

## 🔒 보안

### 보안 조치
- XSS 방지 처리
- 입력값 검증 (클라이언트/서버)
- HTTPS 강제 적용 (프로덕션)
- 세션 기반 인증
- 민감정보 환경변수 관리

## 🧪 테스트

### 테스트 전략
```bash
# 단위 테스트 (예정)
npm run test

# E2E 테스트 (예정)
npm run test:e2e

# 커버리지 확인 (예정)
npm run test:coverage
```

## 🌐 브라우저 지원

### 지원 브라우저
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 모바일 지원
- iOS Safari 14+
- Chrome Android 90+

## 📦 배포

### 환경 설정
```bash
# 환경 변수 설정 (.env.local)
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=토마토패스 사이버연수원
```

### 프로덕션 배포
```bash
# 빌드
npm run build

# 정적 파일 서버 또는 CDN에 dist/ 폴더 배포
```

## 🤝 기여하기

### 개발 환경 설정
1. 프로젝트 Fork
2. 기능 브랜치 생성 (`feature/amazing-feature`)
3. 변경사항 커밋 (`feat: add amazing feature`)
4. 브랜치에 Push
5. Pull Request 생성

### 커밋 메시지 규칙
- `feat:` 새로운 기능
- `fix:` 버그 수정
- `docs:` 문서 수정
- `style:` 스타일 변경
- `refactor:` 리팩토링
- `test:` 테스트 추가
- `chore:` 기타 작업

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 언제든 연락주세요.

- **이메일**: contact@tomatopass.com
- **이슈**: [GitHub Issues](https://github.com/your-username/tomatopass-cyber-academy/issues)
- **위키**: [프로젝트 위키](https://github.com/your-username/tomatopass-cyber-academy/wiki)

---

**토마토패스 사이버연수원** - 심플하고 직관적인 온라인 학습 경험을 제공합니다. 🍅📚