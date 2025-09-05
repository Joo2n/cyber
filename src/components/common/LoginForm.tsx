import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const { login, isLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  // 에러 자동 삭제 (5초 후)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  // 성공 메시지 자동 삭제 (3초 후)
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    // 기존 에러 메시지 삭제
    clearError()
    clearErrors()
    
    const success = await login({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe
    })
    
    if (success) {
      setSuccessMessage('로그인되었습니다! 잠시 후 메인 페이지로 이동합니다.')
      
      // 1.5초 후 리다이렉트
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    }
    // 에러는 authStore에서 자동으로 처리됨
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">로그인</h2>
          <p className="text-neutral-600">계정에 로그인하여 학습을 시작하세요</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 이메일 입력 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              아이디(이메일)
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: '아이디를 입력해주세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식을 입력해주세요',
                },
                minLength: {
                  value: 4,
                  message: '아이디는 최소 4자 이상이어야 합니다',
                },
                maxLength: {
                  value: 50,
                  message: '아이디는 최대 50자까지 입력 가능합니다',
                }
              })}
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="아이디(이메일)을 입력하세요"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email.message}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자리 이상이어야 합니다',
                  },
                  maxLength: {
                    value: 20,
                    message: '비밀번호는 최대 20자까지 입력 가능합니다',
                  }
                })}
                className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
                placeholder="비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-neutral-500" />
                ) : (
                  <Eye className="w-4 h-4 text-neutral-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-error">{errors.password.message}</p>
            )}
          </div>

          {/* 로그인 상태 유지 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="rounded border-neutral-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-neutral-600">로그인 상태 유지</span>
            </label>
          </div>

          {/* 성공 메시지 */}
          {successMessage && (
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <p className="text-sm text-success">{successMessage}</p>
              </div>
            </div>
          )}

          {/* 에러 메시지 */}
          {(errors.root || error) && !successMessage && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors.root?.message || error}</p>
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>로그인 중...</span>
              </div>
            ) : (
              '로그인'
            )}
          </button>

          {/* 회원가입/ID찾기 링크 */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm">
              <Link to="/register" className="text-primary hover:underline font-medium">
                회원가입
              </Link>
              <span className="text-neutral-400">|</span>
              <Link to="/find-password" className="text-primary hover:underline font-medium">
                ID/PW 찾기
              </Link>
            </div>
          </div>
        </form>

        {/* 테스트 계정 안내 */}
        <div className="mt-6 p-3 bg-neutral-100 rounded-lg">
          <p className="text-xs text-neutral-600 text-center">
            <strong>테스트 계정:</strong><br />
            이메일: user@test.com / 비밀번호: 123456
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm