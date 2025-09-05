import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAccessibility } from '../../hooks/useAccessibility'

const Layout = () => {
  // 접근성 기능 활성화
  useAccessibility({
    skipToMain: true,
    focusManagement: true,
    announcements: true
  })

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      <Header />
      <main 
        id="main-content" 
        className="flex-1 focus:outline-none" 
        tabIndex={-1}
        role="main"
        aria-label="주요 콘텐츠"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout