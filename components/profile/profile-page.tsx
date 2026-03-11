"use client"

import { BottomNav } from "@/components/ui/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User,
  Wallet,
  CreditCard,
  FileText,
  ShieldCheck,
  Settings,
  HelpCircle,
  ChevronRight,
  Star,
  TrendingUp,
  Package
} from "lucide-react"
import Link from "next/link"

// 模拟用户数据
const userData = {
  name: "张三",
  phone: "138****5678",
  avatar: null,
  creditLevel: "S",
  creditScore: 95,
  isVerified: true,
  isFaceVerified: true,
}

// 模拟账户数据
const accountData = {
  rechargeBalance: 1500,
  incomeBalance: 2800,
  frozenBalance: 420,
  totalDeals: 28,
  totalIncome: 5600,
}

// 菜单项
const menuItems = [
  { icon: Package, label: "我的线索", href: "/my-leads", badge: "3" },
  { icon: FileText, label: "申诉记录", href: "/complaints", badge: null },
  { icon: ShieldCheck, label: "实名认证", href: "/auth/verify", badge: "已认证" },
  { icon: Settings, label: "设置", href: "/settings", badge: null },
  { icon: HelpCircle, label: "帮助中心", href: "/help", badge: null },
]

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      {/* 顶部用户信息 */}
      <div className="gradient-primary px-5 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-white">{userData.name}</h2>
              <Badge className="bg-white/20 text-white text-[10px]">
                <Star className="w-2.5 h-2.5 mr-0.5" />
                {userData.creditLevel}级卖家
              </Badge>
            </div>
            <p className="text-[12px] text-white/80 mt-1">{userData.phone}</p>
            <div className="flex items-center gap-2 mt-2">
              {userData.isVerified && (
                <Badge className="bg-[var(--primary-dark)] text-white text-[10px]">
                  <ShieldCheck className="w-2.5 h-2.5 mr-0.5" />
                  已实名
                </Badge>
              )}
              {userData.isFaceVerified && (
                <Badge className="bg-[var(--primary-dark)] text-white text-[10px]">
                  已人脸认证
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 信用分 */}
        <div className="mt-4 flex items-center justify-between bg-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-[12px] text-white">信用分</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-bold text-white">{userData.creditScore}</span>
            <span className="text-[10px] text-white/60">/ 100</span>
          </div>
        </div>
      </div>

      {/* 账户信息 */}
      <div className="px-5 -mt-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)]">我的账户</h3>
            <Link href="/wallet" className="text-[12px] text-[var(--primary)]">
              查看明细
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Link href="/wallet/recharge" className="text-center">
              <p className="text-[20px] font-bold text-[var(--foreground)]">{accountData.rechargeBalance}</p>
              <p className="text-[10px] text-[var(--muted)] mt-1">充值分</p>
            </Link>
            <Link href="/wallet/income" className="text-center">
              <p className="text-[20px] font-bold text-[var(--primary)]">{accountData.incomeBalance}</p>
              <p className="text-[10px] text-[var(--muted)] mt-1">收益分</p>
            </Link>
            <div className="text-center">
              <p className="text-[20px] font-bold text-[var(--warning)]">{accountData.frozenBalance}</p>
              <p className="text-[10px] text-[var(--muted)] mt-1">待结算</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Link href="/wallet/recharge" className="flex-1">
              <div className="bg-[var(--primary)] text-white rounded-lg py-2.5 text-center text-[12px] font-medium">
                充值
              </div>
            </Link>
            <Link href="/wallet/withdraw" className="flex-1">
              <div className="border border-[var(--primary)] text-[var(--primary)] rounded-lg py-2.5 text-center text-[12px] font-medium">
                提现
              </div>
            </Link>
          </div>
        </Card>
      </div>

      {/* 交易统计 */}
      <div className="px-5 mt-4">
        <Card className="p-4">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-[20px] font-bold text-[var(--foreground)]">{accountData.totalDeals}</p>
              <p className="text-[10px] text-[var(--muted)] mt-1">累计成交</p>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <p className="text-[20px] font-bold text-[var(--primary)]">{accountData.totalIncome}</p>
              <p className="text-[10px] text-[var(--muted)] mt-1">累计收益</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 菜单列表 */}
      <div className="px-5 mt-4">
        <Card>
          {menuItems.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center justify-between p-4 ${
                index !== menuItems.length - 1 ? 'border-b border-[var(--border)]' : ''
              }`}>
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[var(--muted)]" />
                  <span className="text-[12px] text-[var(--foreground)]">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant={item.badge === "已认证" ? "success" : "primary"} className="text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
                </div>
              </div>
            </Link>
          ))}
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
