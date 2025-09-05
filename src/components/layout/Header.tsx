// React Router 및 상태 관리 import
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

// 하위 컴포넌트 import
import UserDropdown from './UserDropdown'
import { SimpleThemeToggle } from '../ui/ThemeToggle'

/**
 * 헤더 컴포넌트
 * 애플리케이션의 상단 내비게이션 바를 담당
 * - 로고 및 브랜드명
 * - 메인 네비게이션 메뉴
 * - 사용자 로그인/프로필 영역
 * - 다크모드 토글
 */
const Header = () => {
  // 현재 사용자의 로그인 상태 확인
  const { isAuthenticated } = useAuthStore()

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 로고 */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">🍅</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                토마토패스
              </span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">
                사이버연수원
              </span>
            </div>
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            {isAuthenticated && (
              <Link
                to="/classroom"
                className="text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-2"
              >
                나의 강의실
              </Link>
            )}
            <Link
              to="/courses"
              className="text-base font-medium text-neutral-600 hover:text-primary transition-colors duration-200 py-2"
            >
              수강신청
            </Link>
            {isAuthenticated && (
              <Link
                to="/certificates"
                className="text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 py-2"
              >
                수료증
              </Link>
            )}
            <Link
              to="/notices"
              className="text-base font-medium text-neutral-600 hover:text-primary transition-colors duration-200 py-2"
            >
              공지사항
            </Link>
            <Link
              to="/help"
              className="text-base font-medium text-neutral-600 hover:text-primary transition-colors duration-200 py-2"
            >
              도움말
            </Link>
          </nav>

          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            <SimpleThemeToggle />
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header