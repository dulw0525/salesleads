"use client"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg" | "full"
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors active-scale",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Variants
          variant === "primary" && "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-dark)]",
          variant === "secondary" && "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--border)]",
          variant === "outline" && "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]",
          variant === "ghost" && "bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]",
          variant === "destructive" && "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90",
          // Sizes
          size === "sm" && "h-8 px-3 text-[10px] rounded-[var(--radius-sm)]",
          size === "md" && "h-10 px-4 text-[12px] rounded-[var(--radius)]",
          size === "lg" && "h-12 px-6 text-[14px] rounded-[var(--radius)]",
          size === "full" && "h-12 w-full text-[14px] rounded-[var(--radius)]",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            加载中...
          </span>
        ) : children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
