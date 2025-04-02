import { Button } from '@/components/atoms'

interface FeatureCardProps {
  title: string
  description: string
  buttonLabel?: string
  onButtonClick?: () => void
}

export function FeatureCard({ title, description, buttonLabel, onButtonClick }: FeatureCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {buttonLabel && (
        <Button 
          label={buttonLabel} 
          onClick={onButtonClick}
          variant="primary"
        />
      )}
    </div>
  )
} 