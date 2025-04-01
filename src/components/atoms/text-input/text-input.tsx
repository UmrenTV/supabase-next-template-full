interface TextInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search'
  disabled?: boolean
  readOnly?: boolean
  error?: string
  className?: string
}

export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  readOnly = false,
  error,
  className = ''
}: TextInputProps) {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
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