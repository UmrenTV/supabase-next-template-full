interface FormGroupProps {
  label?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormGroup({
  label,
  error,
  required = false,
  children,
  className = ''
}: FormGroupProps) {
  return (
    <div className={`form-control w-full ${className}`}>
      {label && (
        <label className="label">
          <span className="label-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      {children}
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
} 