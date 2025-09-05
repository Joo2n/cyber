### 기능 추가 요청
```
@claude [기능명]을 추가하고 싶어.

요구사항:
- [구체적인 기능 설명]
- [사용자 시나리오]
- [기술적 제약사항]

다음 파일들을 참고해서:
- confirmed/function_specs.md (관련 기능 명세)
- docs/component_specs.md (컴포넌트 가이드)
- docs/claude_instructions.md (개발 규칙)

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
- [ ] docs/progress.md 업데이트

## 🎯 각 단계별 예상 소요시간

| 단계 | 내용 | 예상시간 | 누적시간 |
|------|------|----------|----------|
| Step 1-2 | 프로젝트 설정 + 레이아웃 | 60-90분 | 90분 |
| Step 3-4 | 메인페이지 + 상태관리 | 90-120분 | 210분 |
| Step 5-6 | 인증 + 강의실 | 120-150분 | 360분 |
| Step 7-8 | 수강신청 + 플레이어 | 120-180분 | 540분 |
| Step 9-10 | 지원페이지 + 수료증 | 90-120분 | 660분 |
| Step 11 | 최종 완성도 | 60-90분 | 750분 |

**총 예상 시간: 12-13시간** (2-3일 작업)

## 💡 효율적인 작업 팁

### 1. 세션 단위로 작업
- **1세션**: Step 1-2 (기본 설정)
- **2세션**: Step 3-4 (메인 기능)  
- **3세션**: Step 5-6 (핵심 기능)
- **4세션**: Step 7-8 (학습 기능)
- **5세션**: Step 9-11 (완성도)

### 2. 각 세션 시작 시
```
@claude 새로운 개발 세션을 시작하자.

현재 상황:
- docs/progress.md를 확인해서 어디까지 완료되었는지 알려줘
- 다음에 해야 할 작업이 무엇인지 확인해줘
- 이전에 발견된 이슈가 있다면 먼저 해결하자

준비되면 다음 단계를 진행하자.
```

### 3. 각 세션 종료 시
```
@claude 세션을 마무리하자.

다음 작업을 해줘:
- 현재까지 완료된 내용 정리
- docs/progress.md 업데이트
- 다음 세션에서 할 일 정리
- 현재 코드 상태 검수 (에러, 경고 확인)

다음에 이어서 작업할 수 있도록 정리해줘.
```

## 🚨 주의사항

### 절대 하지 말 것:
1. **여러 단계를 한 번에 요청하지 마세요** - 단계별로 차근차근
2. **문서를 무시하고 다른 방식으로 요청하지 마세요** - 지침을 따라주세요
3. **에러가 있는 상태로 다음 단계로 넘어가지 마세요** - 반드시 해결 후 진행

### 반드시 할 것:
1. **각 단계 완료 후 테스트** - 브라우저에서 직접 확인
2. **문서 참조** - 모든 관련 문서들 확인
3. **진행상황 기록** - progress.md 지속적 업데이트

이 가이드를 따라 차근차근 진행하면 고품질의 사이버연수원을 완성할 수 있습니다! 🎓# 🚀 Claude Code 실행 순서 가이드

## 📂 현재 파일 구조

```
C:\Users\user\Downloads\tomatopass-cyber-academy\
├── docs/
│   ├── claude_instructions.md           # 개발 지침
│   ├── component_specs.md               # 컴포넌트 명세서  
│   ├── development_guide.md             # 개발 실행 가이드
│   ├── execution_order.md               # 실행 순서 가이드 (이 파일)
│   ├── progress.md                      # 진행상황 추적
│   └── project_requirements.md          # 프로젝트 요구사항
└── confirmed/
    ├── cursor_claude_guide.md           # Cursor 사용 가이드
    ├── function_specs.md                # 기능 명세서
    ├── ia.md                           # IA 설계
    ├── navigation_structure.md          # 네비게이션 구조
    ├── sitemap.md                      # 사이트맵
    └── ui_design_guide.md              # UI 디자인 가이드
```

## 🎯 Cursor에서 실행 순서

### Step 0: 환경 준비
1. **Cursor 에디터 열기**
2. **폴더 열기**: `File > Open Folder` → `tomatopass-cyber-academy` 선택
3. **Claude Code 확인**: `Ctrl+Shift+P` → "Claude Code" 검색하여 활성화 상태 확인

### Step 1: 첫 번째 명령어 실행
Cursor 하단의 **채팅창** 또는 **Claude Code** 패널에서 실행:

```
@claude 사이버연수원 프로젝트를 시작하자!

docs 폴더에 있는 다음 파일들을 참고해줘:
- .claude-instructions.md (개발 지침)
- PROJECT-REQUIREMENTS.md (프로젝트 요구사항)
- COMPONENT-SPECS.md (컴포넌트 명세)

DEVELOPMENT-GUIDE.md의 Step 1을 실행해줘:

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

