# 개발 실행 가이드

## 🚀 Claude Code 실행 순서

이 가이드는 Cursor에서 Claude Code를 사용하여 사이버연수원을 개발하는 단계별 지침입니다.

## 📋 사전 준비
1. Cursor 에디터에 Claude Code 확장 설치 완료
2. 프로젝트 폴더: `C:\Users\user\Downloads\tomatopass-cyber-academy`
3. 모든 문서 파일 배치 완료

## 🔄 단계별 실행 명령어

### Step 1: 프로젝트 초기 설정
Cursor 채팅창에 다음 명령어 입력:

```
@claude 사이버연수원 프로젝트를 시작하자!

다음 파일들을 모두 참고해줘:

📋 상세 기획 문서:
- confirmed/ia.md
- confirmed/navigation_structure.md
- confirmed/sitemap.md
- confirmed/function_specs.md
- confirmed/ui_design_guide.md

🎯 개발 실행 지침:
- docs/claude_instructions.md
- docs/project_requirements.md
- docs/component_specs.md

🎯 1단계: 프로젝트 기본 설정
- React + TypeScript 프로젝트 생성 (Vite 사용)
- Tailwind CSS 설치 및 설정
- 필요한 패키지 설치:
  * react-router-dom
  * zustand
  * @tanstack/react-query
  * react-hook-form
  * axios
  * lucide-react (아이콘)
- 기본 폴더 구조 생성
- ESLint, Prettier 설정
- tsconfig.json 설정

모든 설정 파일과 package.json을 생성하고 설명해줘.
```

### Step 2: 기본 레이아웃 구성
1단계 완료 후 실행:

```
@claude 이제 기본 레이아웃을 구성하자.

다음 파일들을 참고해줘:
- confirmed/navigation_structure.md (네비게이션 구조)
- confirmed/sitemap.md (사이트맵)
- confirmed/ui_design_guide.md (UI 디자인)
- docs/component_specs.md (컴포넌트 명세)

🎯 2단계: 레이아웃 및 라우터 설정
- src 폴더 구조 생성 (project_requirements.md 참고)
- App.tsx에 라우터 설정
- Layout 컴포넌트 생성 (Header + Main + Footer)
- Header 컴포넌트 (로고 + 네비게이션)
- Footer 컴포넌트
- 기본 페이지 컴포넌트들 생성:
  * HomePage (메인)
  * LoginPage (로그인)
  * RegisterPage (회원가입)
  * ClassroomPage (나의 강의실)
  * CoursesPage (수강신청)
  * SupportPage (고객지원)

각 컴포넌트에는 기본 구조만 만들고, 상세 내용은 다음 단계에서 구현하자.
```

### Step 3: 메인 페이지 구현
2단계 완료 후 실행:

```
@claude 메인 페이지를 구현하자.

다음 파일들을 참고해줘:
- confirmed/ui_design_guide.md (디자인 가이드)
- docs/project_requirements.md (메인 페이지 레이아웃)
- docs/component_specs.md (LoginForm 명세)

🎯 3단계: 홈페이지 완성
project_requirements.md의 메인 페이지 레이아웃을 참고해서:

- 중앙에 로그인 폼 배치
- 우측에 사이드바 (공지사항, 인기과정, 학습지원센터)
- 로그인 폼 컴포넌트:
  * 아이디/비밀번호 입력
  * "로그인 상태 유지" 체크박스  
  * 로그인 버튼
  * 회원가입/ID찾기 링크
- 반응형 디자인 적용
- 컬러 시스템 적용 (claude_instructions.md 참고)

실제 동작하는 폼으로 만들어줘 (아직 API 연동은 안해도 됨).
```

### Step 4: 상태 관리 설정
3단계 완료 후 실행:

