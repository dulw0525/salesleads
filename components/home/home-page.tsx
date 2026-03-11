"use client"

import { BottomNav } from "@/components/ui/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield,
  ArrowRight,
  MapPin,
  Star
} from "lucide-react"
import Link from "next/link"

// 模拟热门线索数据
const hotLeads = [
  {
    id: "1",
    region: "北京 · 朝阳区",
    ageRange: "30-40岁",
    occupation: "企业高管",
    budget: "10-20万",
    intentLevel: 4,
    intentLabel: "近期急需",
    insuranceTypes: ["人寿保险", "健康保险"],
    price: 280,
    aiScore: 88,
    sellerRating: 4.9,
    timeAgo: "2小时前",
    isHot: true,
  },
  {
    id: "2",
    region: "上海 · 浦东新区",
    ageRange: "40-50岁",
    occupation: "医生",
    budget: "20-50万",
    intentLevel: 3,
    intentLabel: "明确规划",
    insuranceTypes: ["健康保险"],
    price: 350,
    aiScore: 82,
    sellerRating: 4.8,
    timeAgo: "5小时前",
    isHot: false,
  },
  {
    id: "3",
    region: "深圳 · 南山区",
    ageRange: "35-45岁",
    occupation: "IT工程师",
    budget: "15-30万",
    intentLevel: 4,
    intentLabel: "近期急需",
    insuranceTypes: ["人寿保险", "财产保险"],
    price: 320,
    aiScore: 91,
    sellerRating: 5.0,
    timeAgo: "1小时前",
    isHot: true,
  },
]

// 功能入口
const quickActions = [
  { icon: Search, label: "线索大厅", href: "/leads", color: "#00bc71" },
  { icon: TrendingUp, label: "发布线索", href: "/publish", color: "#1890ff" },
  { icon: Users, label: "我的客户", href: "/customers", color: "#722ed1" },
  { icon: Shield, label: "售后申诉", href: "/complaints", color: "#fa8c16" },
]

// 获取意向等级星星
function getIntentStars(level: number) {
  return Array(4).fill(0).map((_, i) => (
    <Star 
      key={i} 
      className={`w-3 h-3 ${i < level ? 'text-[var(--warning)] fill-[var(--warning)]' : 'text-[var(--border)]'}`} 
    />
  ))
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      {/* 顶部区域 */}
      <div className="gradient-primary px-5 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[16px] font-bold text-white">保险线索交易平台</h1>
            <p className="text-[12px] text-white/80 mt-1">获取精准客户，提升成交转化</p>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* 搜索框 */}
        <Link href="/leads" className="block">
          <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2">
            <Search className="w-4 h-4 text-[var(--muted)]" />
            <span className="text-[12px] text-[var(--muted)]">搜索线索、地区、险种...</span>
          </div>
        </Link>
      </div>

      {/* 数据统计 */}
      <div className="px-5 -mt-4">
        <Card className="p-4">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-[16px] font-bold text-[var(--primary)]">1,280</p>
              <p className="text-[10px] text-[var(--muted)] mt-0.5">今日新增线索</p>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <p className="text-[16px] font-bold text-[var(--primary)]">95%</p>
              <p className="text-[10px] text-[var(--muted)] mt-0.5">成交转化率</p>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <p className="text-[16px] font-bold text-[var(--primary)]">0</p>
              <p className="text-[10px] text-[var(--muted)] mt-0.5">撮合手续费</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 快捷入口 */}
      <div className="px-5 mt-5">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link 
              key={action.label} 
              href={action.href}
              className="flex flex-col items-center gap-2"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <action.icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <span className="text-[10px] text-[var(--foreground)]">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 热门线索 */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-semibold text-[var(--foreground)]">热门线索</h2>
          <Link 
            href="/leads" 
            className="flex items-center gap-1 text-[12px] text-[var(--primary)]"
          >
            查看更多
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {hotLeads.map((lead) => (
            <Link key={lead.id} href={`/leads/${lead.id}`}>
              <Card className="p-4 active-scale">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {lead.isHot && (
                      <Badge variant="destructive" className="gap-0.5">
                        <Zap className="w-2.5 h-2.5" />
                        热门
                      </Badge>
                    )}
                    <Badge variant="primary">AI评分 {lead.aiScore}</Badge>
                  </div>
                  <span className="text-[10px] text-[var(--muted)]">{lead.timeAgo}</span>
                </div>

                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3 text-[var(--muted)]" />
                  <span className="text-[12px] text-[var(--foreground)]">{lead.region}</span>
                  <span className="text-[var(--border)]">|</span>
                  <span className="text-[12px] text-[var(--foreground)]">{lead.ageRange}</span>
                  <span className="text-[var(--border)]">|</span>
                  <span className="text-[12px] text-[var(--foreground)]">{lead.occupation}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[12px] text-[var(--muted)]">预算:</span>
                  <span className="text-[12px] text-[var(--foreground)]">{lead.budget}</span>
                  <span className="text-[var(--border)]">|</span>
                  <span className="text-[12px] text-[var(--muted)]">险种:</span>
                  {lead.insuranceTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="text-[10px]">{type}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[var(--muted)]">意向:</span>
                    <div className="flex items-center gap-0.5">
                      {getIntentStars(lead.intentLevel)}
                    </div>
                    <span className="text-[10px] text-[var(--warning)]">{lead.intentLabel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[16px] font-bold text-[var(--primary)]">{lead.price}</span>
                    <span className="text-[10px] text-[var(--muted)]">展业分</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 平台优势 */}
      <div className="px-5 mt-6 mb-4">
        <h2 className="text-[14px] font-semibold text-[var(--foreground)] mb-3">平台优势</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <div className="w-8 h-8 bg-[var(--primary-light)] rounded-lg flex items-center justify-center mb-2">
              <Shield className="w-4 h-4 text-[var(--primary)]" />
            </div>
            <h3 className="text-[12px] font-medium text-[var(--foreground)]">24小时售后保护</h3>
            <p className="text-[10px] text-[var(--muted)] mt-1">购买后享受24小时售后保障期</p>
          </Card>
          <Card className="p-3">
            <div className="w-8 h-8 bg-[#e6f4ff] rounded-lg flex items-center justify-center mb-2">
              <Zap className="w-4 h-4 text-[#1890ff]" />
            </div>
            <h3 className="text-[12px] font-medium text-[var(--foreground)]">AI智能校验</h3>
            <p className="text-[10px] text-[var(--muted)] mt-1">防撞单、空号检测、价值评估</p>
          </Card>
          <Card className="p-3">
            <div className="w-8 h-8 bg-[#f6ffed] rounded-lg flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-[#52c41a]" />
            </div>
            <h3 className="text-[12px] font-medium text-[var(--foreground)]">0手续费</h3>
            <p className="text-[10px] text-[var(--muted)] mt-1">平台不收取任何撮合手续费</p>
          </Card>
          <Card className="p-3">
            <div className="w-8 h-8 bg-[#fff7e6] rounded-lg flex items-center justify-center mb-2">
              <Users className="w-4 h-4 text-[#fa8c16]" />
            </div>
            <h3 className="text-[12px] font-medium text-[var(--foreground)]">隐私保护</h3>
            <p className="text-[10px] text-[var(--muted)] mt-1">虚拟号外呼，保护双方隐私</p>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
