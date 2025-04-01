interface TextareaProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
  error?: string
  className?: string
  rows?: number
  cols?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  error,
  className = '',
  rows = 3,
  cols,
  resize = 'both'
}: TextareaProps) {
  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  }

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        cols={cols}
        className={`textarea textarea-bordered w-full ${resizeClasses[resize]} ${error ? 'textarea-error' : ''} ${className}`}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
} 