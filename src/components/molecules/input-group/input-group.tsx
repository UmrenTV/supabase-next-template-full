interface InputGroupProps {
  children: React.ReactNode
  className?: string
}

export function InputGroup({ children, className = '' }: InputGroupProps) {
  return (
    <div className={`join w-full ${className}`}>
      {children}
    </div>
  )
}

interface InputGroupAddonProps {
  children: React.ReactNode
  className?: string
}

export function InputGroupAddon({ children, className = '' }: InputGroupAddonProps) {
  return (
    <div className={`join-item ${className}`}>
      {children}
    </div>
  )
}

interface InputGroupInputProps {
  children: React.ReactNode
  className?: string
}

export function InputGroupInput({ children, className = '' }: InputGroupInputProps) {
  return (
    <div className={`join-item flex-1 ${className}`}>
      {children}
    </div>
  )
} 