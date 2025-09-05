# 사이버연수원 개발 지침

## 🎯 프로젝트 목표
- 심플하고 직관적인 온라인 교육 플랫폼 개발
- 사용자 경험 최우선
- 유지보수 가능한 깔끔한 코드

## 📋 개발 원칙

### 코딩 스타일
- TypeScript 엄격 모드 사용
- 함수형 컴포넌트 + 훅 패턴
- 명확한 네이밍 (한글 주석 허용)
- ESLint + Prettier 규칙 준수

### 컴포넌트 작성 규칙
- 한 파일당 하나의 컴포넌트
- Props interface 명시
- 재사용 가능한 컴포넌트 우선
- 접근성 고려 (ARIA 속성)

### 상태 관리
- 로컬 상태: useState
- 전역 상태: Zustand
- 서버 상태: React Query
- 폼 상태: React Hook Form

### 스타일링
- Tailwind CSS 유틸리티 클래스
- 커스텀 CSS 최소화
- 반응형 디자인 모바일 퍼스트
- 다크모드 지원 준비

### API 통신
- Axios 사용
- 환경변수로 API URL 관리
- 에러 핸들링 표준화
- 로딩 상태 관리

## 🎨 UI/UX 가이드라인

### 컬러 시스템
- Primary: Blue (#2563eb)
- Secondary: Gray (#6b7280)  
- Success: Green (#059669)
- Error: Red (#dc2626)
- Warning: Orange (#ea580c)

### 타이포그래피
- 기본 폰트: Pretendard
- 제목: font-bold
- 본문: font-normal
- 캡션: font-medium

### 컴포넌트 스타일
- 카드: rounded-lg shadow-sm
- 버튼: rounded-md px-4 py-2
- 입력필드: rounded-md border
- 간격: 4px 단위 (space-4, p-4 등)

## 📱 반응형 설계
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🔐 보안 고려사항
- XSS 방지
- CSRF 토큰 사용
- 입력값 검증
- 민감정보 암호화

## 📁 파일 구조 규칙
- components/common/: 공통 컴포넌트
- components/ui/: UI 기본 컴포넌트  
- pages/: 페이지별 컴포넌트
- hooks/: 커스텀 훅
- types/: TypeScript 타입 정의
- utils/: 헬퍼 함수

## 🧪 테스트 전략
- Jest + React Testing Library
- 단위 테스트 우선
- 통합 테스트 추가
- E2E 테스트 (Playwright)

## 📝 네이밍 컨벤션
- 컴포넌트: PascalCase (LoginForm)
- 파일명: kebab-case (login-form.tsx)
- 함수: camelCase (handleLogin)
- 상수: UPPER_SNAKE_CASE (API_BASE_URL)
- 인터페이스: PascalCase + I prefix (IUser)

## 🚀 성능 최적화
- 코드 스플리팅 (React.lazy)
- 이미지 최적화 (WebP)
- 번들 크기 모니터링
- 메모이제이션 적절히 사용

## 📋 커밋 메시지 규칙
- feat: 새로운 기능
- fix: 버그 수정  
- docs: 문서 수정
- style: 스타일 변경
- refactor: 리팩토링
- test: 테스트 추가
- chore: 기타 작업

예시: `feat: 로그인 폼 컴포넌트 구현`

## 🎓 사이버연수원 특화 요구사항

### 학습 기능
- 동영상 플레이어 커스터마이징
- 진도율 실시간 업데이트
- 북마크/메모 기능
- 오프라인 지원 준비

### 사용자 경험
- 3초 이내 페이지 로딩
- 직관적인 네비게이션
- 명확한 피드백 메시지
- 에러 복구 방안 제시

### 비즈니스 로직
- 수강 권한 체크
- 진도율 계산 로직
- 수료 조건 검증
- 결제 연동 준비

### 데이터 관리
- 학습 기록 로컬 저장
- 동기화 메커니즘
- 캐싱 전략
- 백업/복구 시스템