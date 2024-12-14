import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  step: {
    id: number
    title: string
    icon: React.ElementType
  }
  currentStep: number
}

export default function StepIndicator({ step, currentStep }: StepIndicatorProps) {
  const Icon = step.icon
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border-2",
          step.id === currentStep
            ? "border-primary bg-primary text-primary-foreground"
            : step.id < currentStep
            ? "border-green-500 text-white bg-green-500"
            : "border-muted bg-background text-muted-foreground"
        )}
      >
        {step.id < currentStep ? (
          <Check className="w-5 h-5" />
        ) : (
          <Icon className="w-5 h-5" />
        )}
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground w-40 text-center">{step.title}</div>
    </div>
  )
}

