import React from 'react'

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'stats' | 'text' | 'circle'
  count?: number
  className?: string
}

/**
 * 로딩 스켈레톤 컴포넌트
 * 다양한 형태의 스켈레톤 UI 제공
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'card',
  count = 1,
  className = ''
}) => {
  const baseClasses = 'animate-pulse bg-neutral-200 rounded'
  
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`p-4 border border-neutral-200 rounded-lg ${className}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className={`h-5 w-3/4 mb-2 ${baseClasses}`}></div>
                <div className={`h-4 w-1/2 ${baseClasses}`}></div>
              </div>
              <div className={`h-8 w-16 ${baseClasses}`}></div>
            </div>
            <div className={`h-2 w-full ${baseClasses}`}></div>
          </div>
        )
      
      case 'list':
        return (
          <div className={`flex items-center space-x-4 p-3 ${className}`}>
            <div className={`w-10 h-10 rounded-lg ${baseClasses}`}></div>
            <div className="flex-1">
              <div className={`h-4 w-3/4 mb-2 ${baseClasses}`}></div>
              <div className={`h-3 w-1/2 ${baseClasses}`}></div>
            </div>
            <div className={`w-5 h-5 ${baseClasses}`}></div>
          </div>
        )
      
      case 'stats':
        return (
          <div className={`p-6 border border-neutral-200 rounded-lg ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-8 h-8 rounded ${baseClasses}`}></div>
              <div className={`w-6 h-4 ${baseClasses}`}></div>
            </div>
            <div className={`h-8 w-16 mb-2 ${baseClasses}`}></div>
            <div className={`h-4 w-20 ${baseClasses}`}></div>
          </div>
        )
      
      case 'text':
        return (
          <div className={className}>
            <div className={`h-4 w-full mb-2 ${baseClasses}`}></div>
            <div className={`h-4 w-3/4 mb-2 ${baseClasses}`}></div>
            <div className={`h-4 w-1/2 ${baseClasses}`}></div>
          </div>
        )
      
      case 'circle':
        return (
          <div className={`w-12 h-12 rounded-full ${baseClasses} ${className}`}></div>
        )
      
      default:
        return (
          <div className={`h-20 w-full ${baseClasses} ${className}`}></div>
        )
    }
  }

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="mb-4 last:mb-0">
          {renderSkeleton()}
        </div>
      ))}
    </>
  )
}

export default LoadingSkeleton
