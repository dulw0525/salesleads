"use client"

import { BottomNav } from "@/components/ui/bottom-nav"
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
function IntentStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array(4).fill(0).map((_, i) => (
        <Star 
          key={i} 
          className={`w-3 h-3 ${i < level ? 'text-warning fill-warning' : 'text-border'}`} 
        />
      ))}
    </div>
  )
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 顶部区域 */}
      <div className="gradient-primary px-[20px] pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-base font-bold text-white">保险线索交易平台</h1>
            <p className="text-xs text-white/80 mt-1">获取精准客户，提升成交转化</p>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* 搜索框 */}
        <Link href="/leads" className="block">
          <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-2">
            <Search className="w-4 h-4 text-muted" />
            <span className="text-xs text-muted">搜索线索、地区、险种...</span>
          </div>
        </Link>
      </div>

      {/* 数据统计 */}
      <div className="px-[20px] -mt-4">
        <div className="bg-card rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-base font-bold text-primary">1,280</p>
              <p className="text-[10px] text-muted mt-1">今日新增线索</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-base font-bold text-primary">95%</p>
              <p className="text-[10px] text-muted mt-1">成交转化率</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-base font-bold text-primary">0</p>
              <p className="text-[10px] text-muted mt-1">撮合手续费</p>
            </div>
          </div>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="px-[20px] mt-[20px]">
        <div className="grid grid-cols-4 gap-4">
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
              <span className="text-[10px] text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 热门线索 */}
      <div className="px-[20px] mt-[20px]">
        <div className="flex items-center justify-between mb-[12px]">
          <h2 className="text-[14px] font-semibold text-foreground">热门线索</h2>
          <Link 
            href="/leads" 
            className="flex items-center gap-1 text-xs text-primary"
          >
            查看更多
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-[12px]">
          {hotLeads.map((lead) => (
            <Link key={lead.id} href={`/leads/${lead.id}`}>
              <div className="bg-card rounded-xl shadow-sm p-4 active-scale">
                {/* 顶部标签行 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {lead.isHot && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-500">
                        <Zap className="w-2.5 h-2.5" />
                        热门
                      </span>
                    )}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary-light text-primary">
                      AI评分 {lead.aiScore}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted">{lead.timeAgo}</span>
                </div>

                {/* 基本信息 */}
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3 h-3 text-muted flex-shrink-0" />
                  <span className="text-xs text-foreground">{lead.region}</span>
                  <span className="text-border">|</span>
                  <span className="text-xs text-foreground">{lead.ageRange}</span>
                  <span className="text-border">|</span>
                  <span className="text-xs text-foreground">{lead.occupation}</span>
                </div>

                {/* 预算和险种 */}
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className="text-xs text-muted">预算:</span>
                  <span className="text-xs text-foreground">{lead.budget}</span>
                  <span className="text-border">|</span>
                  <span className="text-xs text-muted">险种:</span>
                  {lead.insuranceTypes.map((type) => (
                    <span 
                      key={type} 
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* 底部信息 */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted">意向:</span>
                    <IntentStars level={lead.intentLevel} />
                    <span className="text-[10px] text-warning">{lead.intentLabel}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-primary">{lead.price}</span>
                    <span className="text-[10px] text-muted">展业分</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 平台优势 */}
      <div className="px-[20px] mt-[20px] mb-[20px]">
        <h2 className="text-[14px] font-semibold text-foreground mb-[12px]">平台优势</h2>
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="bg-card rounded-xl shadow-sm p-4">
            <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xs font-medium text-foreground mb-1">24小时售后保护</h3>
            <p className="text-[10px] text-muted leading-relaxed">购买后享受24小时售后保障期</p>
          </div>
          <div className="bg-card rounded-xl shadow-sm p-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-info" />
            </div>
            <h3 className="text-xs font-medium text-foreground mb-1">AI智能校验</h3>
            <p className="text-[10px] text-muted leading-relaxed">防撞单、空号检测、价值评估</p>
          </div>
          <div className="bg-card rounded-xl shadow-sm p-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <h3 className="text-xs font-medium text-foreground mb-1">0手续费</h3>
            <p className="text-[10px] text-muted leading-relaxed">平台不收取任何撮合手续费</p>
          </div>
          <div className="bg-card rounded-xl shadow-sm p-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xs font-medium text-foreground mb-1">隐私保护</h3>
            <p className="text-[10px] text-muted leading-relaxed">虚拟号外呼，保护双方隐私</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
