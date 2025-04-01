interface CheckboxProps {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  className = ''
}: CheckboxProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text mr-2">{label}</span>
        <input
          type="checkbox"
          className={`checkbox ${error ? 'checkbox-error' : ''} ${className}`}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
      </label>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
} 