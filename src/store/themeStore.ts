import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  isDarkMode: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

/**
 * 테마 관리 스토어
 * 다크/라이트 모드 상태를 관리하고 시스템 설정을 감지
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isDarkMode: false,

      setTheme: (theme: Theme) => {
        set({ theme })
        
        // 실제 다크 모드 상태 계산
        let isDarkMode = false
        
        if (theme === 'dark') {
          isDarkMode = true
        } else if (theme === 'light') {
          isDarkMode = false
        } else if (theme === 'system') {
          isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        
        set({ isDarkMode })
        
        // DOM에 다크 모드 클래스 적용
        if (isDarkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      toggleTheme: () => {
        const { theme } = get()
        const newTheme = theme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      }
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state: any) => {
        // 페이지 로드 시 테마 적용
        if (state) {
          state.setTheme(state.theme)
        }
      }
    }
  )
)

// 시스템 테마 변경 감지
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const store = useThemeStore.getState()
    if (store.theme === 'system') {
      store.setTheme('system')
    }
  })
}
