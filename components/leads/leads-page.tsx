"use client"

import { useState } from "react"
import { BottomNav } from "@/components/ui/bottom-nav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  SlidersHorizontal, 
  MapPin,
  Star,
  Zap,
  Heart,
  ChevronDown,
  X,
  ArrowUpDown
} from "lucide-react"
import Link from "next/link"

// 模拟线索数据
const leadsData = [
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
    sellerDeals: 156,
    timeAgo: "2小时前",
    isHot: true,
    isFavorite: false,
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
    sellerDeals: 89,
    timeAgo: "5小时前",
    isHot: false,
    isFavorite: true,
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
    sellerDeals: 203,
    timeAgo: "1小时前",
    isHot: true,
    isFavorite: false,
  },
  {
    id: "4",
    region: "广州 · 天河区",
    ageRange: "25-35岁",
    occupation: "自由职业",
    budget: "5-10万",
    intentLevel: 2,
    intentLabel: "潜在了解",
    insuranceTypes: ["健康保险"],
    price: 150,
    aiScore: 72,
    sellerRating: 4.5,
    sellerDeals: 45,
    timeAgo: "8小时前",
    isHot: false,
    isFavorite: false,
  },
  {
    id: "5",
    region: "杭州 · 西湖区",
    ageRange: "45-55岁",
    occupation: "企业主",
    budget: "50-100万",
    intentLevel: 4,
    intentLabel: "近期急需",
    insuranceTypes: ["人寿保险", "健康保险", "财产保险"],
    price: 580,
    aiScore: 95,
    sellerRating: 4.9,
    sellerDeals: 312,
    timeAgo: "30分钟前",
    isHot: true,
    isFavorite: false,
  },
]

// 筛选选项
const filterOptions = {
  regions: ["不限", "北京", "上海", "深圳", "广州", "杭州", "成都", "武汉"],
  ageRanges: ["不限", "20-30岁", "30-40岁", "40-50岁", "50岁以上"],
  budgets: ["不限", "5万以下", "5-10万", "10-20万", "20-50万", "50万以上"],
  insuranceTypes: ["不限", "人寿保险", "健康保险", "财产保险", "车险"],
  intentLevels: ["不限", "近期急需", "明确规划", "潜在了解", "暂无意向"],
}

