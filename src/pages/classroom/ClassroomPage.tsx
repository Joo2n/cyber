import { Routes, Route } from 'react-router-dom'
import ClassroomDashboard from './ClassroomDashboard'
import LecturePlayPage from './LecturePlayPage'
import QnAPage from './QnAPage'
import OrderTrackingPage from './OrderTrackingPage'

/**
 * 나의 강의실 페이지 컴포넌트
 * 강의실 관련 모든 서브 페이지들을 관리하는 라우터 컴포넌트
 */
const ClassroomPage = () => {
  return (
    <Routes>
      {/* 강의실 대시보드 (메인) */}
      <Route index element={<ClassroomDashboard />} />
      
      {/* 강의 재생 페이지 */}
      <Route path="course/:courseId/lecture/:lectureId" element={<LecturePlayPage />} />
      
      {/* 질문과 답변 페이지 */}
      <Route path="qna" element={<QnAPage />} />
      
      {/* 주문배송조회 페이지 */}
      <Route path="orders" element={<OrderTrackingPage />} />
    </Routes>
  )
}

export default ClassroomPage