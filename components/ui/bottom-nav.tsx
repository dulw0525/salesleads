"use client"

import { cn } from "@/lib/utils"
import { Home, Search, PlusCircle, ShoppingBag, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "首页", href: "/" },
  { icon: Search, label: "线索", href: "/leads" },
  { icon: PlusCircle, label: "发布", href: "/publish", isCenter: true },
  { icon: ShoppingBag, label: "订单", href: "/orders" },
  { icon: User, label: "我的", href: "/profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-card border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href))
          const Icon = item.icon
          
          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center w-14 h-full"
              >
                <div className="relative -mt-5">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>
            )
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-14 h-full transition-colors",
                isActive ? "text-primary" : "text-muted"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
