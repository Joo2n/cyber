# 심플 사이버연수원 사이트맵 설계서

## 1. 사이트맵 개요

### 1.1 목적
심플한 온라인 교육 플랫폼의 핵심 기능만 포함한 명확하고 직관적인 사이트 구조 설계

### 1.2 설계 원칙
- **단순성**: 핵심 기능만 포함하여 사용자 혼란 최소화
- **직관성**: 사용자 목적에 맞는 명확한 경로 제공
- **효율성**: 최소 클릭으로 목표 달성

## 2. 전체 사이트 구조 (심플화)

```
tomatopass.com 사이버연수원
├── 홈페이지 (/)
├── 회원 관리
│   ├── 회원가입 (/join)
│   ├── 로그인 (/login)
│   ├── 로그아웃 (/logout)
│   ├── 아이디 찾기 (/find-id)
│   └── 비밀번호 찾기 (/find-password)
├── 나의 강의실 (/classroom) ⭐ 핵심
│   ├── 대시보드 (/classroom/dashboard)
│   ├── 수강 중인 강의 (/classroom/ongoing)
│   ├── 완료된 강의 (/classroom/completed)
│   ├── 강의 재생 (/classroom/course/{id}/play)
│   ├── 진도율 확인 (/classroom/progress)
│   └── 수료증 확인 (/classroom/certificates)
├── 수강신청 (/courses) ⭐ 핵심
│   ├── 전체 과정 (/courses/all)
│   ├── 과정 상세 (/courses/{id})
│   ├── 과정 신청 (/courses/{id}/apply)
│   └── 인기 과정 (/courses/popular)
├── 공지사항 (/notices) ⭐ 핵심
│   ├── 전체 공지 (/notices/all)
│   └── 공지 상세 (/notices/{id})
├── 도움말 (/help) ⭐ 핵심
│   ├── FAQ (/help/faq)
│   ├── Q&A 문의 (/help/qna)
│   ├── 문의 작성 (/help/qna/write)
│   └── 학습지원센터 (/help/support)
└── 기타
    ├── 이용약관 (/terms)
    ├── 개인정보처리방침 (/privacy)
    └── 사이트맵 (/sitemap)
```

## 3. 페이지별 상세 정보

### 3.1 핵심 페이지 (High Priority)
| 페이지 | URL | 기능 | 로그인 필요 |
|--------|-----|------|-------------|
| 홈페이지 | / | 메인 랜딩, 로그인 폼 | X |
| 로그인 | /login | 사용자 인증 | X |
| 회원가입 | /join | 신규 회원 등록 | X |
| 나의 강의실 | /classroom | 개인 학습 대시보드 | O |
| 수강신청 | /courses | 과정 목록 및 신청 | X |
| 공지사항 | /notices | 중요 안내사항 | X |
| 도움말 | /help | FAQ, 문의하기 | X |

### 3.2 서브 페이지 (Medium Priority)
| 페이지 | URL | 기능 | 로그인 필요 |
|--------|-----|------|-------------|
| 강의 재생 | /classroom/course/{id}/play | 동영상 학습 | O |
| 진도율 확인 | /classroom/progress | 학습 진척도 확인 | O |
| 수료증 확인 | /classroom/certificates | 수료증 출력/다운로드 | O |
| 과정 상세 | /courses/{id} | 과정 정보 상세보기 | X |
| Q&A 문의 | /help/qna | 질문 작성 및 답변 | O |

### 3.3 정보 페이지 (Low Priority)
| 페이지 | URL | 기능 | 로그인 필요 |
|--------|-----|------|-------------|
| 이용약관 | /terms | 서비스 약관 | X |
| 개인정보처리방침 | /privacy | 개인정보 정책 | X |
| 사이트맵 | /sitemap | 전체 사이트 구조 | X |

## 4. URL 명명 규칙 (심플화)

### 4.1 기본 원칙
- 영어 소문자 사용
- 단순하고 직관적인 단어 선택
- 계층 구조를 명확히 반영

### 4.2 예시
```
✅ 좋은 예:
/classroom/ongoing        (진행 중인 강의)
/courses/popular         (인기 과정)
/help/faq               (자주 묻는 질문)

❌ 복잡한 예:
/classroom/courses/ongoing-lectures
/registration/course-enrollment/popular-courses
/customer-support/frequently-asked-questions
```

## 5. 네비게이션 매핑

### 5.1 메인 네비게이션 → URL 매핑
```
나의 강의실 → /classroom
수강신청 → /courses
공지사항 → /notices
도움말 → /help
로그인 → /login
```

### 5.2 브레드크럼 예시
```
홈 > 나의 강의실 > 수강 중인 강의
홈 > 수강신청 > Python 기초 프로그래밍
홈 > 도움말 > FAQ
```

## 6. 사용자 플로우별 경로

### 6.1 신규 사용자 학습 시작 플로우
```
홈페이지(/) 
→ 회원가입(/join) 
→ 로그인(/login) 
→ 수강신청(/courses) 
→ 과정선택(/courses/{id}) 
→ 신청완료 
→ 나의강의실(/classroom) 
→ 강의재생(/classroom/course/{id}/play)
```

### 6.2 기존 사용자 학습 플로우
```
홈페이지(/) 
→ 로그인(/login) 
→ 나의강의실(/classroom) 
→ 강의재생(/classroom/course/{id}/play)
```

### 6.3 수료증 확인 플로우
```
로그인(/login) 
→ 나의강의실(/classroom) 
→ 수료증확인(/classroom/certificates)
```

### 6.4 문의하기 플로우
```
도움말(/help) 
→ Q&A문의(/help/qna) 
→ 문의작성(/help/qna/write)
```

## 7. 검색 최적화 (SEO)

### 7.1 중요도별 페이지 우선순위
```
우선순위 1.0: 홈페이지 (/)
우선순위 0.9: 수강신청 (/courses)
우선순위 0.8: 나의 강의실 (/classroom)
우선순위 0.7: 공지사항 (/notices)
우선순위 0.6: 도움말 (/help)
우선순위 0.4: 기타 정보 페이지
```

### 7.2 검색엔진 제외 페이지
- 로그인 필요 페이지 (/classroom/*)
- 개인정보 관련 페이지
- 에러 페이지

## 8. 모바일 고려사항

### 8.1 모바일 우선 경로
핵심 기능에 빠른 접근이 가능하도록 단순화:
```
모바일 메인 → 햄버거 메뉴 → 핵심 기능 (4개 이하)
```

### 8.2 터치 친화적 네비게이션
- 메뉴 항목 간 충분한 간격
- 명확한 버튼 영역
- 스와이프 제스처 지원 (강의 재생 시)

## 9. 제거된 복잡한 구조들

기존 복잡한 구조에서 제거한 항목들:
- B2B 회사별 전용 사이트 (`/{companyCode}`)
- 회사 관리자 시스템 (`/company-admin/*`)
- 시스템 관리자 페이지 (`/admin/*`)
- 복잡한 통계 페이지들
- 다중 권한 체계 페이지들
- 환불 관리 시스템
- 복잡한 사용자 관리 기능

## 10. 향후 확장 고려사항

### 10.1 단계적 확장 가능성
현재 심플 구조를 유지하면서 필요시 확장:
```
현재: /courses
확장시: /courses/categories/{category}
```

### 10.2 기능 추가 시 고려사항
- 기존 URL 구조 유지
- 새로운 기능은 기존 경로 하위에 추가
- 사용자 혼란 최소화를 위한 점진적 확장