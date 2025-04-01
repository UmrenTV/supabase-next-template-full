interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ 
  label, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  disabled = false,
  loading = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'btn'
  const variantClasses = `btn-${variant}`
  const sizeClasses = `btn-${size}`
  const stateClasses = loading ? 'loading' : ''
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {label}
    </button>
  )
} 