interface DateTimeProps {
  label?: string
  value: string
  onChange: (value: string) => void
  type?: 'date' | 'time' | 'datetime-local'
  disabled?: boolean
  readOnly?: boolean
  error?: string
  className?: string
  min?: string
  max?: string
}

export function DateTime({
  label,
  value,
  onChange,
  type = 'datetime-local',
  disabled = false,
  readOnly = false,
  error,
  className = '',
  min,
  max
}: DateTimeProps) {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        className={`input input-bordered w-full ${error ? 'input-error' : ''} ${className}`}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
} 