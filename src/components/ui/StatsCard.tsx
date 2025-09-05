import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'orange'
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  className?: string
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'blue',
  trend,
  className = ''
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  }

  const iconBgClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100'
  }

  return (
    <div className={`card hover:shadow-medium transition-shadow duration-200 ${className}`}>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-neutral-900 mb-2">{value}</p>
            {trend && (
              <div className="flex items-center">
                <span className={`text-xs font-medium ${
                  trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.direction === 'up' ? '↗' : '↘'} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-neutral-500 ml-1">vs 지난달</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${iconBgClasses[color]}`}>
            <div className={colorClasses[color]}>{icon}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard