import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const handleMenuClick = () => {
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 드롭다운 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-lg transition-all duration-200"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:block">{user.name}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
          {/* 사용자 정보 헤더 */}
          <div className="px-4 py-3 border-b border-neutral-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* 메뉴 항목들 */}
          <div className="py-1">
            <Link
              to="/profile"
              onClick={handleMenuClick}
              className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors duration-200"
            >
              <User className="w-4 h-4 mr-3" />
              마이페이지
            </Link>
            
            <Link
              to="/settings"
              onClick={handleMenuClick}
              className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors duration-200"
            >
              <Settings className="w-4 h-4 mr-3" />
              설정
            </Link>
          </div>

          {/* 구분선 */}
          <div className="border-t border-neutral-100 my-1"></div>

          {/* 로그아웃 */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-3" />
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
