import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, CheckCircle, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { RegisterData } from '../../types'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()
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
    watch,
    clearErrors,
  } = useForm<RegisterData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
  })

  const password = watch('password')

  const onSubmit = async (data: RegisterData) => {
    // 기존 에러 메시지 삭제
    clearError()
    clearErrors()
    
    const success = await registerUser(data)
    
    if (success) {
      setSuccessMessage('회원가입이 완료되었습니다! 잠시 후 나의 강의실로 이동합니다.')
      
      // 2초 후 리다이렉트
      setTimeout(() => {
        navigate('/classroom')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로 가기 버튼 */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>

        <div className="card shadow-medium">
          <div className="card-body">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">회원가입</h1>
              <p className="text-neutral-600">토마토패스 사이버연수원에 오신 것을 환영합니다</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 이름 입력 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: '이름을 입력해주세요',
                    minLength: {
                      value: 2,
                      message: '이름은 최소 2자 이상이어야 합니다',
                    },
                    maxLength: {
                      value: 10,
                      message: '이름은 최대 10자까지 입력 가능합니다',
                    },
                    pattern: {
                      value: /^[가-힣a-zA-Z\s]+$/,
                      message: '이름은 한글, 영문만 입력 가능합니다',
                    }
                  })}
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  placeholder="이름을 입력하세요"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                )}
              </div>

              {/* 이메일 입력 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '올바른 이메일 형식을 입력해주세요',
                    },
                  })}
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  placeholder="이메일을 입력하세요"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                )}
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  비밀번호 *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', {
                      required: '비밀번호를 입력해주세요',
                      minLength: {
                        value: 8,
                        message: '비밀번호는 최소 8자리 이상이어야 합니다',
                      },
                      maxLength: {
                        value: 20,
                        message: '비밀번호는 최대 20자까지 입력 가능합니다',
                      },
                      pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                        message: '비밀번호는 영문과 숫자를 포함해야 합니다',
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
                <p className="mt-1 text-xs text-neutral-500">
                  8-20자, 영문과 숫자를 포함해주세요
                </p>
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  비밀번호 확인 *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    {...register('confirmPassword', {
                      required: '비밀번호 확인을 입력해주세요',
                      validate: (value) => 
                        value === password || '비밀번호가 일치하지 않습니다'
                    })}
                    className={`input pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* 전화번호 입력 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: '전화번호를 입력해주세요',
                    pattern: {
                      value: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/,
                      message: '올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)',
                    }
                  })}
                  className={`input ${errors.phone ? 'input-error' : ''}`}
                  placeholder="010-1234-5678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
                )}
              </div>

              {/* 약관 동의 */}
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    {...register('agreeTerms', {
                      required: '이용약관에 동의해주세요'
                    })}
                    className="mt-1 rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <label htmlFor="agreeTerms" className="text-sm text-neutral-700">
                      <span className="text-error">*</span> 이용약관에 동의합니다
                      <Link to="/terms" className="text-primary hover:underline ml-2">
                        [약관 보기]
                      </Link>
                    </label>
                    {errors.agreeTerms && (
                      <p className="mt-1 text-sm text-error">{errors.agreeTerms.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreePrivacy"
                    {...register('agreePrivacy', {
                      required: '개인정보처리방침에 동의해주세요'
                    })}
                    className="mt-1 rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <label htmlFor="agreePrivacy" className="text-sm text-neutral-700">
                      <span className="text-error">*</span> 개인정보처리방침에 동의합니다
                      <Link to="/privacy" className="text-primary hover:underline ml-2">
                        [방침 보기]
                      </Link>
                    </label>
                    {errors.agreePrivacy && (
                      <p className="mt-1 text-sm text-error">{errors.agreePrivacy.message}</p>
                    )}
                  </div>
                </div>
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
              {error && !successMessage && (
                <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                disabled={isLoading || !!successMessage}
                className="w-full h-12 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>가입 처리 중...</span>
                  </div>
                ) : (
                  '회원가입'
                )}
              </button>

              {/* 로그인 링크 */}
              <div className="text-center pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">
                  이미 계정이 있으신가요?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    로그인하기
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage