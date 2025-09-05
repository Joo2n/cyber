// React Router 및 상태 관리 라이브러리 import
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// 레이아웃 및 공통 컴포넌트 import
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'

// 커스텀 훅 import
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

// 페이지 컴포넌트들 import
import LandingPage from './pages/auth/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ClassroomPage from './pages/classroom/ClassroomPage'
import CoursesPage from './pages/courses/CoursesPage'
import NoticesPage from './pages/support/NoticesPage'
import HelpPage from './pages/support/HelpPage'
import CertificateListPage from './pages/certificates/CertificateListPage'
import CertificateDetailPage from './pages/certificates/CertificateDetailPage'

/**
 * 메인 App 컴포넌트
 * 전체 애플리케이션의 라우팅과 인증 상태에 따른 페이지 렌더링을 담당
 */
function App() {
  // 현재 사용자의 로그인 상태 확인
  const { isAuthenticated } = useAuthStore()
  
  // 전역 키보드 단축키 활성화 (예: Ctrl+L로 로그인 페이지 이동 등)
  useKeyboardShortcuts()

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Routes>
          {/* 비로그인 사용자용 랜딩 페이지 (헤더/푸터 없음) */}
          <Route path="/" element={isAuthenticated ? <DashboardPage /> : <LandingPage />} />
          
          {/* 로그인 사용자용 페이지들 (헤더/푸터 포함) */}
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="classroom/*" element={<ClassroomPage />} />
            <Route path="courses/*" element={<CoursesPage />} />
            <Route path="notices/*" element={<NoticesPage />} />
            <Route path="help/*" element={<HelpPage />} />
            <Route path="certificates" element={<CertificateListPage />} />
            <Route path="certificates/:id" element={<CertificateDetailPage />} />
            <Route path="certificates/:id/download" element={<CertificateDetailPage />} />
          </Route>
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App