```
@claude 상태 관리를 설정하자.

다음 파일들을 참고해줘:
- confirmed/function_specs.md (기능 명세)
- docs/claude_instructions.md (상태 관리 지침)

🎯 4단계: Zustand 스토어 구성
- 인증 관련 상태 관리 (authStore)
  * 로그인 상태
  * 사용자 정보
  * 로그인/로그아웃 액션
- 학습 관련 상태 관리 (learningStore)
  * 수강 중인 강의 목록
  * 진도율 정보
  * 완료된 강의 목록
- Mock 데이터 생성
  * 샘플 사용자 데이터
  * 샘플 강의 데이터
  * 샘플 공지사항 데이터

TypeScript 타입도 함께 정의해줘.
```

### Step 5: 로그인/회원가입 기능
4단계 완료 후 실행:

```
@claude 로그인과 회원가입 기능을 완성하자.

다음 파일들을 참고해줘:
- confirmed/function_specs.md (기능 명세)
- docs/component_specs.md (LoginForm, RegisterForm)
- docs/claude_instructions.md (폼 처리 지침)

🎯 5단계: 인증 시스템 구현
- 로그인 폼 검증 로직 추가
- 회원가입 페이지 구현
- React Hook Form 적용
- 입력값 검증 (이메일, 비밀번호 규칙)
- 로딩 상태 및 에러 처리
- 성공/실패 메시지 표시
- 로그인 성공 시 나의 강의실로 리다이렉트

실제로 입력하고 검증이 동작하도록 만들어줘.
Mock 데이터로 로그인이 되도록 구현해줘.
```

### Step 6: 나의 강의실 구현
5단계 완료 후 실행:

```
@claude 나의 강의실을 구현하자.

다음 파일들을 참고해줘:
- confirmed/function_specs.md (강의실 기능 명세)
- confirmed/ia.md (IA 설계)
- docs/project_requirements.md (나의 강의실 요구사항)
- docs/component_specs.md (StatsCard, LectureList 등)

🎯 6단계: 강의실 대시보드 구성
project_requirements.md의 나의 강의실 요구사항을 참고해서:

- 학습 현황 요약 카드 (4개 지표)
  * 수강 중인 강의 수
  * 완료된 강의 수  
  * 수료증 보유 수
  * 평균 진도율
- 진행 중인 강의 목록
  * 강의명, 진도율 프로그레스 바
  * [이어보기] 버튼
- 완료된 강의 목록
  * 강의명, 완료일
  * [수료증] 버튼

Mock 데이터를 사용해서 실제 데이터가 표시되도록 만들어줘.
카드 기반 레이아웃으로 깔끔하게 구성해줘.
```

### Step 7: 수강신청 페이지
6단계 완료 후 실행:

```
@claude 수강신청 페이지를 만들자.

다음 파일들을 참고해줘:
- confirmed/function_specs.md (수강신청 기능)
- confirmed/sitemap.md (페이지 구조)
- docs/component_specs.md (CourseCard, SearchBar 등)

🎯 7단계: 과정 목록 및 신청
- 전체 과정 목록 표시
- 과정 카드 컴포넌트:
  * 과정명, 설명, 소요시간
  * 평점, 수강생 수
  * [신청하기] 버튼
- 검색 기능 (과정명)
- 카테고리 필터 (IT, 경영, 어학)
- 인기순/최신순 정렬
- 과정 상세 페이지 (라우팅)
- 신청하기 기능 (Mock)

반응형 그리드 레이아웃으로 구성해줘.
```

### Step 8: 강의 재생 기능
7단계 완료 후 실행:

```
@claude 강의 재생 페이지를 만들자.

다음 파일들을 참고해줘:
- confirmed/function_specs.md (강의 재생 기능)
- docs/component_specs.md (VideoPlayer)

🎯 8단계: 동영상 플레이어 구현
- HTML5 비디오 플레이어
- 커스텀 컨트롤 (재생/일시정지, 볼륨, 전체화면)
- 배속 조절 기능 (0.5x, 1x, 1.5x, 2x)
- 진도율 표시 및 업데이트
- 이전/다음 강의 네비게이션
- 강의 정보 표시 (제목, 설명, 학습 목표)
- [학습 완료] 버튼

샘플 비디오 파일을 사용해서 실제 재생되도록 구현해줘.
진도율이 실시간으로 업데이트되도록 만들어줘.
```

