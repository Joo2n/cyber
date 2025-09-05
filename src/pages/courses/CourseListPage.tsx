import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, BookOpen, Users, Award } from 'lucide-react'
import CourseCard from '../../components/ui/CourseCard'
import SearchBar from '../../components/ui/SearchBar'
import { Course } from '../../types'
import { useLearningStore } from '../../store/learningStore'

const CourseListPage = () => {
  const { enrollCourse, enrolledCourses } = useLearningStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [isLoading, setIsLoading] = useState(true)

  // Mock 데이터 - 실제로는 API에서 가져와야 함
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Python 기초 프로그래밍',
      description: '프로그래밍이 처음인 분을 위한 Python 기초 과정입니다. 변수, 함수, 제어문 등 기본 문법을 차근차근 배워보세요.',
      category: 'IT',
      level: 'beginner',
      duration: 20,
      rating: 4.8,
      studentCount: 1250,
      instructor: '김개발',
      price: 99000,
      tags: ['Python', '프로그래밍', '기초'],
      lectureCount: 15,
      isPopular: true,
      hasQuiz: true,
      hasCertificate: true,
      createdAt: '2024-08-01T00:00:00Z',
      updatedAt: '2024-08-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'React 웹개발 완주 과정',
      description: 'React를 활용한 현대적인 웹 애플리케이션 개발을 배우는 심화 과정입니다. 실제 프로젝트를 만들어보며 실무 역량을 키워보세요.',
      category: 'IT',
      level: 'intermediate',
      duration: 40,
      rating: 4.9,
      studentCount: 980,
      instructor: '박리액트',
      price: 199000,
      tags: ['React', '웹개발', 'JavaScript'],
      lectureCount: 25,
      isPopular: true,
      hasQuiz: true,
      hasCertificate: true,
      createdAt: '2024-07-15T00:00:00Z',
      updatedAt: '2024-08-10T00:00:00Z'
    },
    {
      id: '3',
      title: '디지털 마케팅 전략 수립',
      description: 'SNS, 검색엔진, 콘텐츠 마케팅 등 디지털 마케팅의 모든 것을 배우는 과정입니다. 실무에서 바로 적용할 수 있는 전략을 제시합니다.',
      category: '경영',
      level: 'intermediate',
      duration: 30,
      rating: 4.7,
      studentCount: 750,
      instructor: '이마케팅',
      price: 149000,
      tags: ['마케팅', 'SNS', '전략'],
      lectureCount: 20,
      isPopular: false,
      hasQuiz: true,
      hasCertificate: true,
      createdAt: '2024-07-01T00:00:00Z',
      updatedAt: '2024-08-05T00:00:00Z'
    },
    {
      id: '4',
      title: '비즈니스 영어 회화',
      description: '업무에 필요한 실용적인 영어 회화를 배우는 과정입니다. 프레젠테이션, 미팅, 이메일 작성 등 비즈니스 상황별 표현을 익혀보세요.',
      category: '어학',
      level: 'intermediate',
      duration: 25,
      rating: 4.6,
      studentCount: 620,
      instructor: 'Sarah Johnson',
      price: 129000,
      tags: ['영어', '회화', '비즈니스'],
      lectureCount: 18,
      isPopular: false,
      hasQuiz: false,
      hasCertificate: true,
      createdAt: '2024-06-15T00:00:00Z',
      updatedAt: '2024-07-20T00:00:00Z'
    },
    {
      id: '5',
      title: '정보처리기사 실기 대비',
      description: '정보처리기사 실기 시험을 완벽하게 준비할 수 있는 과정입니다. 기출문제 분석과 실습을 통해 합격률을 높여보세요.',
      category: '자격증',
      level: 'advanced',
      duration: 35,
      rating: 4.9,
      studentCount: 890,
      instructor: '최정보',
      price: 179000,
      tags: ['자격증', '정보처리기사', '실기'],
      lectureCount: 22,
      isPopular: true,
      hasQuiz: true,
      hasCertificate: false,
      createdAt: '2024-06-01T00:00:00Z',
      updatedAt: '2024-08-01T00:00:00Z'
    },
    {
      id: '6',
      title: 'Excel 데이터 분석 마스터',
      description: 'Excel의 고급 기능을 활용한 데이터 분석 과정입니다. 피벗테이블, 매크로, VBA까지 업무 효율성을 극대화해보세요.',
      category: 'IT',
      level: 'advanced',
      duration: 28,
      rating: 4.8,
      studentCount: 540,
      instructor: '엑셀왕',
      price: 139000,
      tags: ['Excel', '데이터분석', 'VBA'],
      lectureCount: 16,
      isPopular: false,
      hasQuiz: true,
      hasCertificate: true,
      createdAt: '2024-05-15T00:00:00Z',
      updatedAt: '2024-07-30T00:00:00Z'
    }
  ])

  // 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // 과정 필터링 및 정렬
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // 카테고리 필터
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // 정렬
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.studentCount - a.studentCount)
      case 'latest':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered
    }
  }, [courses, searchQuery, selectedCategory, sortBy])

  // 수강신청 처리
  const handleEnroll = async (courseId: string) => {
    const success = await enrollCourse(courseId)
    if (success) {
      // 성공 처리는 useLearningStore에서 관리
    }
  }

  // 이미 신청한 과정인지 확인
  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(course => course.courseId === courseId)
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">과정 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">수강신청</h1>
        <p className="text-neutral-600">전문가와 함께하는 온라인 교육으로 성장하세요</p>
      </div>

      {/* 통계 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="card-body text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">{courses.length}</p>
            <p className="text-sm text-neutral-600">전체 과정</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">{courses.filter(c => c.isPopular).length}</p>
            <p className="text-sm text-neutral-600">인기 과정</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">{courses.reduce((sum, c) => sum + c.studentCount, 0).toLocaleString()}</p>
            <p className="text-sm text-neutral-600">총 수강생</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body text-center">
            <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-neutral-900">{courses.filter(c => c.hasCertificate).length}</p>
            <p className="text-sm text-neutral-600">수료증 과정</p>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-8">
        <SearchBar
          onSearch={setSearchQuery}
          onCategoryFilter={setSelectedCategory}
          onSortChange={setSortBy}
        />
      </div>

      {/* 결과 표시 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <p className="text-neutral-600">
            총 <span className="font-semibold text-neutral-900">{filteredAndSortedCourses.length}</span>개 과정
            {searchQuery && (
              <span className="ml-2 text-sm">
                '<span className="text-primary font-medium">{searchQuery}</span>' 검색 결과
              </span>
            )}
          </p>
          
          {/* 실시간 검색 표시 */}
          {searchQuery && (
            <div className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              실시간 검색
            </div>
          )}
        </div>
      </div>

      {/* 과정 목록 */}
      {filteredAndSortedCourses.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-neutral-600 mb-4">다른 검색어나 필터를 시도해보세요</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSortBy('popular')
            }}
            className="btn btn-primary"
          >
            전체 과정 보기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              enrolled={isEnrolled(course.id)}
              searchTerm={searchQuery}
            />
          ))}
        </div>
      )}

      {/* 더 많은 과정 안내 */}
      {filteredAndSortedCourses.length > 0 && (
        <div className="mt-12 text-center">
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">원하는 과정을 찾지 못하셨나요?</h3>
              <p className="text-neutral-600 mb-4">
                다양한 분야의 새로운 과정들이 지속적으로 업데이트됩니다
              </p>
              <Link to="/help/qna" className="btn btn-ghost">
                과정 개설 요청하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseListPage