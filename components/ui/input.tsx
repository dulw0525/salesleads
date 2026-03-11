"use client"

import { cn } from "@/lib/utils"
import { type InputHTMLAttributes, forwardRef } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[12px] font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "h-11 w-full px-3 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)]",
            "text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[var(--destructive)] focus:ring-[var(--destructive)]",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-[10px] text-[var(--destructive)]">{error}</span>
        )}
        {hint && !error && (
          <span className="text-[10px] text-[var(--muted)]">{hint}</span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