완료되면 다음 명령어로 실행할 수 있도록 해줘:
npm run dev
```

### Step 2: 설정 완료 확인
Step 1 완료 후:

1. **터미널에서 실행 테스트**:
```bash
npm install
npm run dev
```

2. **브라우저 확인**: `http://localhost:5173`에서 React 앱이 정상 실행되는지 확인

3. **PROGRESS.md 업데이트**:
```
@claude PROGRESS.md 파일을 업데이트해줘.
Step 1이 완료되었다고 체크하고, 현재 상황을 기록해줘.
```

### Step 3: 기본 레이아웃 구성
```
@claude DEVELOPMENT-GUIDE.md의 Step 2를 실행해줘.

🎯 2단계: 레이아웃 및 라우터 설정
- src 폴더 구조 생성 (PROJECT-REQUIREMENTS.md 참고)
- App.tsx에 라우터 설정
- Layout 컴포넌트 생성 (Header + Main + Footer)
- Header 컴포넌트 (로고 + 네비게이션)
- Footer 컴포넌트
- 기본 페이지 컴포넌트들 생성

COMPONENT-SPECS.md의 Header, Navigation, Footer 명세를 참고해서 만들어줘.
```

### Step 4: 메인 페이지 구현
Step 2 완료 후:

```
@claude DEVELOPMENT-GUIDE.md의 Step 3을 실행해줘.

🎯 3단계: 홈페이지 완성
PROJECT-REQUIREMENTS.md의 메인 페이지 레이아웃을 참고해서:

- 중앙에 로그인 폼 배치
- 우측에 사이드바 (공지사항, 인기과정, 학습지원센터)
- COMPONENT-SPECS.md의 LoginForm 명세에 따라 구현
- 반응형 디자인 적용
- .claude-instructions.md의 컬러 시스템 적용

실제 동작하는 폼으로 만들어줘.
```

### Step 5: 상태 관리 설정
```
@claude DEVELOPMENT-GUIDE.md의 Step 4를 실행해줘.

🎯 4단계: Zustand 스토어 구성
- 인증 관련 상태 관리 (authStore)
- 학습 관련 상태 관리 (learningStore)
- Mock 데이터 생성
- TypeScript 타입 정의

.claude-instructions.md의 상태 관리 지침을 따라서 구현해줘.
```

### Step 6-11: 순차적 기능 구현

각 단계 완료 후 **반드시** PROGRESS.md 업데이트 요청:

#### Step 6: 로그인/회원가입 기능
```
@claude DEVELOPMENT-GUIDE.md의 Step 5를 실행해줘.

🎯 5단계: 인증 시스템 구현
- 로그인 폼 검증 로직 추가
- 회원가입 페이지 구현  
- React Hook Form 적용
- 입력값 검증 및 에러 처리
- Mock 데이터로 로그인 구현

완료 후 PROGRESS.md 업데이트해줘.
```

#### Step 7: 나의 강의실 구현
```
@claude DEVELOPMENT-GUIDE.md의 Step 6을 실행해줘.

🎯 6단계: 강의실 대시보드 구성
- 학습 현황 요약 카드 (4개 지표)
- 진행 중인 강의 목록 (진도바 포함)
- 완료된 강의 목록
- COMPONENT-SPECS.md의 StatsCard, LectureList 활용

Mock 데이터를 사용해서 실제 데이터가 표시되도록 만들어줘.
```

#### Step 8: 수강신청 페이지
```
@claude DEVELOPMENT-GUIDE.md의 Step 7을 실행해줘.

🎯 7단계: 과정 목록 및 신청
- 전체 과정 목록 표시
- COMPONENT-SPECS.md의 CourseCard 컴포넌트 구현
- 검색/필터 기능
- 과정 상세 페이지

반응형 그리드 레이아웃으로 구성해줘.
```

#### Step 9: 강의 재생 기능
```
@claude DEVELOPMENT-GUIDE.md의 Step 8을 실행해줘.

🎯 8단계: 동영상 플레이어 구현
- COMPONENT-SPECS.md의 VideoPlayer 명세 참고
- HTML5 비디오 플레이어
- 커스텀 컨트롤 및 진도율 업데이트
- 이전/다음 강의 네비게이션

샘플 비디오로 실제 재생되도록 구현해줘.
```

#### Step 10: 지원 페이지들
```
@claude DEVELOPMENT-GUIDE.md의 Step 9를 실행해줘.

🎯 9단계: 공지사항 및 FAQ
- 공지사항 목록/상세 페이지
- FAQ 페이지 (아코디언 UI)
- Q&A 문의 작성 페이지
- COMPONENT-SPECS.md의 NoticeCard, FAQItem 활용
```

#### Step 11: 수료증 관리
```
@claude DEVELOPMENT-GUIDE.md의 Step 10을 실행해줘.

🎯 10단계: 수료증 시스템
- 수료 조건 확인 로직
- 수료증 목록 및 상세 보기
- PDF 다운로드 기능 구현

html2canvas + jsPDF 라이브러리 사용해서 실제 PDF 생성해줘.
```

#### Step 12: 최종 완성도 향상
```
@claude DEVELOPMENT-GUIDE.md의 Step 11을 실행해줘.

🎯 11단계: 최종 정리 및 최적화
- 모든 페이지 반응형 확인 및 수정
- 로딩 상태 및 에러 처리 보완
- 접근성 개선
- 성능 최적화
- ESLint 경고 해결
- 전체 코드 리팩토링

품질 검수를 하고 개선점을 제시해줘.
```

## ⚠️ 중요한 실행 규칙

### 1. 단계별 완료 확인
각 단계 완료 후 **반드시** 다음을 확인하세요:

```
@claude 방금 완료한 단계를 확인해줘:

✅ 체크 항목:
- [ ] 에러 없이 정상 실행되는가?
- [ ] 브라우저에서 기능이 작동하는가?
- [ ] 반응형 디자인이 적용되었는가?
- [ ] TypeScript 에러가 없는가?
- [ ] 우리 개발 지침을 준수했는가?

문제가 있다면 수정해주고, 없다면 PROGRESS.md를 업데이트해줘.
```

### 2. 문제 발생 시 해결 방법

#### 에러 발생 시:
```
@claude 다음 에러가 발생했어:

[에러 메시지 복사]

현재 상황:
- Step X 진행 중
- [구체적인 작업 내용]
- 기대한 결과: [설명]

.claude-instructions.md 지침에 맞게 해결해줘.
```

#### 기능이 예상과 다를 때:
```
@claude 기능이 예상과 달라.

현재 상황: [스크린샷 설명 또는 구체적 설명]
기대한 결과: [원하는 동작]
사용한 컴포넌트: [컴포넌트명]

COMPONENT-SPECS.md를 참고해서 수정해줘.
```

### 3. 중간 저장 및 백업

#### 주요 단계 완료 후 Git 커밋 (선택):
```bash
git add .
git commit -m "feat: Step X 완료 - [기능명]"
```

#### 진행 상황 저장:
```
@claude 현재까지의 진행상황을 정리해줘.

- 완료된 기능 목록
- 현재 작업 중인 내용  
- 다음 단계 계획
- 발견된 이슈들

PROGRESS.md에 기록해줘.
```

## 🎯 각 단계별 예상 소요시간

| 단계 | 내용 | 예상시간 | 누적시간 |
|------|------|----------|----------|
| Step 1-2 | 프로젝트 설정 + 레이아웃 | 60-90분 | 90분 |
| Step 3-4 | 메인페이지 + 상태관리 | 90-120분 | 210분 |
| Step 5-6 | 인증 + 강의실 | 120-150분 | 360분 |
| Step 7-8 | 수강신청 + 플레이어 | 120-180분 | 540분 |
| Step 9-10 | 지원페이지 + 수료증 | 90-120분 | 660분 |
| Step 11 | 최종 완성도 | 60-90분 | 750분 |

**총 예상 시간: 12-13시간** (2-3일 작업)

## 💡 효율적인 작업 팁

### 1. 세션 단위로 작업
- **1세션**: Step 1-2 (기본 설정)
- **2세션**: Step 3-4 (메인 기능)  
- **3세션**: Step 5-6 (핵심 기능)
- **4세션**: Step 7-8 (학습 기능)
- **5세션**: Step 9-11 (완성도)

### 2. 각 세션 시작 시
```
@claude 새로운 개발 세션을 시작하자.

현재 상황:
- PROGRESS.md를 확인해서 어디까지 완료되었는지 알려줘
- 다음에 해야 할 작업이 무엇인지 확인해줘
- 이전에 발견된 이슈가 있다면 먼저 해결하자

준비되면 다음 단계를 진행하자.
```

### 3. 각 세션 종료 시
```
@claude 세션을 마무리하자.

다음 작업을 해줘:
- 현재까지 완료된 내용 정리
- PROGRESS.md 업데이트
- 다음 세션에서 할 일 정리
- 현재 코드 상태 검수 (에러, 경고 확인)

다음에 이어서 작업할 수 있도록 정리해줘.
```

## 🚨 주의사항

### 절대 하지 말 것:
1. **여러 단계를 한 번에 요청하지 마세요** - 단계별로 차근차근
2. **문서를 무시하고 다른 방식으로 요청하지 마세요** - 지침을 따라주세요
3. **에러가 있는 상태로 다음 단계로 넘어가지 마세요** - 반드시 해결 후 진행

### 반드시 할 것:
1. **각 단계 완료 후 테스트** - 브라우저에서 직접 확인
2. **문서 참조** - 지침, 요구사항, 컴포넌트 명세 확인
3. **진행상황 기록** - PROGRESS.md 지속적 업데이트

이 가이드를 따라 차근차근 진행하면 고품질의 사이버연수원을 완성할 수 있습니다! 🎓