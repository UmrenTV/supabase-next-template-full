import { FaUser } from 'react-icons/fa'
import Image from 'next/image'

interface DefaultAvatarProps {
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  url?: string
}

export function DefaultAvatar({ name, size = 'md', className = '', url }: DefaultAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  }

  if (url) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <Image
          src={url}
          alt={name || 'User avatar'}
          fill
          className="rounded-full object-cover"
        />
      </div>
    )
  }

  return (
    <div 
      className={`rounded-full bg-primary/10 text-primary flex items-center justify-center ${sizeClasses[size]} ${className}`}
      data-testid="default-avatar"
    >
      {name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <FaUser className="text-primary/70" />
      )}
    </div>
  )
} 