## 4. 성공 지표 (KPI)

### 4.1 업무 효율성 지표
- 법인 영업팀 업무 처리 시간 70% 감소
- 수강생 승인 처리 시간 24시간 → 2시간 단축
- 문의 응답 시간 48시간 → 4시간 단축

### 4.2 사용자 만족도 지표
- 회사 관리자 만족도 4.5점 이상 (5점 만점)
- B2B 수강생 불편 사항 50% 감소
- 재계약률 90% 이상 유지

### 4.3 시스템 활용도 지표
- 회사 관리자 월 평균 접속 횟수 20회 이상
- 관리 기능 이용률 80% 이상
- 시스템 오류율 1% 이하 유지

## 5. 개발 우선순위 및 일정

### 5.1 1단계 (핵심 시스템 구축)
**기간**: 2주
**내용**:
- 회원가입 및 승인 시스템
- 기본 관리자 대시보드
- 수강생 목록 및 기본 관리 기능

### 5.2 2단계 (핵심 관리 기능)
**기간**: 2주  
**내용**:
- 과정 관리 및 배정 기능
- 진도율 모니터링 시스템
- 수료 승인 처리 기능

### 5.3 3단계 (고급 기능 및 최적화)
**기간**: 2주
**내용**:
- 환불 관리 시스템
- 통계 및 리포트 기능
- 알림 및 메시지 시스템

## 6. 위험 요소 및 대응 방안

### 6.1 기술적 위험
**위험**: 기존 시스템과의 호환성 문제
**대응**: 단계적 마이그레이션 및 충분한 테스트

**위험**: 대용량 데이터 처리 성능 저하
**대응**: 데이터베이스 최적화 및 캐싱 시스템 도입

### 6.2 운영적 위험
**위험**: 회사 관리자의 시스템 적응 어려움
**대응**: 상세한 매뉴얼 제공 및 교육 프로그램 운영

**위험**: 권한 오남용 가능성
**대응**: 세분화된 권한 설정 및 로그 모니터링

### 6.3 비즈니스 위험
**위험**: 기존 영업 프로세스 변화에 대한 저항
**대응**: 점진적 도입 및 효과 실증을 통한 설득원 페이지들
8단계 완료 후 실행:

```
@claude 고객지원 관련 페이지들을 만들자.

다음 파일들을 참고해줘:
- confirmed/function_specs.md (지원 기능)
- confirmed/navigation_structure.md (고객지원 구조)
- docs/component_specs.md (NoticeCard, FAQItem)

🎯 9단계: 공지사항 및 FAQ
- 공지사항 목록/상세 페이지
- FAQ 페이지 (카테고리별 분류)
- Q&A 문의 작성 페이지
- 검색 기능
- 아코디언 UI (FAQ)
- 페이지네이션

Mock 데이터로 실제 컨텐츠가 표시되도록 구현해줘.
```

### Step 10: 수료증 관리
9단계 완료 후 실행:

```
@claude 수료증 관리 기능을 추가하자.

다음 파일들을 참고해줘:
- confirmed/function_specs.md (수료증 기능)

🎯 10단계: 수료증 시스템
- 수료 조건 확인 로직
- 수료증 목록 페이지
- 수료증 상세 보기
- PDF 다운로드 기능 (html2canvas + jsPDF)
- 수료증 템플릿 디자인

실제로 PDF가 생성되고 다운로드되도록 구현해줘.
```

### Step 11: 최종 완성도 향상
10단계 완료 후 실행:

