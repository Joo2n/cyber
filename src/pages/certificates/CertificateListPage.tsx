import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { 
  Award, 
  Calendar, 
  Download, 
  Eye, 
  FileText, 
  CheckCircle,
  Clock,
  AlertCircle,
  Search
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { Certificate, Course, CourseProgress } from '../../types'
import { 
  checkCompletionEligibility, 
  canIssueCertificate, 
  formatStudyTime,
  getCertificateStatusColor,
  getCertificateStatusText,
  getTemplateTypeDescription
} from '../../utils/certificateUtils'

const CertificateListPage = () => {
  const { isAuthenticated, user } = useAuthStore()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [eligibleCourses, setEligibleCourses] = useState<(Course & { progress: CourseProgress })[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'issued' | 'eligible'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCertificates = async () => {
      if (!isAuthenticated || !user) return
      
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock 발급된 수료증 데이터
      const mockCertificates: Certificate[] = [
        {
          id: '1',
          userId: user.id,
          courseId: 'course-1',
          courseName: 'JavaScript 기초 완성 과정',
          userName: user.name,
          instructorName: '김자바',
          certificateNumber: 'TOM-202408-A1B2C3D4-XY9Z',
          issuedAt: '2024-07-15T10:00:00Z',
          completionDate: '2024-07-14T16:30:00Z',
          totalHours: 20,
          templateType: 'basic',
          status: 'active'
        },
        {
          id: '2',
          userId: user.id,
          courseId: 'course-2',
          courseName: 'React 심화 과정',
          userName: user.name,
          instructorName: '박리액트',
          certificateNumber: 'TOM-202408-E5F6G7H8-AB1C',
          issuedAt: '2024-08-10T14:00:00Z',
          completionDate: '2024-08-09T18:45:00Z',
          totalHours: 30,
          templateType: 'premium',
          status: 'active'
        },
        {
          id: '3',
          userId: user.id,
          courseId: 'course-5',
          courseName: 'Node.js 백엔드 개발 마스터',
          userName: user.name,
          instructorName: '최노드',
          certificateNumber: 'TOM-202407-J9K8L7M6-DE2F',
          issuedAt: '2024-07-05T16:20:00Z',
          completionDate: '2024-07-04T14:15:00Z',
          totalHours: 35,
          templateType: 'professional',
          status: 'active'
        },
        {
          id: '4',
          userId: user.id,
          courseId: 'course-6',
          courseName: '디지털 마케팅 전략 수립',
          userName: user.name,
          instructorName: '이마케팅',
          certificateNumber: 'TOM-202406-P1Q2R3S4-GH5I',
          issuedAt: '2024-06-20T11:30:00Z',
          completionDate: '2024-06-19T17:00:00Z',
          totalHours: 28,
          templateType: 'basic',
          status: 'active'
        },
        {
          id: '5',
          userId: user.id,
          courseId: 'course-7',
          courseName: 'UI/UX 디자인 실무',
          userName: user.name,
          instructorName: '박디자인',
          certificateNumber: 'TOM-202406-T6U7V8W9-JK3L',
          issuedAt: '2024-06-01T13:45:00Z',
          completionDate: '2024-05-31T16:30:00Z',
          totalHours: 32,
          templateType: 'premium',
          status: 'active'
        },
        {
          id: '6',
          userId: user.id,
          courseId: 'course-8',
          courseName: 'AWS 클라우드 아키텍처',
          userName: user.name,
          instructorName: '김클라우드',
          certificateNumber: 'TOM-202405-X2Y3Z4A5-MN6O',
          issuedAt: '2024-05-15T09:00:00Z',
          completionDate: '2024-05-14T18:20:00Z',
          totalHours: 40,
          templateType: 'professional',
          status: 'active'
        },
        {
          id: '7',
          userId: user.id,
          courseId: 'course-9',
          courseName: '비즈니스 영어 회화 마스터',
          userName: user.name,
          instructorName: 'Sarah Johnson',
          certificateNumber: 'TOM-202405-B7C8D9E0-PQ4R',
          issuedAt: '2024-05-01T15:10:00Z',
          completionDate: '2024-04-30T14:45:00Z',
          totalHours: 24,
          templateType: 'basic',
          status: 'active'
        },
        {
          id: '8',
          userId: user.id,
          courseId: 'course-10',
          courseName: 'MongoDB 데이터베이스 관리',
          userName: user.name,
          instructorName: '정몽고',
          certificateNumber: 'TOM-202404-F1G2H3I4-ST7U',
          issuedAt: '2024-04-10T12:00:00Z',
          completionDate: '2024-04-09T19:30:00Z',
          totalHours: 22,
          templateType: 'premium',
          status: 'active'
        }
      ]

      // Mock 수료 가능한 과정 데이터
      const mockEligibleCourses = [
        {
          id: 'course-3',
          title: 'Python 데이터 분석',
          description: 'Python을 활용한 데이터 분석 기초',
          category: 'IT',
          level: 'intermediate' as const,
          duration: 25,
          rating: 4.7,
          studentCount: 1234,
          instructor: '이파이썬',
          price: 150000,
          tags: ['Python', '데이터분석'],
          lectureCount: 15,
          isPopular: true,
          hasQuiz: true,
          hasCertificate: true,
          createdAt: '2024-06-01T00:00:00Z',
          updatedAt: '2024-08-01T00:00:00Z',
          progress: {
            courseId: 'course-3',
            userId: user.id,
            enrolledAt: '2024-07-01T00:00:00Z',
            totalLectures: 15,
            completedLectures: 15,
            totalDuration: 90000, // 25시간
            watchedDuration: 90000,
            progressPercentage: 100,
            lastAccessedAt: '2024-08-18T00:00:00Z',
            isCompleted: true,
            completedAt: '2024-08-18T00:00:00Z'
          }
        },
        {
          id: 'course-11',
          title: '스프링부트 웹 개발',
          description: '스프링부트를 이용한 실무 웹 애플리케이션 개발',
          category: 'IT',
          level: 'advanced' as const,
          duration: 45,
          rating: 4.8,
          studentCount: 890,
          instructor: '김스프링',
          price: 220000,
          tags: ['Java', 'Spring', '백엔드'],
          lectureCount: 28,
          isPopular: true,
          hasQuiz: true,
          hasCertificate: true,
          createdAt: '2024-07-15T00:00:00Z',
          updatedAt: '2024-08-20T00:00:00Z',
          progress: {
            courseId: 'course-11',
            userId: user.id,
            enrolledAt: '2024-08-01T00:00:00Z',
            totalLectures: 28,
            completedLectures: 28,
            totalDuration: 162000, // 45시간
            watchedDuration: 162000,
            progressPercentage: 100,
            lastAccessedAt: '2024-08-25T00:00:00Z',
            isCompleted: true,
            completedAt: '2024-08-25T00:00:00Z'
          }
        },
        {
          id: 'course-12',
          title: 'Flutter 모바일 앱 개발',
          description: 'Flutter로 크로스플랫폼 모바일 앱 개발하기',
          category: 'IT',
          level: 'intermediate' as const,
          duration: 35,
          rating: 4.6,
          studentCount: 567,
          instructor: '박플러터',
          price: 180000,
          tags: ['Flutter', 'Dart', '모바일'],
          lectureCount: 22,
          isPopular: false,
          hasQuiz: true,
          hasCertificate: true,
          createdAt: '2024-07-20T00:00:00Z',
          updatedAt: '2024-08-15T00:00:00Z',
          progress: {
            courseId: 'course-12',
            userId: user.id,
            enrolledAt: '2024-08-05T00:00:00Z',
            totalLectures: 22,
            completedLectures: 22,
            totalDuration: 126000, // 35시간
            watchedDuration: 126000,
            progressPercentage: 100,
            lastAccessedAt: '2024-08-30T00:00:00Z',
            isCompleted: true,
            completedAt: '2024-08-30T00:00:00Z'
          }
        },
        {
          id: 'course-13',
          title: '프로젝트 관리 PMP 자격증',
          description: 'PMP 자격증 취득을 위한 체계적인 프로젝트 관리 학습',
          category: '자격증',
          level: 'advanced' as const,
          duration: 50,
          rating: 4.9,
          studentCount: 423,
          instructor: '이피엠피',
          price: 280000,
          tags: ['PMP', '프로젝트관리', '자격증'],
          lectureCount: 35,
          isPopular: true,
          hasQuiz: true,
          hasCertificate: true,
          createdAt: '2024-08-01T00:00:00Z',
          updatedAt: '2024-08-25T00:00:00Z',
          progress: {
            courseId: 'course-13',
            userId: user.id,
            enrolledAt: '2024-08-10T00:00:00Z',
            totalLectures: 35,
            completedLectures: 35,
            totalDuration: 180000, // 50시간
            watchedDuration: 180000,
            progressPercentage: 100,
            lastAccessedAt: '2024-09-02T00:00:00Z',
            isCompleted: true,
            completedAt: '2024-09-02T00:00:00Z'
          }
        }
      ]
      
      setCertificates(mockCertificates)
      setEligibleCourses(mockEligibleCourses)
      setIsLoading(false)
    }

    loadCertificates()
  }, [isAuthenticated, user])

  // 수료증 발급 처리
  const handleIssueCertificate = async (course: Course, progress: CourseProgress) => {
    if (!user) return

    try {
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newCertificate: Certificate = {
        id: Date.now().toString(),
        userId: user.id,
        courseId: course.id,
        courseName: course.title,
        userName: user.name,
        instructorName: course.instructor,
        certificateNumber: `TOM-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        issuedAt: new Date().toISOString(),
        completionDate: progress.completedAt || new Date().toISOString(),
        totalHours: course.duration,
        templateType: 'basic',
        status: 'active'
      }
      
      setCertificates(prev => [newCertificate, ...prev])
      setEligibleCourses(prev => prev.filter(c => c.id !== course.id))
      
      alert('수료증이 성공적으로 발급되었습니다!')
    } catch (error) {
      alert('수료증 발급 중 오류가 발생했습니다.')
    }
  }

  // 필터링된 데이터
  const filteredData = () => {
    let items: any[] = []
    
    if (selectedFilter === 'all' || selectedFilter === 'issued') {
      items = [...certificates.map(cert => ({ type: 'certificate', data: cert }))]
    }
    
    if (selectedFilter === 'all' || selectedFilter === 'eligible') {
      items = [...items, ...eligibleCourses.map(course => ({ type: 'eligible', data: course }))]
    }
    
    if (searchQuery) {
      items = items.filter(item => {
        const searchText = item.type === 'certificate' 
          ? item.data.courseName 
          : item.data.title
        return searchText.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }
    
    return items
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">수료증 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">수료증 관리</h1>
        <p className="text-neutral-600">발급받은 수료증을 확인하고 다운로드하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">발급된 수료증</p>
                <p className="text-2xl font-bold text-primary">{certificates.length}</p>
              </div>
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">발급 가능</p>
                <p className="text-2xl font-bold text-green-600">{eligibleCourses.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">총 학습 시간</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatStudyTime(certificates.reduce((total, cert) => total + (cert.totalHours * 3600), 0))}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="card mb-8">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 검색 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="과정명으로 검색하세요"
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            
            {/* 필터 */}
            <div className="flex gap-2">
              {[
                { key: 'all', label: '전체', count: certificates.length + eligibleCourses.length },
                { key: 'issued', label: '발급완료', count: certificates.length },
                { key: 'eligible', label: '발급가능', count: eligibleCourses.length }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter.key
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 수료증 목록 */}
      {filteredData().length === 0 ? (
        <div className="text-center py-16">
          <Award className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">수료증이 없습니다</h3>
          <p className="text-neutral-600 mb-4">과정을 완료하면 수료증을 발급받을 수 있습니다</p>
          <Link to="/courses" className="btn btn-primary">
            과정 둘러보기
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredData().map((item, index) => (
            <div key={index} className="card">
              <div className="card-body">
                {item.type === 'certificate' ? (
                  // 발급된 수료증
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Award className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {item.data.courseName}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCertificateStatusColor(item.data.status)}`}>
                            {getCertificateStatusText(item.data.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>수료: {formatDate(item.data.completionDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>발급: {formatDate(item.data.issuedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatStudyTime(item.data.totalHours * 3600)}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">번호: </span>
                            <span className="font-mono text-xs">{item.data.certificateNumber}</span>
                          </div>
                        </div>
                        <p className="text-sm text-neutral-500 mt-2">
                          {getTemplateTypeDescription(item.data.templateType)} • 담당강사: {item.data.instructorName}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/certificates/${item.data.id}`}
                        className="flex items-center gap-1 px-3 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>미리보기</span>
                      </Link>
                      <Link
                        to={`/certificates/${item.data.id}/download`}
                        className="flex items-center gap-1 px-3 py-2 text-sm bg-primary text-white hover:bg-primary-dark rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>다운로드</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  // 발급 가능한 과정
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {item.data.title}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            발급 가능
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>완료: {formatDate(item.data.progress.completedAt!)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatStudyTime(item.data.duration * 3600)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>진도율: {item.data.progress.progressPercentage}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-neutral-500 mt-2">
                          담당강사: {item.data.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleIssueCertificate(item.data, item.data.progress)}
                        className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
                      >
                        <Award className="w-4 h-4" />
                        <span>수료증 발급</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CertificateListPage