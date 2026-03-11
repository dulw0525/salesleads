"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title: string
  showBack?: boolean
  rightContent?: React.ReactNode
  transparent?: boolean
  onBack?: () => void
}

export function Header({ title, showBack = true, rightContent, transparent = false, onBack }: HeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between h-11 px-4",
        transparent ? "bg-transparent" : "bg-[var(--card)] border-b border-[var(--border)]"
      )}
    >
      <div className="w-10 flex items-center">
        {showBack && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full active:bg-[var(--secondary)] transition-colors"
            aria-label="返回"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--foreground)]" />
          </button>
        )}
      </div>
      <h1 className="text-[16px] font-semibold text-[var(--foreground)] text-center flex-1 truncate">
        {title}
      </h1>
      <div className="w-10 flex items-center justify-end">
        {rightContent}
      </div>
    </header>
  )
}
