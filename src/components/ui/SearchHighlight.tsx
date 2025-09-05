import React from 'react'

interface SearchHighlightProps {
  text: string
  searchTerm: string
  className?: string
}

/**
 * 검색어를 하이라이팅하는 컴포넌트
 */
const SearchHighlight: React.FC<SearchHighlightProps> = ({
  text,
  searchTerm,
  className = ''
}) => {
  if (!searchTerm.trim()) {
    return <span className={className}>{text}</span>
  }

  // 검색어를 대소문자 구분 없이 찾기
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (regex.test(part)) {
          return (
            <mark
              key={index}
              className="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded font-medium"
            >
              {part}
            </mark>
          )
        }
        return part
      })}
    </span>
  )
}

export default SearchHighlight
