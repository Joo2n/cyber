import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, Link } from 'react-router-dom'
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  X, 
  CheckCircle,
  Clock,
  Eye,
  Calendar
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { QnA } from '../../types'

interface QnAFormData {
  category: 'login' | 'course' | 'technical' | 'other'
  title: string
  content: string
  emailNotification: boolean
}

const QnAPage = () => {
  const { isAuthenticated, user } = useAuthStore()
  const [myQuestions, setMyQuestions] = useState<QnA[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'write' | 'mylist'>('write')
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<QnAFormData>({
    defaultValues: {
      category: 'course',
      title: '',
      content: '',
      emailNotification: true
    }
  })

  const selectedCategory = watch('category')

  // Mock 내 문의 내역 로드
  useEffect(() => {
    const loadMyQuestions = async () => {
      if (!isAuthenticated) return
      
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockQuestions: QnA[] = [
        {
          id: '1',
          userId: user?.id || '',
          title: '강의 동영상이 중간에 멈춰요',
          content: 'Python 기초 강의 3강을 듣는데 10분 정도 지나면 동영상이 멈춥니다. 새로고침하면 다시 재생되지만 계속 반복되네요.',
          category: 'technical',
          status: 'answered',
          answer: '안녕하세요. 문의해주신 문제는 브라우저 캐시 문제로 보입니다. Chrome 설정에서 캐시를 삭제하시고 다시 시도해보세요. 그래도 문제가 지속되면 다른 브라우저를 사용해보시기 바랍니다.',
          answeredBy: '기술지원팀',
          answeredAt: '2024-08-18T14:30:00Z',
          createdAt: '2024-08-17T10:15:00Z'
        },
        {
          id: '2',
          userId: user?.id || '',
          title: '수료증 발급 관련 문의',
          content: 'React 과정을 모두 완료했는데 수료증이 발급되지 않습니다. 진도율은 100%로 표시되고 모든 퀴즈도 완료했습니다.',
          category: 'course',
          status: 'pending',
          createdAt: '2024-08-19T09:00:00Z'
        }
      ]
      
      setMyQuestions(mockQuestions)
      setIsLoading(false)
    }

    loadMyQuestions()
  }, [isAuthenticated, user])

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
      
      if (file.size > maxSize) {
        alert(`${file.name}은(는) 파일 크기가 10MB를 초과합니다.`)
        return false
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name}은(는) 지원하지 않는 파일 형식입니다.`)
        return false
      }
      
      return true
    })
    
    if (selectedFiles.length + validFiles.length > 3) {
      alert('최대 3개의 파일만 첨부할 수 있습니다.')
      return
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles])
  }

  // 파일 제거 핸들러
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  // 폼 제출 핸들러
  const onSubmit = async (data: QnAFormData) => {
    setIsSubmitting(true)
    
    try {
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 새 문의 추가
      const newQuestion: QnA = {
        id: Date.now().toString(),
        userId: user?.id || '',
        title: data.title,
        content: data.content,
        category: data.category,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      setMyQuestions(prev => [newQuestion, ...prev])
      setSubmitSuccess(true)
      reset()
      setSelectedFiles([])
      
      // 성공 메시지 후 내 문의 목록으로 이동
      setTimeout(() => {
        setSubmitSuccess(false)
        setActiveTab('mylist')
      }, 2000)
      
    } catch (error) {
      alert('문의 등록 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 카테고리별 설명
  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'login':
        return '로그인, 회원가입, 비밀번호 관련 문의'
      case 'course':
        return '강의 수강, 진도율, 수료증 관련 문의'
      case 'technical':
        return '동영상 재생, 사이트 오류 등 기술 관련 문의'
      case 'other':
        return '기타 문의사항'
      default:
        return ''
    }
  }

  // 상태별 색상
  const getStatusColor = (status: QnA['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'answered':
        return 'bg-green-100 text-green-700'
      case 'closed':
        return 'bg-neutral-100 text-neutral-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getStatusText = (status: QnA['status']) => {
    switch (status) {
      case 'pending':
        return '답변 대기'
      case 'answered':
        return '답변 완료'
      case 'closed':
        return '해결 완료'
      default:
        return '알 수 없음'
    }
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Q&A 문의</h1>
        <p className="text-neutral-600">궁금한 점이나 문제가 있으시면 언제든 문의해주세요</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="card mb-8">
        <div className="border-b border-neutral-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('write')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'write'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              문의하기
            </button>
            <button
              onClick={() => setActiveTab('mylist')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'mylist'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Eye className="w-5 h-5 inline mr-2" />
              내 문의 내역 ({myQuestions.length})
            </button>
          </div>
        </div>

        <div className="card-body">
          {activeTab === 'write' ? (
            // 문의 작성 폼
            <div>
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">문의가 성공적으로 등록되었습니다!</p>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    담당자가 확인 후 24시간 이내에 답변드리겠습니다.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 문의 유형 */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    문의 유형 *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { value: 'login', label: '로그인 문의' },
                      { value: 'course', label: '강의 문의' },
                      { value: 'technical', label: '기술 문의' },
                      { value: 'other', label: '기타 문의' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedCategory === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register('category', { required: '문의 유형을 선택해주세요' })}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-neutral-900">{option.label}</p>
                          <p className="text-sm text-neutral-500">
                            {getCategoryDescription(option.value)}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-error">{errors.category.message}</p>
                  )}
                </div>

                {/* 제목 */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register('title', {
                      required: '제목을 입력해주세요',
                      maxLength: {
                        value: 100,
                        message: '제목은 100자 이내로 입력해주세요'
                      }
                    })}
                    className={`input ${errors.title ? 'input-error' : ''}`}
                    placeholder="문의 제목을 입력하세요"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-error">{errors.title.message}</p>
                  )}
                </div>

                {/* 내용 */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    id="content"
                    rows={8}
                    {...register('content', {
                      required: '문의 내용을 입력해주세요',
                      minLength: {
                        value: 10,
                        message: '문의 내용을 10자 이상 입력해주세요'
                      },
                      maxLength: {
                        value: 2000,
                        message: '문의 내용은 2000자 이내로 입력해주세요'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none ${
                      errors.content ? 'border-error' : 'border-neutral-300'
                    }`}
                    placeholder="문의 내용을 자세히 설명해주세요. 오류가 발생한 상황, 사용 중인 브라우저, 운영체제 등의 정보를 함께 알려주시면 더 정확한 답변을 받으실 수 있습니다."
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-error">{errors.content.message}</p>
                  )}
                </div>

                {/* 파일 첨부 */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    파일 첨부 (선택)
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-sm">파일 선택</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf,.txt"
                          onChange={handleFileSelect}
                          className="sr-only"
                        />
                      </label>
                      <p className="text-xs text-neutral-500">
                        이미지, PDF, 텍스트 파일만 가능 (최대 3개, 각 10MB 이하)
                      </p>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Paperclip className="w-4 h-4 text-neutral-500" />
                              <span className="text-sm text-neutral-900">{file.name}</span>
                              <span className="text-xs text-neutral-500">
                                ({(file.size / 1024 / 1024).toFixed(1)}MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-neutral-500 hover:text-error transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 이메일 알림 */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="emailNotification"
                    {...register('emailNotification')}
                    className="rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="emailNotification" className="text-sm text-neutral-700">
                    답변 등록 시 이메일로 알림 받기
                  </label>
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>등록 중...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>문의 등록</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // 내 문의 목록
            <div>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                  <p className="text-neutral-600">문의 내역을 불러오는 중...</p>
                </div>
              ) : myQuestions.length === 0 ? (
                <div className="text-center py-16">
                  <MessageCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">등록된 문의가 없습니다</h3>
                  <p className="text-neutral-600 mb-4">궁금한 점이 있으시면 언제든 문의해주세요</p>
                  <button
                    onClick={() => setActiveTab('write')}
                    className="btn btn-primary"
                  >
                    문의하기
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {myQuestions.map((question) => (
                    <div key={question.id} className="border border-neutral-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                              {getStatusText(question.status)}
                            </span>
                            <span className="text-xs text-neutral-500">
                              {question.category === 'login' ? '로그인 문의' :
                               question.category === 'course' ? '강의 문의' :
                               question.category === 'technical' ? '기술 문의' : '기타 문의'}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-neutral-900">{question.title}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-neutral-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(question.createdAt)}</span>
                        </div>
                      </div>

                      <p className="text-neutral-700 mb-4 whitespace-pre-wrap">{question.content}</p>

                      {question.status === 'answered' && question.answer && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              {question.answeredBy} • {question.answeredAt ? formatDate(question.answeredAt) : ''}
                            </span>
                          </div>
                          <p className="text-green-800 whitespace-pre-wrap">{question.answer}</p>
                        </div>
                      )}

                      {question.status === 'pending' && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-800">
                              담당자가 검토 중입니다. 24시간 이내에 답변드리겠습니다.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 추가 도움말 */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">다른 도움이 필요하신가요?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/help/faq"
              className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">FAQ 확인하기</p>
                <p className="text-sm text-neutral-500">자주 묻는 질문을 먼저 확인해보세요</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">전화 상담</p>
                <p className="text-sm text-neutral-500">1600-9922 (평일 09:00-18:00)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QnAPage