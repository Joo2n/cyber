import React from 'react'

interface ProgressBarProps {
  value: number // 0-100
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  size = 'md',
  color = 'blue',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  const colorClasses = {
    blue: 'bg-primary',
    green: 'bg-success',
    yellow: 'bg-warning',
    red: 'bg-error',
    purple: 'bg-purple-500'
  }

  // 값을 0-100 범위로 제한
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-neutral-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-neutral-600">{Math.round(clampedValue)}%</span>
          )}
        </div>
      )}
      
      <div className={`bg-neutral-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} rounded-full transition-all duration-500 ease-out ${sizeClasses[size]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar