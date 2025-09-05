# 사이트맵 (Sitemap) 설계서

## 1. 사이트맵 개요

### 1.1 목적
웹사이트 콘텐츠의 조직화를 보여주는 시각적 표현으로, 웹사이트의 조직과 구조를 계획하는 참조 도구

### 1.2 사이트맵 유형
**비주얼 사이트맵**: 웹사이트 계획 시 모든 의도된 페이지와 링크된 콘텐츠를 계층적 순서로 나열한 목록

**XML 사이트맵**: 검색엔진을 위해 설계된 것으로, 웹사이트의 모든 페이지 맵을 제공하여 검색엔진 크롤러가 구조를 이해하고 사이트를 더 효과적으로 인덱싱할 수 있도록 지원

## 2. 전체 사이트 페이지 구조

### 2.1 메인 사이트 구조
```
tomatopass.com
├── 홈페이지 (/)
├── 회원 관리
│   ├── 회원가입 (/join)
│   │   ├── 개인 회원가입 (/join/individual)
│   │   └── B2B 회원가입 (/join/b2b)
│   ├── 로그인 (/login)
│   ├── 로그아웃 (/logout)
│   ├── 아이디 찾기 (/find-id)
│   ├── 비밀번호 찾기 (/find-password)
│   ├── 비밀번호 재설정 (/reset-password)
│   ├── 이메일 인증 (/verify-email)
│   └── 회원정보 수정 (/profile/edit)
├── 내 강의실 (/classroom)
│   ├── 대시보드 (/classroom/dashboard)
│   ├── 진행 중인 강의 (/classroom/courses/ongoing)
│   ├── 완료된 강의 (/classroom/courses/completed)
│   ├── 강의 상세 (/classroom/course/{courseId})
│   ├── 강의 재생 (/classroom/course/{courseId}/play)
│   ├── 학습 진도 관리 (/classroom/progress)
│   ├── 수료증 관리 (/classroom/certificates)
│   ├── 수료증 출력 (/classroom/certificate/{id}/print)
│   ├── 강의 만족도 조사 (/classroom/survey/{courseId})
│   └── 학습 통계 (/classroom/statistics)
├── 수강 신청 (/registration)
│   ├── 과정 목록 (/registration/courses)
│   ├── 과정 상세 (/registration/course/{courseId})
│   ├── 과정 신청 (/registration/course/{courseId}/apply)
│   ├── 신청 완료 (/registration/complete)
│   ├── 신청 내역 (/registration/history)
│   ├── 관심 목록 (/registration/wishlist)
│   └── 장바구니 (/registration/cart)
├── 고객 지원 (/support)
│   ├── 공지사항 (/support/notices)
│   │   ├── 공지사항 목록 (/support/notices/list)
│   │   └── 공지사항 상세 (/support/notice/{id})
│   ├── FAQ (/support/faq)
│   │   ├── FAQ 목록 (/support/faq/list)
│   │   ├── FAQ 상세 (/support/faq/{id})
│   │   └── FAQ 검색 결과 (/support/faq/search)
│   ├── Q&A 문의 (/support/qna)
│   │   ├── 문의 작성 (/support/qna/write)
│   │   ├── 문의 목록 (/support/qna/list)
│   │   ├── 문의 상세 (/support/qna/{id})
│   │   └── 문의 수정 (/support/qna/{id}/edit)
│   ├── 강사 1:1 문의 (/support/instructor-qna)
│   │   ├── 강사 문의 작성 (/support/instructor-qna/write)
│   │   ├── 강사 문의 목록 (/support/instructor-qna/list)
│   │   └── 강사 문의 상세 (/support/instructor-qna/{id})
│   ├── 학습 장애 해결 (/support/tech-help)
│   ├── 원격 지원 (/support/remote-support)
│   └── 원격 지원 신청 (/support/remote-support/request)
├── 마이페이지 (/mypage)
│   ├── 개인정보 수정 (/mypage/profile)
│   ├── 비밀번호 변경 (/mypage/change-password)
│   ├── 알림 설정 (/mypage/notification-settings)
│   ├── 학습 설정 (/mypage/learning-settings)
│   └── 회원 탈퇴 (/mypage/withdrawal)
└── 정보 페이지
    ├── 이용약관 (/terms)
    ├── 개인정보처리방침 (/privacy)
    ├── 쿠키 정책 (/cookie-policy)
    ├── 사이트맵 (/sitemap)
    └── 접근성 정책 (/accessibility)
```

### 2.2 B2B 회사별 전용 사이트
```
tomatopass.com/{companyCode}
├── 회사별 메인페이지 (/{companyCode})
├── 회사별 회원가입 (/{companyCode}/join)
├── 회사별 로그인 (/{companyCode}/login)
├── 가입 승인 대기 (/{companyCode}/pending)
├── 가입 승인 완료 (/{companyCode}/approved)
└── 가입 거부 안내 (/{companyCode}/rejected)
```

### 2.3 회사 관리자 시스템
```
tomatopass.com/company-admin/{companyCode}
├── 관리자 로그인 (/company-admin/{companyCode}/login)
├── 관리자 대시보드 (/company-admin/{companyCode}/dashboard)
├── 수강생 관리 (/company-admin/{companyCode}/students)
│   ├── 승인 대기 목록 (/company-admin/{companyCode}/students/pending)
│   ├── 수강생 목록 (/company-admin/{companyCode}/students/list)
│   ├── 수강생 상세 (/company-admin/{companyCode}/student/{id})
│   ├── 수강생 등록 (/company-admin/{companyCode}/students/register)
│   ├── 일괄 등록 (/company-admin/{companyCode}/students/bulk-register)
│   └── 수강생 승인 처리 (/company-admin/{companyCode}/students/approve)
├── 과정 관리 (/company-admin/{companyCode}/courses)
│   ├── 수강 가능 과정 설정 (/company-admin/{companyCode}/courses/available)
│   ├── 과정 배정 (/company-admin/{companyCode}/courses/assign)
│   ├── 과정별 신청 현황 (/company-admin/{companyCode}/courses/enrollment-status)
│   └── 과정 개설 관리 (/company-admin/{companyCode}/courses/management)
├── 학습 현황 (/company-admin/{companyCode}/progress)
│   ├── 전체 진도 현황 (/company-admin/{companyCode}/progress/overall)
│   ├── 부서별 현황 (/company-admin/{companyCode}/progress/by-department)
│   ├── 개별 진도 상세 (/company-admin/{companyCode}/progress/individual)
│   ├── 시험 평가 현황 (/company-admin/{companyCode}/progress/assessments)
│   └── 접속 로그 분석 (/company-admin/{companyCode}/progress/access-logs)
├── 수료 관리 (/company-admin/{companyCode}/completion)
│   ├── 수료 승인 대기 (/company-admin/{companyCode}/completion/pending)
│   ├── 수료 승인 처리 (/company-admin/{companyCode}/completion/approve)
│   ├── 수료증 발급 현황 (/company-admin/{companyCode}/completion/certificates)
│   └── 수료 통계 (/company-admin/{companyCode}/completion/statistics)
├── 행정 처리 (/company-admin/{companyCode}/administration)
│   ├── 환불 신청 관리 (/company-admin/{companyCode}/administration/refunds)
│   ├── 환불 승인 처리 (/company-admin/{companyCode}/administration/refund-approval)
│   ├── 신청 내역 조회 (/company-admin/{companyCode}/administration/enrollment-history)
│   ├── 공지사항 관리 (/company-admin/{companyCode}/administration/notices)
│   ├── 공지사항 작성 (/company-admin/{companyCode}/administration/notice/write)
│   └── 메시지 발송 (/company-admin/{companyCode}/administration/messages)
├── 통계 및 리포트 (/company-admin/{companyCode}/reports)
│   ├── 종합 통계 (/company-admin/{companyCode}/reports/overall)
│   ├── 학습 분석 (/company-admin/{companyCode}/reports/learning-analytics)
│   ├── 부서별 비교 (/company-admin/{companyCode}/reports/department-comparison)
│   ├── 월간 리포트 (/company-admin/{companyCode}/reports/monthly)
│   └── 리포트 출력 (/company-admin/{companyCode}/reports/export)
└── 설정 (/company-admin/{companyCode}/settings)
    ├── 회사 정보 수정 (/company-admin/{companyCode}/settings/company-info)
    ├── 관리자 정보 수정 (/company-admin/{companyCode}/settings/admin-info)
    ├── 알림 설정 (/company-admin/{companyCode}/settings/notifications)
    └── 권한 설정 (/company-admin/{companyCode}/settings/permissions)
```

### 2.4 시스템 관리자 페이지
```
tomatopass.com/admin
├── 관리자 로그인 (/admin/login)
├── 시스템 대시보드 (/admin/dashboard)
├── 회사 관리 (/admin/companies)
│   ├── 회사 목록 (/admin/companies/list)
│   ├── 회사 등록 (/admin/companies/register)
│   ├── 회사 상세 (/admin/companies/{id})
│   ├── 회사 수정 (/admin/companies/{id}/edit)
│   ├── 계약 관리 (/admin/companies/{id}/contracts)
│   └── 회사별 통계 (/admin/companies/{id}/statistics)
├── 전체 사용자 관리 (/admin/users)
│   ├── 사용자 목록 (/admin/users/list)
│   ├── 사용자 상세 (/admin/users/{id})
│   ├── 사용자 권한 관리 (/admin/users/{id}/permissions)
│   ├── 일괄 처리 (/admin/users/bulk-actions)
│   └── 사용자 통계 (/admin/users/statistics)
├── 과정 관리 (/admin/courses)
│   ├── 과정 목록 (/admin/courses/list)
│   ├── 과정 등록 (/admin/courses/create)
│   ├── 과정 수정 (/admin/courses/{id}/edit)
│   ├── 과정 삭제 (/admin/courses/{id}/delete)
│   ├── 강의 관리 (/admin/courses/{id}/lectures)
│   ├── 과정 배정 관리 (/admin/courses/assignments)
│   └── 과정 통계 (/admin/courses/statistics)
├── 환불 처리 (/admin/refunds)
│   ├── 환불 요청 목록 (/admin/refunds/list)
│   ├── 환불 승인 처리 (/admin/refunds/{id}/approve)
│   ├── 환불 거부 처리 (/admin/refunds/{id}/reject)
│   ├── 환불 실행 (/admin/refunds/{id}/process)
│   └── 환불 통계 (/admin/refunds/statistics)
├── 전체 통계 (/admin/statistics)
│   ├── 시스템 전체 통계 (/admin/statistics/overall)
│   ├── 회사별 성과 비교 (/admin/statistics/company-comparison)
│   ├── 매출 통계 (/admin/statistics/revenue)
│   ├── 사용량 모니터링 (/admin/statistics/usage)
│   └── 트렌드 분석 (/admin/statistics/trends)
├── 시스템 설정 (/admin/settings)
│   ├── 사이트 설정 (/admin/settings/site-config)
│   ├── 이메일 템플릿 (/admin/settings/email-templates)
│   ├── 사용자 권한 설정 (/admin/settings/user-roles)
│   ├── 결제 설정 (/admin/settings/payment)
│   └── 보안 설정 (/admin/settings/security)
└── 시스템 모니터링 (/admin/monitoring)
    ├── 시스템 로그 (/admin/monitoring/system-logs)
    ├── 에러 로그 (/admin/monitoring/error-logs)
    ├── 성능 모니터링 (/admin/monitoring/performance)
    ├── 사용자 활동 로그 (/admin/monitoring/user-activity)
    └── 보안 이벤트 (/admin/monitoring/security-events)
```

### 2.5 오류 및 특수 페이지
```
오류 페이지
├── 404 페이지 (/404)
├── 500 페이지 (/500)
├── 403 페이지 (/403)
├── 503 페이지 (/503)
└── 일반 오류 페이지 (/error)

특수 페이지
├── 점검 중 페이지 (/maintenance)
├── 로딩 페이지 (/loading)
├── 성공 페이지 (/success)
└── 확인 페이지 (/confirm)
```

## 3. 페이지별 상세 정보

### 3.1 페이지 ID 및 우선순위 분류
| 페이지 분류 | 우선순위 | 페이지 수 | 설명 |
|------------|----------|-----------|------|
| 핵심 기능 페이지 | High | 15개 | 로그인, 내강의실, 강의재생 등 |
| 관리 기능 페이지 | High | 25개 | 회사관리자, 시스템관리자 핵심 기능 |
| 지원 기능 페이지 | Medium | 12개 | FAQ, 공지사항, 문의 등 |
| 정보 페이지 | Low | 8개 | 약관, 정책, 도움말 등 |
| 오류 페이지 | Low | 5개 | 404, 500 등 오류 처리 |

### 3.2 URL 명명 규칙
**일반 원칙**
- 소문자 사용
- 하이픈(-) 사용으로 단어 구분
- 계층 구조 반영
- 의미 있는 키워드 포함

**예시**
- `/classroom/courses/ongoing` (진행 중인 강의)
- `/company-admin/{code}/students/pending` (승인 대기 수강생)
- `/support/instructor-qna/write` (강사 문의 작성)

### 3.3 동적 페이지 매개변수
**패턴 정의**
- `{courseId}`: 과정 고유 식별자
- `{companyCode}`: 회사 코드 (예: samsung, lg)
- `{userId}`: 사용자 고유 식별자  
- `{id}`: 범용 고유 식별자

## 4. 사이트맵 유지보수 계획

