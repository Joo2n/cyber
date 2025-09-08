import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, LoginCredentials, RegisterData } from '../types'

interface AuthState {
  // 상태
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error: string | null
  
  // 액션
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  register: (userData: RegisterData) => Promise<boolean>
  clearError: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  checkAuthStatus: () => void
}

// Mock 사용자 데이터
const mockUsers = [
  {
    id: '1',
    name: '홍길동',
    email: 'user@test.com',
    password: '123456',
    phone: '010-1234-5678',
    role: 'student' as const,
    createdAt: '2024-01-15T00:00:00Z',
    lastLoginAt: '2024-08-19T10:00:00Z',
  },
  {
    id: '2',
    name: '김철수',
    email: 'kim@test.com',
    password: 'password',
    phone: '010-9876-5432',
    role: 'student' as const,
    createdAt: '2024-02-20T00:00:00Z',
    lastLoginAt: '2024-08-18T15:30:00Z',
  },
  {
    id: '3',
    name: '관리자',
    email: 'admin@tomatopass.com',
    password: 'admin123',
    phone: '010-0000-0000',
    role: 'admin' as const,
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-08-19T09:00:00Z',
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,

      // 로그인
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        
        try {
          // 입력값 검증
          if (!credentials.email || !credentials.password) {
            throw new Error('이메일과 비밀번호를 입력해주세요')
          }

          // Mock API 호출 시뮬레이션 (1초 대기)
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock 로그인 로직
          const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password)
          
          if (user) {
            const { password, ...userWithoutPassword } = user
            const updatedUser = {
              ...userWithoutPassword,
              lastLoginAt: new Date().toISOString()
            }

            set({
              isAuthenticated: true,
              user: updatedUser,
              isLoading: false,
              error: null
            })

            // 자동 로그인 설정 처리
            if (credentials.rememberMe) {
              localStorage.setItem('rememberMe', 'true')
            }
            
            return true
          } else {
            throw new Error('아이디 또는 비밀번호가 일치하지 않습니다')
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다'
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null
          })
          return false
        }
      },

      // 로그아웃
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          error: null
        })
        localStorage.removeItem('rememberMe')
      },

      // 회원가입
      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null })
        
        try {
          // 입력값 검증
          if (!userData.name || !userData.email || !userData.password) {
            throw new Error('필수 항목을 모두 입력해주세요')
          }

          if (userData.password !== userData.confirmPassword) {
            throw new Error('비밀번호가 일치하지 않습니다')
          }

          if (!userData.agreeTerms || !userData.agreePrivacy) {
            throw new Error('이용약관과 개인정보처리방침에 동의해주세요')
          }

          // 이메일 중복 확인
          const existingUser = mockUsers.find(u => u.email === userData.email)
          if (existingUser) {
            throw new Error('이미 가입된 이메일입니다')
          }

          // Mock API 호출 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          // 새 사용자 생성
          const newUser: User = {
            id: String(mockUsers.length + 1),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: 'student',
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          }
          
          // Mock 데이터에 추가
          mockUsers.push({ 
            ...newUser, 
            password: userData.password, 
            phone: userData.phone || '',
            role: newUser.role as any,
            createdAt: newUser.createdAt as string,
            lastLoginAt: newUser.lastLoginAt as string
          })
          
          set({
            isAuthenticated: true,
            user: newUser,
            isLoading: false,
            error: null
          })
          
          return true
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다'
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null
          })
          return false
        }
      },

      // 에러 초기화
      clearError: () => {
        set({ error: null })
      },

      // 프로필 업데이트
      updateProfile: async (updates: Partial<User>) => {
        const { user } = get()
        if (!user) return false

        set({ isLoading: true, error: null })
        
        try {
          // Mock API 호출 시뮬레이션
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const updatedUser = { ...user, ...updates }
          
          set({
            user: updatedUser,
            isLoading: false,
            error: null
          })
          
          return true
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '프로필 업데이트 중 오류가 발생했습니다'
          set({ 
            isLoading: false, 
            error: errorMessage
          })
          return false
        }
      },

      // 인증 상태 확인
      checkAuthStatus: () => {
        const { user, isAuthenticated } = get()
        
        // 저장된 토큰이나 세션 확인 로직
        if (isAuthenticated && user) {
          // 세션 유효성 검증 (실제로는 서버에 확인)
          const sessionValid = localStorage.getItem('rememberMe') === 'true'
          
          if (!sessionValid) {
            set({
              isAuthenticated: false,
              user: null,
              error: null
            })
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        // isLoading과 error는 저장하지 않음
      }),
    }
  )
)