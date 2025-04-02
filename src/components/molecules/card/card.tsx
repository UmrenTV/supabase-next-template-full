import { Button } from '@/components/atoms'

interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  )
} 