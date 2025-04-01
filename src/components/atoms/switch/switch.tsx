interface SwitchProps {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  error?: string
  className?: string
}

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  className = ''
}: SwitchProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className={`toggle ${error ? 'toggle-error' : ''} ${className}`}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
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