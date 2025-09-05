import LoginForm from '../../components/common/LoginForm'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-40 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-full"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* 로고 및 제목 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6">
              <span className="text-3xl">🍅</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              토마토패스
            </h1>
            <p className="text-blue-100 text-lg">
              사이버 연수원에 오신 것을 환영합니다 🎓
            </p>
          </div>

          {/* 로그인 폼 */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-10">
              {/* 토마토패스 로고 */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2">
                  <span className="text-3xl">🍅</span>
                  <span className="text-2xl font-bold text-primary">토마토패스</span>
                </div>
              </div>

              {/* 로그인 폼 컴포넌트 */}
              <LoginForm />

              {/* 하단 링크 */}
              <div className="text-center mt-6">
                <button className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                  처음 찾은 정보가기 →
                </button>
              </div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="text-center mt-8 text-blue-100 text-sm">
            <p>© 2024 토마토패스 사이버 연수원. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* 건물 실루엣 (하단) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-800 to-transparent"></div>
    </div>
  )
}

export default LandingPage
