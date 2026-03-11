import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline"
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium",
        variant === "default" && "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
        variant === "primary" && "bg-[var(--primary-light)] text-[var(--primary)]",
        variant === "secondary" && "bg-[var(--secondary)] text-[var(--muted-foreground)]",
        variant === "success" && "bg-[#dcfce7] text-[#15803d]",
        variant === "warning" && "bg-[#fef3c7] text-[#b45309]",
        variant === "destructive" && "bg-[#fee2e2] text-[#dc2626]",
        variant === "outline" && "border border-[var(--border)] bg-transparent text-[var(--foreground)]",
        className
      )}
      {...props}
    />
  )
)

Badge.displayName = "Badge"

export { Badge }
