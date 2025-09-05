const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">🍅</span>
              </div>
              <span className="text-lg font-semibold text-white">토마토패스</span>
            </div>
            <p className="text-sm text-neutral-400 mb-4">
              최고 품질의 온라인 교육 서비스를 제공하는 사이버연수원입니다.
              <br />
              언제 어디서나 편리하게 학습하세요.
            </p>
            <div className="text-sm text-neutral-500">
              <p>사업자등록번호: 123-45-67890</p>
              <p>대표자: 홍길동</p>
              <p>주소: 서울시 강남구 테헤란로 123</p>
            </div>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h3 className="text-white font-medium mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/courses" className="hover:text-white transition-colors">
                  수강신청
                </a>
              </li>
              <li>
                <a href="/notices" className="hover:text-white transition-colors">
                  공지사항
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-white transition-colors">
                  도움말
                </a>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h3 className="text-white font-medium mb-4">고객지원</h3>
            <div className="text-sm space-y-2">
              <p>📞 1600-9922</p>
              <p>🕐 평일 09:00 - 18:00</p>
              <p>📧 support@tomatopass.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
          <p className="text-sm text-neutral-500">
            © 2024 토마토패스. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer