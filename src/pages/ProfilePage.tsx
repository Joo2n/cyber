import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, Calendar, Edit2, Save, X, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

interface ProfileFormData {
  name: string
  email: string
  phone: string
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // 프로필 수정 폼
  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  })

  // 비밀번호 변경 폼
  const passwordForm = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const handleProfileSubmit = async (data: ProfileFormData) => {
    const success = await updateProfile(data)
    if (success) {
      setIsEditing(false)
      // 성공 메시지 표시 (실제로는 toast 등 사용)
      alert('프로필이 성공적으로 업데이트되었습니다.')
    }
  }

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError('confirmPassword', {
        message: '새 비밀번호가 일치하지 않습니다.'
      })
      return
    }

    // Mock 비밀번호 변경 로직
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsChangingPassword(false)
    passwordForm.reset()
    alert('비밀번호가 성공적으로 변경되었습니다.')
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    profileForm.reset({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    })
  }

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false)
    passwordForm.reset()
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">로그인이 필요합니다</h2>
          <p className="text-neutral-600">프로필 페이지에 접근하려면 로그인해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">마이페이지</h1>
          <p className="text-neutral-600">프로필 정보를 관리하고 계정 설정을 변경할 수 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 사용자 프로필 카드 */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-1">{user.name}</h2>
                <p className="text-neutral-600 mb-2">{user.email}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {user.role === 'admin' ? '관리자' : '일반 사용자'}
                </div>

                {/* 가입일 정보 */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-center justify-center text-sm text-neutral-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    가입일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                  {user.lastLoginAt && (
                    <div className="flex items-center justify-center text-sm text-neutral-500 mt-2">
                      마지막 로그인: {new Date(user.lastLoginAt).toLocaleDateString('ko-KR')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 프로필 정보 및 설정 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 기본 정보 */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-neutral-900">기본 정보</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>수정</span>
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        이름
                      </label>
                      <input
                        {...profileForm.register('name', { required: '이름을 입력해주세요' })}
                        className="input"
                        placeholder="이름을 입력하세요"
                      />
                      {profileForm.formState.errors.name && (
                        <p className="mt-1 text-sm text-error">{profileForm.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        이메일
                      </label>
                      <input
                        {...profileForm.register('email', {
                          required: '이메일을 입력해주세요',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '올바른 이메일 형식을 입력해주세요'
                          }
                        })}
                        className="input"
                        placeholder="이메일을 입력하세요"
                      />
                      {profileForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-error">{profileForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        전화번호
                      </label>
                      <input
                        {...profileForm.register('phone')}
                        className="input"
                        placeholder="전화번호를 입력하세요 (선택사항)"
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                      >
                        <Save className="w-4 h-4" />
                        <span>저장</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                        <span>취소</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-neutral-500" />
                      <div>
                        <p className="text-sm text-neutral-500">이름</p>
                        <p className="font-medium text-neutral-900">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-neutral-500" />
                      <div>
                        <p className="text-sm text-neutral-500">이메일</p>
                        <p className="font-medium text-neutral-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-neutral-500" />
                      <div>
                        <p className="text-sm text-neutral-500">전화번호</p>
                        <p className="font-medium text-neutral-900">{user.phone || '등록되지 않음'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 비밀번호 변경 */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-neutral-900">비밀번호 변경</h3>
                  {!isChangingPassword && (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>변경</span>
                    </button>
                  )}
                </div>

                {isChangingPassword ? (
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        현재 비밀번호
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          {...passwordForm.register('currentPassword', { required: '현재 비밀번호를 입력해주세요' })}
                          className="input pr-10"
                          placeholder="현재 비밀번호를 입력하세요"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('current')}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="w-4 h-4 text-neutral-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-neutral-500" />
                          )}
                        </button>
                      </div>
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="mt-1 text-sm text-error">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        새 비밀번호
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          {...passwordForm.register('newPassword', {
                            required: '새 비밀번호를 입력해주세요',
                            minLength: {
                              value: 6,
                              message: '비밀번호는 최소 6자리 이상이어야 합니다'
                            }
                          })}
                          className="input pr-10"
                          placeholder="새 비밀번호를 입력하세요"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="w-4 h-4 text-neutral-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-neutral-500" />
                          )}
                        </button>
                      </div>
                      {passwordForm.formState.errors.newPassword && (
                        <p className="mt-1 text-sm text-error">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        새 비밀번호 확인
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          {...passwordForm.register('confirmPassword', { required: '새 비밀번호를 다시 입력해주세요' })}
                          className="input pr-10"
                          placeholder="새 비밀번호를 다시 입력하세요"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="w-4 h-4 text-neutral-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-neutral-500" />
                          )}
                        </button>
                      </div>
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="mt-1 text-sm text-error">{passwordForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                      >
                        <Save className="w-4 h-4" />
                        <span>변경</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPasswordChange}
                        className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                        <span>취소</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-neutral-600">
                    <p>보안을 위해 정기적으로 비밀번호를 변경하는 것을 권장합니다.</p>
                    <p className="text-sm mt-2">마지막 변경: 2024년 8월 1일</p>
                  </div>
                )}
              </div>
            </div>

            {/* 계정 통계 */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-bold text-neutral-900 mb-6">계정 통계</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">3</p>
                    <p className="text-sm text-neutral-600">수강 중인 강의</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">12</p>
                    <p className="text-sm text-neutral-600">완료한 강의</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">5</p>
                    <p className="text-sm text-neutral-600">보유 수료증</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">156</p>
                    <p className="text-sm text-neutral-600">총 학습 시간</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
