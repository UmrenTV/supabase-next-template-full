import { FeatureCard } from '@/components/molecules/feature-card/feature-card'
import { Button } from '@/components/atoms'

interface Feature {
  title: string
  description: string
  buttonLabel?: string
  onButtonClick?: () => void
}

interface FeatureSectionProps {
  title: string
  subtitle: string
  features: Feature[]
  ctaLabel?: string
  onCtaClick?: () => void
}

export function FeatureSection({
  title,
  subtitle,
  features,
  ctaLabel,
  onCtaClick
}: FeatureSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>

        {ctaLabel && (
          <div className="text-center">
            <Button
              label={ctaLabel}
              variant="primary"
              onClick={onCtaClick}
            />
          </div>
        )}
      </div>
    </section>
  )
} 