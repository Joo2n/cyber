import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { BookOpen, Bell, Phone, Users, Award, Clock, BarChart3 } from 'lucide-react'
import StatsCard from '../components/ui/StatsCard'
import { mockNotices, mockCourses } from '../data/mockData'

const DashboardPage = () => {
  const { user } = useAuthStore()

  // Mock 통계 데이터
  const stats = {
    enrolledCourses: 3,
    completedCourses: 12,
    certificates: 5,
    totalHours: 156
  }

  // 최근 공지사항 (상위 3개)
  const recentNotices = mockNotices.slice(0, 3).map(notice => ({
    id: notice.id,
    title: notice.title,
    date: new Date(notice.createdAt).toLocaleDateString('ko-KR'),
    important: notice.important
  }))

  // 인기 과정 (상위 3개)
  const popularCourses = mockCourses
    .sort((a, b) => b.studentCount - a.studentCount)
    .slice(0, 3)
    .map(course => ({
      id: course.id,
      title: course.title,
      students: course.studentCount,
      rating: course.rating,
      category: course.category
    }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 환영 메시지 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            안녕하세요, {user?.name}님! 👋
          </h1>
          <p className="text-lg text-neutral-600">
            오늘도 새로운 학습을 시작해보세요.
          </p>
        </div>

        {/* 통계 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="수강 중인 강의"
            value={stats.enrolledCourses}
            icon={<BookOpen className="w-6 h-6" />}
            color="blue"
          />
          <StatsCard
            title="완료한 강의"
            value={stats.completedCourses}
            icon={<Award className="w-6 h-6" />}
            color="green"
          />
          <StatsCard
            title="보유 수료증"
            value={stats.certificates}
            icon={<Award className="w-6 h-6" />}
            color="purple"
          />
          <StatsCard
            title="총 학습 시간"
            value={`${stats.totalHours}시간`}
            icon={<Clock className="w-6 h-6" />}
            color="orange"
          />
        </div>

        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 빠른 액세스 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 빠른 액세스 버튼들 */}
            <div className="card">
              <div className="card-body">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">빠른 액세스</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    to="/classroom"
                    className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200"
                  >
                    <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-blue-900">나의 강의실</span>
                  </Link>
                  <Link
                    to="/courses"
                    className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200"
                  >
                    <Users className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-green-900">수강신청</span>
                  </Link>
                  <Link
                    to="/certificates"
                    className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200"
                  >
                    <Award className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-purple-900">수료증</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200"
                  >
                    <Phone className="w-8 h-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-orange-900">고객지원</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 인기 과정 */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-neutral-900">🔥 인기 과정</h2>
                  <Link
                    to="/courses"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    전체 보기 →
                  </Link>
                </div>
                <div className="space-y-3">
                  {popularCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900">{course.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-neutral-500">
                            <span>{course.category}</span>
                            <span>•</span>
                            <span>⭐ {course.rating}</span>
                            <span>•</span>
                            <span>{course.students.toLocaleString()}명</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="px-3 py-1 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                      >
                        보기
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 공지사항 및 지원 */}
          <div className="space-y-6">
            {/* 공지사항 */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center space-x-2 mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-neutral-900">공지사항</h2>
                </div>
                <div className="space-y-3">
                  {recentNotices.map(notice => (
                    <Link
                      key={notice.id}
                      to={`/notices/${notice.id}`}
                      className="block p-3 border border-neutral-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-all duration-200"
                    >
                      <div className="flex items-start space-x-2">
                        {notice.important && (
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-neutral-900 text-sm mb-1 line-clamp-2">
                            {notice.title}
                          </h3>
                          <p className="text-xs text-neutral-500">{notice.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    to="/notices"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    더 보기 →
                  </Link>
                </div>
              </div>
            </div>

            {/* 학습지원센터 */}
            <div className="card">
              <div className="card-body">
                <div className="flex items-center space-x-2 mb-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-neutral-900">학습지원센터</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-neutral-600">📞</span>
                    <div>
                      <span className="font-semibold text-primary">1600-9922</span>
                      <p className="text-neutral-500 text-xs">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-neutral-600">📧</span>
                    <div>
                      <span className="text-neutral-700">support@tomatopass.com</span>
                      <p className="text-neutral-500 text-xs">24시간 접수</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-neutral-600">💬</span>
                    <div>
                      <Link to="/help" className="text-primary hover:underline">
                        온라인 문의하기
                      </Link>
                      <p className="text-neutral-500 text-xs">실시간 답변</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 학습 팁 */}
            <div className="card bg-gradient-to-br from-blue-50 to-primary/5">
              <div className="card-body">
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-neutral-900">💡 학습 팁</h2>
                </div>
                <div className="text-sm text-neutral-700 space-y-2">
                  <p>• 매일 30분씩 꾸준히 학습하세요</p>
                  <p>• 복습을 통해 기억을 강화하세요</p>
                  <p>• 질문이 있으면 언제든 문의하세요</p>
                </div>
                <div className="mt-4">
                  <Link
                    to="/classroom"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
                  >
                    학습 시작하기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
