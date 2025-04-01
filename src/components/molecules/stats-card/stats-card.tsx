interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down'
  icon?: React.ReactNode
  className?: string
}

export function StatsCard({
  title,
  value,
  change,
  trend,
  icon,
  className = ''
}: StatsCardProps) {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="card-title text-sm font-medium text-base-content/70">{title}</h3>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className={`flex items-center gap-1 mt-1 text-sm ${trend === 'up' ? 'text-success' : 'text-error'}`}>
              <span>{trend === 'up' ? '↑' : '↓'}</span>
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 