### 4.1 정기 업데이트 주기
**월간 검토**
- 새로 추가된 페이지 확인
- 사용하지 않는 페이지 식별
- URL 구조 최적화 검토

**분기별 전면 검토**
- 전체 사이트 구조 재평가
- 사용자 행동 데이터 기반 구조 개선
- SEO 관점 URL 최적화

### 4.2 XML 사이트맵 관리
**자동 생성 규칙**
- 모든 public 페이지 포함
- 로그인 필요 페이지 제외
- 중복 콘텐츠 페이지 제외
- 404 오류 페이지 제외

**우선순위 설정**
- 홈페이지: 1.0
- 메인 기능 페이지: 0.8
- 서브 기능 페이지: 0.6
- 정보 페이지: 0.4

### 4.3 검색엔진 최적화
**크롤링 최적화**
- robots.txt 파일 관리
- XML 사이트맵 Search Console 제출
- 크롤링 오류 모니터링

**인덱싱 관리**
- 중요 페이지 우선 인덱싱
- 중복 페이지 canonical 설정
- 임시 페이지 noindex 처리

## 5. 사이트맵 시각화

### 5.1 계층 깊이 분석
```
레벨 1 (Root): 1개
├── 메인 홈페이지

레벨 2 (Main Section): 8개  
├── 회원관리, 내강의실, 수강신청, 고객지원
├── 마이페이지, 회사관리자, 시스템관리자, 정보페이지

레벨 3 (Sub Section): 35개
├── 각 메인 섹션별 하위 기능

레벨 4 (Detail Page): 60개
├── 상세 페이지, 작성/수정 페이지

레벨 5 (Deep Page): 15개
└── 매우 상세한 설정/관리 페이지
```

### 5.2 페이지 관계도
**선형 관계 (Linear)**
- 회원가입 → 이메일인증 → 가입완료
- 과정선택 → 신청 → 결제 → 신청완료

**계층 관계 (Hierarchical)**  
- 내강의실 > 진행중인강의 > 강의상세 > 강의재생
- 관리자 > 수강생관리 > 수강생상세 > 수강생편집

**망형 관계 (Web)**
- FAQ ↔ 문의하기 ↔ 공지사항
- 강의목록 ↔ 관심목록 ↔ 장바구니

## 6. 모바일 사이트맵 고려사항

### 6.1 모바일 전용 경로
**간소화된 네비게이션**
- 핵심 기능 중심 구성
- 깊이 3레벨 이하 권장
- 터치 친화적 경로 설계

**모바일 최적화 페이지**
- `/m/classroom/dashboard` (모바일 대시보드)
- `/m/course/{id}/play` (모바일 플레이어)
- `/m/support/quick-help` (빠른 도움말)

### 6.2 반응형 vs 적응형 고려
**반응형 설계 시**
- 동일 URL 구조 유지
- 디바이스별 다른 UI만 제공

**적응형 설계 시**  
- 모바일 전용 서브도메인 (`m.tomatopass.com`)
- 또는 모바일 경로 (`/m/...`) 별도 구성

## 7. 사이트맵 검증 체크리스트

### 7.1 구조적 검증
- [ ] 모든 중요 기능이 3클릭 내 접근 가능
- [ ] 고아 페이지(orphan page) 없음
- [ ] 깨진 링크 없음
- [ ] 순환 참조 없음
- [ ] 일관된 URL 구조

### 7.2 사용성 검증
- [ ] 논리적 정보 계층 구조
- [ ] 직관적 경로명
- [ ] 사용자 목표 달성 경로 명확
- [ ] 뒤로가기/앞으로가기 지원

### 7.3 기술적 검증
- [ ] SEO 친화적 URL 구조
- [ ] 다국어 확장 가능 구조
- [ ] 캐싱 최적화 고려
- [ ] 보안 접근 제어 적용

## 8. 향후 확장 계획

### 8.1 기능 확장 시 고려사항
**새로운 사용자 유형 추가**
- 강사 전용 페이지 (`/instructor/*`)
- 파트너 관리 페이지 (`/partner/*`)

**새로운 서비스 확장**
- 라이브 강의 (`/live/*`)
- 커뮤니티 기능 (`/community/*`)
- 모바일 앱 연동 (`/app/*`)

### 8.2 다국어 지원 확장
**언어별 경로 구조**
- `/ko/...` (한국어)
- `/en/...` (영어)  
- `/ja/...` (일본어)

**또는 서브도메인 방식**
- `ko.tomatopass.com`
- `en.tomatopass.com`
- `ja.tomatopass.com`