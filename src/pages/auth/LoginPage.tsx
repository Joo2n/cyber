import { Link } from 'react-router-dom'
import { ArrowLeft, GraduationCap, Shield, Users, Award } from 'lucide-react'
import LoginForm from '../../components/common/LoginForm'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex min-h-screen">
        {/* 왼쪽: 브랜딩 섹션 */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-12">
            <div className="mb-8">
              <GraduationCap className="w-16 h-16 mb-6" />
              <h1 className="text-4xl font-bold mb-4">
                토마토패스<br />
                사이버 연수원
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                전문가와 함께하는<br />
                온라인 교육 플랫폼
              </p>
            </div>

            {/* 특징 리스트 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-200" />
                <span className="text-blue-100">안전한 학습 환경</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-200" />
                <span className="text-blue-100">전문 강사진</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-blue-200" />
                <span className="text-blue-100">수료증 발급</span>
              </div>
            </div>

            {/* 통계 */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-200">강의 과정</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-blue-200">수강생</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-blue-200">평균 평점</div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* 뒤로 가기 버튼 */}
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>메인으로 돌아가기</span>
              </Link>
            </div>

            {/* 모바일용 헤더 */}
            <div className="lg:hidden text-center mb-8">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900">토마토패스 사이버 연수원</h2>
              <p className="text-neutral-600 mt-2">온라인으로 배우는 전문 교육</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage