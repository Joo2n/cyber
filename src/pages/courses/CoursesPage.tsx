import { Routes, Route } from 'react-router-dom'
import CourseListPage from './CourseListPage'
import CourseDetailPage from './CourseDetailPage'

const CoursesPage = () => {
  return (
    <Routes>
      <Route index element={<CourseListPage />} />
      <Route path=":id" element={<CourseDetailPage />} />
    </Routes>
  )
}

export default CoursesPage