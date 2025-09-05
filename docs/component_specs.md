# 컴포넌트 상세 명세서

## 📋 개요
이 문서는 사이버연수원의 주요 컴포넌트들에 대한 상세 명세를 제공합니다.
Claude Code가 일관된 컴포넌트를 생성할 수 있도록 가이드합니다.

## 🎨 공통 컴포넌트 명세

### Button 컴포넌트
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**스타일 규칙**:
- Primary: `bg-blue-600 text-white hover:bg-blue-700`
- Secondary: `bg-gray-100 text-gray-900 hover:bg-gray-200`
- Ghost: `bg-transparent border border-gray-300 hover:bg-gray-50`
- Danger: `bg-red-600 text-white hover:bg-red-700`

### Input 컴포넌트
```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'tel';
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

**스타일 규칙**:
- 기본: `border border-gray-300 rounded-md px-3 py-2`
- 포커스: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
- 에러: `border-red-500 focus:ring-red-500`

### Card 컴포넌트
```typescript
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
}
```

**스타일 규칙**:
- 기본: `bg-white rounded-lg border border-gray-200`
- Shadow: `shadow-sm hover:shadow-md transition-shadow`

## 📱 레이아웃 컴포넌트

### Header 컴포넌트
```typescript
interface HeaderProps {
  user?: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}
```

**구조**:
```jsx
<header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      {/* 로고 */}
      <Logo />
      
      {/* 네비게이션 */}
      <Navigation />
      
      {/* 사용자 메뉴 */}
      <UserMenu user={user} onLogout={onLogout} />
    </div>
  </div>
</header>
```

### Navigation 컴포넌트
```typescript
interface NavigationProps {
  currentPath: string;
}

const menuItems = [
  { path: '/classroom', label: '나의 강의실' },
  { path: '/courses', label: '수강신청' },
  { path: '/notices', label: '공지사항' },
  { path: '/support', label: '도움말' },
];
```

### Footer 컴포넌트
```jsx
<footer className="bg-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 회사 정보 */}
      <div>
        <h3>tomatopass.com</h3>
        <p>온라인 교육 플랫폼</p>
      </div>
      
      {/* 고객지원 */}
      <div>
        <h3>고객지원센터</h3>
        <p>📞 1600-9922</p>
        <p>🕐 평일 09:00-18:00</p>
      </div>
      
      {/* 링크 */}
      <div>
        <h3>바로가기</h3>
        <ul>
          <li><Link to="/terms">이용약관</Link></li>
          <li><Link to="/privacy">개인정보처리방침</Link></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
```

## 🔐 인증 관련 컴포넌트

### LoginForm 컴포넌트
```typescript
interface LoginFormProps {
  onSubmit: (data: LoginData) => Promise<void>;
  loading?: boolean;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}
```

**구조**:
```jsx
<Card className="w-full max-w-md mx-auto">
  <div className="text-center mb-6">
    <h2 className="text-2xl font-bold">🎓 사이버 연수원</h2>
    <p className="text-gray-600">온라인으로 배우는 전문 교육</p>
  </div>
  
  <form onSubmit={handleSubmit}>
    <Input
      type="email"
      label="아이디(이메일)"
      value={email}
      onChange={setEmail}
      required
    />
    
    <Input
      type="password"
      label="비밀번호"
      value={password}
      onChange={setPassword}
      required
    />
    
    <Checkbox
      label="로그인 상태 유지"
      checked={rememberMe}
      onChange={setRememberMe}
    />
    
    <Button
      type="submit"
      variant="primary"
      size="lg"
      loading={loading}
      className="w-full"
    >
      로그인
    </Button>
    
    <div className="text-center mt-4">
      <Link to="/register">회원가입</Link>
      <span className="mx-2">|</span>
      <Link to="/find-password">ID/PW 찾기</Link>
    </div>
  </form>
</Card>
```

### RegisterForm 컴포넌트
```typescript
interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  loading?: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}
```

## 📚 학습 관련 컴포넌트

### CourseCard 컴포넌트
```typescript
interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    duration: number; // 시간 단위
    rating: number;
    studentCount: number;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    thumbnail?: string;
  };
  onEnroll?: (courseId: string) => void;
  enrolled?: boolean;
}
```

**구조**:
```jsx
<Card className="hover:shadow-lg transition-shadow">
  {/* 썸네일 */}
  <div className="aspect-video bg-gray-200 rounded-t-lg">
    {thumbnail ? (
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
    ) : (
      <div className="flex items-center justify-center h-full">
        <BookIcon className="w-12 h-12 text-gray-400" />
      </div>
    )}
  </div>
  
  {/* 내용 */}
  <div className="p-4">
    <div className="flex items-center gap-2 mb-2">
      <Badge variant={levelColor[level]}>{levelText[level]}</Badge>
      <span className="text-sm text-gray-500">{category}</span>
    </div>
    
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
    
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-gray-500">{duration}시간</span>
      <div className="flex items-center gap-1">
        <StarIcon className="w-4 h-4 text-yellow-400" />
        <span className="text-sm">{rating}</span>
      </div>
    </div>
    
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{studentCount}명 수강</span>
      <Button
        variant={enrolled ? "secondary" : "primary"}
        size="sm"
        onClick={() => onEnroll?.(id)}
        disabled={enrolled}
      >
        {enrolled ? "신청완료" : "신청하기"}
      </Button>
    </div>
  </div>
