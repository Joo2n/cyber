import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown'
  className?: string
}

/**
 * 테마 토글 컴포넌트
 * 라이트/다크/시스템 모드 간 전환
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'button', 
  className = '' 
}) => {
  const { theme, setTheme, isDarkMode } = useThemeStore()

  const themes = [
    { value: 'light', label: '라이트', icon: Sun },
    { value: 'dark', label: '다크', icon: Moon },
    { value: 'system', label: '시스템', icon: Monitor }
  ] as const

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-2 pr-8 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {themes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 ${className}`}>
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
            theme === value
              ? 'bg-white dark:bg-neutral-700 text-primary shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
          title={`${label} 모드로 전환`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}

/**
 * 간단한 토글 버튼 (라이트 ↔ 다크만)
 */
export const SimpleThemeToggle: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors ${className}`}
      title={`${isDarkMode ? '라이트' : '다크'} 모드로 전환`}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}

export default ThemeToggle
