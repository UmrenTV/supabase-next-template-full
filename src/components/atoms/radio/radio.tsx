interface RadioProps {
  label?: string
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  error,
  className = ''
}: RadioProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`radio ${error ? 'radio-error' : ''} ${className}`}
        />
        {label && <span className="label-text ml-2">{label}</span>}
      </label>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
} 