</Card>
```

### ProgressBar 컴포넌트
```typescript
interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red';
}
```

**구조**:
```jsx
<div className="w-full">
  {label && (
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{label}</span>
      {showPercentage && (
        <span className="text-sm text-gray-500">{value}%</span>
      )}
    </div>
  )}
  
  <div className={`bg-gray-200 rounded-full ${sizeClasses[size]}`}>
    <div
      className={`${colorClasses[color]} rounded-full transition-all duration-300 ${sizeClasses[size]}`}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
</div>
```

### VideoPlayer 컴포넌트
```typescript
interface VideoPlayerProps {
  src: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  initialTime?: number;
}
```

**기능**:
- HTML5 video 기반
- 커스텀 컨트롤 (재생/일시정지, 볼륨, 전체화면)
- 배속 조절 (0.5x, 1x, 1.5x, 2x)
- 진도율 추적 (30초마다 업데이트)
- 키보드 단축키 지원

## 📊 대시보드 컴포넌트

### StatsCard 컴포넌트
```typescript
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'purple';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}
```

**구조**:
```jsx
<Card className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      {trend && (
        <p className={`text-sm ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend.direction === 'up' ? '↗' : '↘'} {trend.value}%
        </p>
      )}
    </div>
    <div className={`p-3 rounded-full ${colorClasses[color]}`}>
      {icon}
    </div>
  </div>
</Card>
```

### LectureList 컴포넌트
```typescript
interface LectureListProps {
  lectures: Array<{
    id: string;
    title: string;
    progress: number;
    lastWatched?: Date;
    duration: number;
    completed: boolean;
  }>;
  onContinue: (lectureId: string) => void;
  title: string;
}
```

## 💬 지원 관련 컴포넌트

### NoticeCard 컴포넌트
```typescript
interface NoticeCardProps {
  notice: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    important: boolean;
    category: string;
  };
  compact?: boolean;
}
```

### FAQItem 컴포넌트
```typescript
interface FAQItemProps {
  faq: {
    id: string;
    question: string;
    answer: string;
    category: string;
    helpful: number;
  };
  expanded?: boolean;
  onToggle: () => void;
}
```

**구조** (아코디언):
```jsx
<div className="border border-gray-200 rounded-lg">
  <button
    className="w-full p-4 text-left flex justify-between items-center"
    onClick={onToggle}
  >
    <span className="font-medium">{question}</span>
    <ChevronDownIcon className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
  </button>
  
  {expanded && (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <p className="text-gray-700">{answer}</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-sm text-gray-500">도움이 되었나요?</span>
        <Button variant="ghost" size="sm">👍 도움됨</Button>
        <Button variant="ghost" size="sm">👎 도움안됨</Button>
      </div>
    </div>
  )}
</div>
```

## 📄 폼 관련 컴포넌트

### FormField 컴포넌트
```typescript
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

### SearchBar 컴포넌트
```typescript
interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}
```

### Filter 컴포넌트
```typescript
interface FilterProps {
  options: Array<{
    value: string;
    label: string;
    count?: number;
  }>;
  value: string;
  onChange: (value: string) => void;
  label: string;
}
```

## 🎨 UI 상태 컴포넌트

### LoadingSpinner 컴포넌트
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}
```

### EmptyState 컴포넌트
```typescript
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### ErrorBoundary 컴포넌트
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
}
```

## 📋 사용 가이드라인

### 컴포넌트 작성 규칙
1. **인터페이스 정의**: 모든 Props에 TypeScript 인터페이스 정의
2. **기본값 설정**: defaultProps 또는 ES6 기본 매개변수 사용
3. **접근성**: ARIA 속성 및 키보드 네비게이션 지원
4. **반응형**: 모바일 우선 반응형 디자인
5. **재사용성**: 특정 비즈니스 로직과 분리된 순수 컴포넌트

### 스타일링 규칙
1. **Tailwind CSS**: 유틸리티 클래스 우선 사용
2. **일관성**: 정의된 컬러/사이즈 시스템 준수
3. **상태 표시**: hover, focus, disabled 상태 명확히 구분
4. **애니메이션**: 자연스러운 전환 효과 (transition-all duration-200)

### 파일 구조
```
src/components/
├── common/          # 공통 컴포넌트 (Button, Input, Card 등)
├── ui/              # 기본 UI 컴포넌트
├── layout/          # 레이아웃 컴포넌트
├── auth/            # 인증 관련 컴포넌트
├── course/          # 강의 관련 컴포넌트
├── dashboard/       # 대시보드 컴포넌트
└── support/         # 지원 관련 컴포넌트
```

이 명세서를 참고하여 일관되고 재사용 가능한 컴포넌트를 작성해주세요.