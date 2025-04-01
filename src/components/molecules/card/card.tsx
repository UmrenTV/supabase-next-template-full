import { Button } from '@/components/atoms'

interface CardProps {
  title: string
  description: string
  buttonLabel?: string
  onButtonClick?: () => void
}

export function Card({ 
  title, 
  description, 
  buttonLabel, 
  onButtonClick 
}: CardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        {buttonLabel && (
          <div className="card-actions justify-end">
            <Button 
              label={buttonLabel} 
              onClick={onButtonClick}
            />
          </div>
        )}
      </div>
    </div>
  )
} 