const sortOptions = [
  { value: "recommend", label: "综合推荐" },
  { value: "price_asc", label: "价格从低到高" },
  { value: "price_desc", label: "价格从高到低" },
  { value: "latest", label: "最新上架" },
  { value: "hot", label: "热门优先" },
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

export function LeadsPage() {
  const [showFilter, setShowFilter] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSort, setCurrentSort] = useState("recommend")
  const [filters, setFilters] = useState({
    region: "不限",
    ageRange: "不限",
    budget: "不限",
    insuranceType: "不限",
    intentLevel: "不限",
  })
  const [favorites, setFavorites] = useState<string[]>(["2"])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== "不限").length

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-40 bg-[var(--card)] border-b border-[var(--border)] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-[var(--secondary)] rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="搜索地区、职业、险种..."
              className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-[var(--muted)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X className="w-4 h-4 text-[var(--muted)]" />
              </button>
            )}
          </div>
          <button 
            onClick={() => setShowFilter(true)}
            className="relative w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center"
          >
            <SlidersHorizontal className="w-4 h-4 text-[var(--foreground)]" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] rounded-full text-[10px] text-white flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* 快捷筛选标签 */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setShowSort(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[var(--primary-light)] rounded-full flex-shrink-0"
          >
            <ArrowUpDown className="w-3 h-3 text-[var(--primary)]" />
            <span className="text-[10px] text-[var(--primary)]">
              {sortOptions.find(s => s.value === currentSort)?.label}
            </span>
            <ChevronDown className="w-3 h-3 text-[var(--primary)]" />
          </button>
          {["区域", "年龄", "预算", "险种"].map((tag) => (
            <button 
              key={tag}
              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--secondary)] rounded-full flex-shrink-0"
            >
              <span className="text-[10px] text-[var(--foreground)]">{tag}</span>
              <ChevronDown className="w-3 h-3 text-[var(--muted)]" />
            </button>
          ))}
        </div>
      </div>

      {/* 线索列表 */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] text-[var(--muted)]">共 {leadsData.length} 条线索</span>
          <span className="text-[10px] text-[var(--muted)]">实时更新</span>
        </div>

        <div className="flex flex-col gap-3">
          {leadsData.map((lead) => (
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
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--muted)]">{lead.timeAgo}</span>
                    <button 
                      onClick={(e) => toggleFavorite(lead.id, e)}
                      className="w-6 h-6 flex items-center justify-center"
                    >
                      <Heart 
                        className={`w-4 h-4 ${favorites.includes(lead.id) 
                          ? 'text-[var(--destructive)] fill-[var(--destructive)]' 
                          : 'text-[var(--muted)]'}`} 
                      />
                    </button>
                  </div>
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
                  {lead.insuranceTypes.slice(0, 2).map((type) => (
                    <Badge key={type} variant="secondary" className="text-[10px]">{type}</Badge>
                  ))}
                  {lead.insuranceTypes.length > 2 && (
                    <span className="text-[10px] text-[var(--muted)]">+{lead.insuranceTypes.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[var(--muted)]">意向:</span>
                      <div className="flex items-center gap-0.5">
                        {getIntentStars(lead.intentLevel)}
                      </div>
                      <span className="text-[10px] text-[var(--warning)]">{lead.intentLabel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[16px] font-bold text-[var(--primary)]">{lead.price}</span>
                    <span className="text-[10px] text-[var(--muted)]">展业分</span>
                  </div>
                </div>

                {/* 卖家信息 */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-[var(--warning)] fill-[var(--warning)]" />
                      <span className="text-[10px] text-[var(--foreground)]">{lead.sellerRating}</span>
                    </div>
                    <span className="text-[10px] text-[var(--muted)]">|</span>
                    <span className="text-[10px] text-[var(--muted)]">成交 {lead.sellerDeals} 单</span>
                  </div>
                  <span className="text-[10px] text-[var(--primary)]">查看详情</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 筛选弹窗 */}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilter(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] rounded-t-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">筛选条件</h3>
              <button onClick={() => setShowFilter(false)}>
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* 区域 */}
              <div>
                <h4 className="text-[12px] font-medium text-[var(--foreground)] mb-2">区域</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.regions.map((region) => (
                    <button 
                      key={region}
                      onClick={() => setFilters({...filters, region})}
                      className={`px-3 py-1.5 rounded-full text-[10px] ${
                        filters.region === region 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* 年龄 */}
              <div>
                <h4 className="text-[12px] font-medium text-[var(--foreground)] mb-2">年龄</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.ageRanges.map((age) => (
                    <button 
                      key={age}
                      onClick={() => setFilters({...filters, ageRange: age})}
                      className={`px-3 py-1.5 rounded-full text-[10px] ${
                        filters.ageRange === age 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* 预算 */}
              <div>
                <h4 className="text-[12px] font-medium text-[var(--foreground)] mb-2">预算</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.budgets.map((budget) => (
                    <button 
                      key={budget}
                      onClick={() => setFilters({...filters, budget})}
                      className={`px-3 py-1.5 rounded-full text-[10px] ${
                        filters.budget === budget 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              {/* 险种 */}
              <div>
                <h4 className="text-[12px] font-medium text-[var(--foreground)] mb-2">险种意向</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.insuranceTypes.map((type) => (
                    <button 
                      key={type}
                      onClick={() => setFilters({...filters, insuranceType: type})}
                      className={`px-3 py-1.5 rounded-full text-[10px] ${
                        filters.insuranceType === type 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 意向等级 */}
              <div>
                <h4 className="text-[12px] font-medium text-[var(--foreground)] mb-2">意向等级</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.intentLevels.map((level) => (
                    <button 
                      key={level}
                      onClick={() => setFilters({...filters, intentLevel: level})}
                      className={`px-3 py-1.5 rounded-full text-[10px] ${
                        filters.intentLevel === level 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setFilters({
                  region: "不限",
                  ageRange: "不限",
                  budget: "不限",
                  insuranceType: "不限",
                  intentLevel: "不限",
                })}
              >
                重置
              </Button>
              <Button 
                className="flex-1"
                onClick={() => setShowFilter(false)}
              >
                确定
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 排序弹窗 */}
      {showSort && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowSort(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] rounded-t-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">排序方式</h3>
              <button onClick={() => setShowSort(false)}>
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>

            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button 
                  key={option.value}
                  onClick={() => {
                    setCurrentSort(option.value)
                    setShowSort(false)
                  }}
                  className={`w-full p-3 rounded-lg text-left text-[12px] ${
                    currentSort === option.value 
                      ? 'bg-[var(--primary-light)] text-[var(--primary)]' 
                      : 'bg-[var(--secondary)] text-[var(--foreground)]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
