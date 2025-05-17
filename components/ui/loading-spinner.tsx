import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "white" | "gray"
  className?: string
}

export function LoadingSpinner({ size = "md", color = "primary", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }

  const colorClasses = {
    primary: "border-[#741717] border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-300 border-t-transparent",
  }

  return (
    <div
      className={cn("animate-spin rounded-full", sizeClasses[size], colorClasses[color], className)}
      role="status"
      aria-label="Загрузка"
    >
      <span className="sr-only">Загрузка...</span>
    </div>
  )
}