```
@claude 프로젝트를 마무리하자.

모든 파일들을 참고해서:
- docs/claude_instructions.md (개발 지침)
- confirmed/ui_design_guide.md (UI 가이드)

🎯 11단계: 최종 정리 및 최적화
- 모든 페이지 반응형 확인 및 수정
- 로딩 상태 및 에러 처리 보완
- 접근성 개선 (ARIA 라벨, 키보드 네비게이션)
- 성능 최적화 (이미지 lazy loading, 코드 스플리팅)
- ESLint 경고 해결
- 전체 코드 리팩토링
- README.md 작성

품질 검수를 하고 개선점을 제시해줘.
```원 페이지들
8단계 완료 후 실행:

```
@claude 고객지원 관련 페이지들을 만들자.

🎯 9단계: 공지사항 및 FAQ
- 공지사항 목록/상세 페이지
- FAQ 페이지 (카테고리별 분류)
- Q&A 문의 작성 페이지
- 검색 기능
- 아코디언 UI (FAQ)
- 페이지네이션

Mock 데이터로 실제 컨텐츠가 표시되도록 구현해줘.
```

### Step 10: 수료증 관리
9단계 완료 후 실행:

```
@claude 수료증 관리 기능을 추가하자.

🎯 10단계: 수료증 시스템
- 수료 조건 확인 로직
- 수료증 목록 페이지
- 수료증 상세 보기
- PDF 다운로드 기능 (html2canvas + jsPDF)
- 수료증 템플릿 디자인

실제로 PDF가 생성되고 다운로드되도록 구현해줘.
```

### Step 11: 최종 완성도 향상
10단계 완료 후 실행:

```
@claude 프로젝트를 마무리하자.

🎯 11단계: 최종 정리 및 최적화
- 모든 페이지 반응형 확인 및 수정
- 로딩 상태 및 에러 처리 보완
- 접근성 개선 (ARIA 라벨, 키보드 네비게이션)
- 성능 최적화 (이미지 lazy loading, 코드 스플리팅)
- ESLint 경고 해결
- 전체 코드 리팩토링
- README.md 작성

품질 검수를 하고 개선점을 제시해줘.
```

## 🎯 각 단계별 예상 소요시간
- Step 1-2: 30-60분 (프로젝트 설정)
- Step 3-4: 60-90분 (기본 UI 및 상태 관리)
- Step 5-6: 90-120분 (핵심 기능)
- Step 7-8: 120-150분 (학습 기능)
- Step 9-10: 60-90분 (부가 기능)
- Step 11: 30-60분 (마무리)

**총 예상 시간: 6-9시간**

## 💡 중간에 문제가 생겼을 때

### 에러 해결 요청
```
@claude 다음 에러가 발생했어:

[에러 메시지 복사/붙여넣기]

현재 상황:
- 어떤 작업을 하던 중인지
- 어떤 파일을 수정했는지
- 기대했던 결과

.claude-instructions.md 지침에 맞게 해결책을 제시해줘.
```

### 코드 리뷰 요청
```
@claude 방금 생성한 코드를 리뷰해줘.

다음 관점에서 확인해줘:
- 우리 개발 지침 준수 여부
- 성능 최적화 포인트
- 접근성 고려사항
- 개선 가능한 부분

구체적인 수정 제안도 해줘.
```

### 기능 추가 요청
```
@claude [기능명]을 추가하고 싶어.

요구사항:
- [구체적인 기능 설명]
- [사용자 시나리오]
- [기술적 제약사항]

기존 코드 구조를 유지하면서 추가해줘.
```

## 📋 체크리스트

각 단계 완료 후 다음을 확인하세요:

### 기능 체크
- [ ] 해당 단계의 모든 요구사항 구현 완료
- [ ] 에러 없이 정상 실행
- [ ] 브라우저에서 기능 테스트 완료
- [ ] 반응형 디자인 확인

### 코드 품질 체크
- [ ] TypeScript 에러 없음
- [ ] ESLint 경고 없음
- [ ] 컴포넌트 이름 및 파일명 규칙 준수
- [ ] 주석 추가 (복잡한 로직)

### 다음 단계 진행 전
- [ ] 현재 단계 완전히 완료
- [ ] Git 커밋 (선택사항)
- [ ] 진행 상황 PROGRESS.md 업데이트