import { CourseProgress, Course, Certificate } from '../types'

// 수료 조건 정의
export interface CompletionRequirements {
  minProgressPercentage: number // 최소 진도율 (기본 80%)
  minQuizScore?: number // 최소 퀴즈 점수 (있는 경우)
  requiredAssignments?: string[] // 필수 과제 ID 목록
  minStudyHours?: number // 최소 학습 시간
}

// 기본 수료 조건
export const DEFAULT_COMPLETION_REQUIREMENTS: CompletionRequirements = {
  minProgressPercentage: 80,
  minQuizScore: 60,
  minStudyHours: undefined
}

// 수료 자격 확인
export const checkCompletionEligibility = (
  progress: CourseProgress,
  course: Course,
  requirements: CompletionRequirements = DEFAULT_COMPLETION_REQUIREMENTS
): {
  isEligible: boolean
  missingRequirements: string[]
  completionRate: number
} => {
  const missingRequirements: string[] = []
  
  // 진도율 확인
  if (progress.progressPercentage < requirements.minProgressPercentage) {
    missingRequirements.push(`진도율 ${requirements.minProgressPercentage}% 이상 필요 (현재: ${progress.progressPercentage}%)`)
  }
  
  // 모든 강의 완료 확인
  if (progress.completedLectures < progress.totalLectures) {
    missingRequirements.push(`모든 강의 수강 완료 필요 (${progress.completedLectures}/${progress.totalLectures})`)
  }
  
  // 퀴즈 점수 확인 (퀴즈가 있는 과정인 경우)
  if (course.hasQuiz && requirements.minQuizScore) {
    // Mock: 실제로는 퀴즈 점수를 받아와야 함
    // 현재는 진도율이 100%면 퀴즈도 통과했다고 가정
    if (progress.progressPercentage < 100) {
      missingRequirements.push(`퀴즈 ${requirements.minQuizScore}점 이상 필요`)
    }
  }
  
  return {
    isEligible: missingRequirements.length === 0,
    missingRequirements,
    completionRate: progress.progressPercentage
  }
}

// 수료증 번호 생성
export const generateCertificateNumber = (
  userId: string,
  courseId: string,
  issuedAt: Date
): string => {
  const year = issuedAt.getFullYear()
  const month = String(issuedAt.getMonth() + 1).padStart(2, '0')
  const userHash = userId.slice(-4).toUpperCase()
  const courseHash = courseId.slice(-4).toUpperCase()
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
  
  return `TOM-${year}${month}-${userHash}${courseHash}-${randomSuffix}`
}

// 수료증 발급 가능 여부 확인
export const canIssueCertificate = (
  course: Course,
  progress: CourseProgress
): boolean => {
  // 수료증 발급 가능한 과정인지 확인
  if (!course.hasCertificate) {
    return false
  }
  
  // 수료 조건 확인
  const eligibility = checkCompletionEligibility(progress, course)
  return eligibility.isEligible
}

// 학습 시간을 시간:분 형식으로 변환
export const formatStudyTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}시간 ${minutes}분`
  }
  return `${minutes}분`
}

// 수료증 상태별 색상 반환
export const getCertificateStatusColor = (status: Certificate['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700'
    case 'revoked':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-neutral-100 text-neutral-700'
  }
}

// 수료증 상태별 텍스트 반환
export const getCertificateStatusText = (status: Certificate['status']) => {
  switch (status) {
    case 'active':
      return '유효'
    case 'revoked':
      return '취소됨'
    default:
      return '알 수 없음'
  }
}

// 템플릿 타입별 설명
export const getTemplateTypeDescription = (type: Certificate['templateType']) => {
  switch (type) {
    case 'basic':
      return '기본형 수료증'
    case 'premium':
      return '프리미엄 수료증'
    case 'professional':
      return '전문가 수료증'
    default:
      return '일반 수료증'
  }
}