import React, { useState, useEffect } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce'

interface SearchBarProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  onSortChange: (sort: string) => void
  placeholder?: string
  categories?: { value: string; label: string }[]
  sortOptions?: { value: string; label: string }[]
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onCategoryFilter,
  onSortChange,
  placeholder = '과정명을 검색하세요',
  categories = [
    { value: 'all', label: '전체' },
    { value: 'IT', label: 'IT' },
    { value: '경영', label: '경영' },
    { value: '어학', label: '어학' },
    { value: '자격증', label: '자격증' }
  ],
  sortOptions = [
    { value: 'popular', label: '인기순' },
    { value: 'latest', label: '최신순' },
    { value: 'rating', label: '평점순' },
    { value: 'alphabetical', label: '가나다순' }
  ],
  className = ''
}) => {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  
  // 디바운싱된 검색어 (500ms 지연)
  const debouncedQuery = useDebounce(query, 500)

  // 실시간 검색 (디바운싱된 검색어가 변경될 때마다 실행)
  useEffect(() => {
    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 엔터키나 검색 버튼 클릭 시 즉시 검색
    onSearch(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onCategoryFilter(category)
  }

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
    onSortChange(sort)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 메인 검색바 */}
      <div className="relative">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label={`${placeholder} - 검색어를 입력하세요`}
              aria-describedby="search-help"
              className="w-full pl-10 pr-10 py-3 border border-neutral-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <div id="search-help" className="sr-only">
              과정명, 설명, 태그로 검색할 수 있습니다
            </div>
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="검색어 지우기"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <button
            type="submit"
            aria-label="검색 실행"
            className="px-6 py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            검색
          </button>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            aria-label={showFilters ? "필터 옵션 숨기기" : "필터 옵션 보기"}
            aria-expanded={showFilters}
            className="px-4 py-3 border border-l-0 border-neutral-300 rounded-r-lg bg-white hover:bg-neutral-50 transition-colors"
          >
            <Filter className="w-5 h-5 text-neutral-600" />
          </button>
        </form>
      </div>

      {/* 필터 옵션 */}
      {showFilters && (
        <div className="mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 카테고리 필터 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                카테고리
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary text-white'
                        : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 정렬 옵션 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                정렬
              </label>
              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 필터 초기화 */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedSort('popular')
                onCategoryFilter('all')
                onSortChange('popular')
              }}
              className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              필터 초기화
            </button>
          </div>
        </div>
      )}

      {/* 활성 필터 표시 */}
      {(selectedCategory !== 'all' || selectedSort !== 'popular') && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-neutral-600">활성 필터:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
              {categories.find(c => c.value === selectedCategory)?.label}
              <button
                onClick={() => handleCategoryChange('all')}
                className="ml-1 hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSort !== 'popular' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
              {sortOptions.find(s => s.value === selectedSort)?.label}
              <button
                onClick={() => handleSortChange('popular')}
                className="ml-1 hover:text-green-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar