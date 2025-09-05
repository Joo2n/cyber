# Cursor에서 Claude Code 사용 가이드 (수정본)

## 1. 초기 설정

### 1.1 Claude Code 활성화
1. Cursor 에디터에서 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. "Claude Code" 검색
3. "Claude Code: Start" 선택
4. 또는 터미널에서 `claude-code` 명령어 실행

### 1.2 프로젝트 초기화
```bash
# 프로젝트 폴더로 이동
cd C:\Users\user\Downloads\tomatopass-cyber-academy

# 패키지 초기화 (Step 1에서 Claude가 자동 실행)
npm init -y
```

## 2. 현재 파일 구조

### 2.1 전체 파일 구조
```
C:\Users\user\Downloads\tomatopass-cyber-academy\
├── docs/                                    # 개발 실행 지침
│   ├── claude_instructions.md               # Claude Code 개발 규칙
│   ├── component_specs.md                   # 컴포넌트 구현 명세
│   ├── development_guide.md                 # 개발 실행 가이드
│   ├── execution_order.md                   # 실행 순서 가이드
│   ├── progress.md                          # 진행상황 추적
│   └── project_requirements.md              # 프로젝트 요구사항
└── confirmed/                               # 상세 기획 문서
    ├── cursor_claude_guide.md               # 이 파일
    ├── function_specs.md                    # 기능 명세서
    ├── ia.md                               # IA 설계
    ├── navigation_structure.md              # 네비게이션 구조
    ├── sitemap.md                          # 사이트맵
    └── ui_design_guide.md                  # UI 디자인 가이드
```

## 3. Claude Code 실행 방법

### 3.1 효과적인 지시 방법
Cursor의 채팅창이나 Claude Code에서 다음과 같이 지시하세요:

```
@claude 다음 요구사항에 따라 사이버연수원을 개발해줘:

📋 프로젝트 정보:
- 프로젝트명: tomatopass 사이버연수원
- 기술스택: React + TypeScript + Tailwind CSS
- 목적: 심플한 온라인 교육 플랫폼

🎯 참고 문서:
상세 기획 문서:
- confirmed/ia.md (IA 설계)
- confirmed/navigation_structure.md (네비게이션 구조)
- confirmed/sitemap.md (사이트맵)
- confirmed/function_specs.md (기능 명세)
- confirmed/ui_design_guide.md (UI 디자인 가이드)

개발 실행 지침:
- docs/claude_instructions.md (개발 규칙)
- docs/project_requirements.md (프로젝트 요구사항)
- docs/component_specs.md (컴포넌트 명세)
- docs/development_guide.md (11단계 가이드)
- docs/execution_order.md (실행 순서)

🚀 첫 번째 단계로 docs/execution_order.md의 Step 1을 실행해줘.
```

### 3.2 단계별 개발 지시
각 기능별로 다음과 같이 세분화해서 지시:

```
@claude 1단계: 프로젝트 기본 설정을 해줘

다음 파일들을 참고해서:
- docs/claude_instructions.md (개발 규칙)
- docs/project_requirements.md (기술 스택)

- Create React App with TypeScript 설정
- Tailwind CSS 설치 및 설정
- 기본 폴더 구조 생성
- Router 설정
- 기본 레이아웃 컴포넌트 생성

설정이 완료되면 다음 명령어로 실행할 수 있도록 해줘:
npm run dev
```

## 4. 개발 지침 활용

### 4.1 Claude Code에게 전달할 개발 규칙

프로젝트 진행 시 항상 다음 파일들을 참조하도록 지시:

```markdown
# 개발 시 필수 참조 파일들

## 📋 기획 문서 (무엇을 만들지)
- confirmed/ia.md - 정보 구조 설계
- confirmed/navigation_structure.md - 메뉴 구조
- confirmed/sitemap.md - 페이지 구조
- confirmed/function_specs.md - 기능 상세 명세
- confirmed/ui_design_guide.md - 디자인 가이드

## 🎯 개발 지침 (어떻게 만들지)
- docs/claude_instructions.md - 코딩 규칙 및 스타일
- docs/project_requirements.md - 프로젝트 요구사항
- docs/component_specs.md - 컴포넌트 구현 명세
- docs/development_guide.md - 11단계 개발 가이드
- docs/execution_order.md - 실행 순서 가이드
```

### 4.2 각 단계별 참조 방법

**Step 1-2 (프로젝트 설정)**: 
```
참조: docs/claude_instructions.md, docs/project_requirements.md
```

**Step 3-4 (메인 페이지)**:
```
참조: confirmed/ui_design_guide.md, docs/component_specs.md
```

**Step 5-6 (인증 시스템)**:
```
참조: confirmed/function_specs.md, docs/component_specs.md
```

**Step 7-8 (학습 기능)**:
```
참조: confirmed/ia.md, confirmed/function_specs.md
```

## 5. 실제 개발 시작 방법

### 5.1 첫 번째 명령어
Cursor 채팅창에서 다음과 같이 시작하세요:

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
- docs/development_guide.md
- docs/execution_order.md

docs/execution_order.md의 Step 1을 실행해줘:

🎯 1단계: 프로젝트 기본 설정
- React + TypeScript 프로젝트 생성 (Vite 사용)
- Tailwind CSS 설치 및 설정
- 필요한 패키지 설치
- 기본 폴더 구조 생성
- ESLint, Prettier 설정

각 단계별로 코드를 생성하고 설명해줘.
파일별로 어떤 내용이 들어가는지 명확하게 알려줘.
```

### 5.2 단계별 진행 방법

1. **1단계 완료 후**:
```
@claude 1단계가 완료되었어. 이제 2단계로 넘어가자.

docs/progress.md를 업데이트하고,
docs/development_guide.md의 Step 2를 실행해줘:

- 기본 레이아웃 구성
- 라우터 설정
- Header/Footer 컴포넌트
- confirmed/navigation_structure.md를 참고해서 네비게이션 구현

사용자 친화적인 UI로 만들어줘.
```

2. **기능별 상세 요청**:
```
@claude 나의 강의실 대시보드를 만들어줘.

요구사항:
- confirmed/function_specs.md의 강의실 명세 참고
- docs/component_specs.md의 StatsCard, LectureList 활용
- 학습 현황 카드 (수강중/완료/수료증/진도율)
- 진행중인 강의 목록 (진도바 포함)
- 최근 완료 강의 목록
- 각 강의별 [이어보기] 버튼
- 반응형 그리드 레이아웃

confirmed/ui_design_guide.md의 디자인 시스템을 적용해줘.
```

### 5.3 문제 해결 요청
```
@claude 문제가 발생했어.

문제상황: [구체적인 에러나 이슈 설명]

현재 코드: [관련 코드 붙여넣기]

기대하는 결과: [원하는 동작 설명]

다음 문서들을 참고해서 해결해줘:
- docs/claude_instructions.md (개발 지침)
- confirmed/ui_design_guide.md (디자인 가이드)
```

## 6. 효과적인 협업 팁

### 6.1 명확한 요구사항 전달
- 기능의 목적과 사용자 시나리오 설명
- 예상 결과물 구체적으로 명시
- 제약사항이나 고려사항 언급
- 우선순위 명확히 표시
- **항상 관련 문서 파일들 명시**

### 6.2 코드 리뷰 요청
```
@claude 방금 생성한 코드를 리뷰해줘.

다음 관점에서 확인해줘:
- docs/claude_instructions.md 개발 지침 준수 여부
- confirmed/ui_design_guide.md 디자인 가이드 준수
- 성능 최적화 포인트
- 보안 취약점
- 접근성 고려사항
- 개선 가능한 부분

구체적인 수정 제안도 해줘.
```

### 6.3 단위별 테스트 요청
```
@claude 방금 만든 컴포넌트에 대한 테스트 코드를 작성해줘.

테스트 시나리오:
- 정상 렌더링 테스트
- 사용자 인터랙션 테스트  
- 에러 상황 테스트
- 접근성 테스트

Jest + React Testing Library 사용해서 만들어줘.
docs/claude_instructions.md의 테스트 전략을 따라서 구현해줘.
```

## 7. 진행 상황 관리

### 7.1 체크리스트 활용
`docs/progress.md` 파일을 지속적으로 업데이트:

```markdown
# 개발 진행 상황

## ✅ 완료된 기능
- [x] 프로젝트 초기 설정
- [x] 기본 레이아웃 구성
- [x] 메인 페이지

## 🔄 진행 중인 기능
- [ ] 로그인/회원가입
- [ ] 나의 강의실

## 📋 예정된 기능
- [ ] 수강신청
- [ ] 강의 재생
- [ ] 진도율 관리
- [ ] 수료증 관리
- [ ] 공지사항/FAQ

## 🐛 발견된 이슈
- Issue 1: [설명]
- Issue 2: [설명]

## 🎯 다음 목표
이번 주: 로그인 기능 완료
다음 주: 강의실 대시보드 완료
```

### 7.2 정기적인 코드 정리 요청
```
@claude 프로젝트 전체를 정리해줘.

다음 작업을 해줘:
1. 사용하지 않는 imports 제거
2. 코드 포맷팅 정리  
3. 타입 정의 보완
4. 주석 추가 (한글로)
5. 폴더 구조 최적화

docs/claude_instructions.md의 개발 지침에 맞게 전체적으로 리팩토링해줘.
```

## 8. 주의사항 및 팁

### 8.1 필수 확인 사항
- 각 단계 완료 후 `npm run dev`로 정상 실행 확인
- 브라우저에서 실제 기능 테스트
- TypeScript 에러 없는지 확인
- 반응형 디자인 모바일에서 확인

### 8.2 효율적인 개발을 위한 팁
1. **문서 기반 개발**: 항상 관련 문서들 참조 지시
2. **단계별 진행**: 한 번에 여러 기능 요청하지 말고 단계별로
3. **진행 상황 기록**: `docs/progress.md` 지속적 업데이트
4. **품질 검증**: 각 단계마다 코드 리뷰 요청

이렇게 체계적으로 접근하면 Claude Code가 일관되고 고품질의 코드를 생성할 수 있습니다! 🎓