"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Star, 
  Zap, 
  Heart, 
  Share2,
  User,
  Briefcase,
  DollarSign,
  Target,
  FileText,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react"

// 模拟线索详情
const leadDetail = {
  id: "1",
  leadNo: "LD20260311001",
  region: "北京市朝阳区",
  age: 35,
  occupation: "企业高管",
  company: "某科技公司",
  budget: "15万元",
  budgetRange: "10-20万",
  intentLevel: 4,
  intentLabel: "近期急需",
  insuranceTypes: ["人寿保险", "健康保险"],
  description: "客户为35岁企业高管，年收入约80万，已有基础医疗保险，现考虑补充重疾险和寿险，预算10-20万，预计1个月内购买，已有多家保险公司接触过。",
  price: 280,
  aiScore: 88,
  aiScoreLabel: "优秀",
  recommendPriceMin: 250,
  recommendPriceMax: 320,
  avgPrice: 265,
  priceCompetitive: 4,
  seller: {
    creditLevel: "S",
    creditScore: 95,
    rating: 4.9,
    deals: 156,
    goodRate: 98,
    afterSaleRate: 2,
  },
  createdAt: "2小时前",
  isHot: true,
}

// 获取意向等级星星
function getIntentStars(level: number) {
  return Array(4).fill(0).map((_, i) => (
    <Star 
      key={i} 
      className={`w-4 h-4 ${i < level ? 'text-[var(--warning)] fill-[var(--warning)]' : 'text-[var(--border)]'}`} 
    />
  ))
}

export function LeadDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  const handlePurchase = async () => {
    // 模拟购买
    await new Promise(resolve => setTimeout(resolve, 1000))
    setPurchaseSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <Header 
        title="线索详情" 
        rightContent={
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite 
                  ? 'text-[var(--destructive)] fill-[var(--destructive)]' 
                  : 'text-[var(--foreground)]'}`} 
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-[var(--foreground)]" />
            </button>
          </div>
        }
      />

      <div className="px-5 py-4">
        {/* 标签 & 编号 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {leadDetail.isHot && (
              <Badge variant="destructive" className="gap-0.5">
                <Zap className="w-2.5 h-2.5" />
                热门
              </Badge>
            )}
            <Badge variant="primary">AI评分 {leadDetail.aiScore}</Badge>
          </div>
          <span className="text-[10px] text-[var(--muted)]">编号: {leadDetail.leadNo}</span>
        </div>

        {/* 客户画像 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">客户画像</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--primary-light)] rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--muted)]">所在区域</p>
                  <p className="text-[12px] text-[var(--foreground)]">{leadDetail.region}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#e6f4ff] rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-[#1890ff]" />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--muted)]">年龄</p>
                  <p className="text-[12px] text-[var(--foreground)]">{leadDetail.age}岁</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#f6ffed] rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-[#52c41a]" />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--muted)]">职业</p>
                  <p className="text-[12px] text-[var(--foreground)]">{leadDetail.occupation}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#fff7e6] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-[#fa8c16]" />
                </div>
                <div>
                  <p className="text-[10px] text-[var(--muted)]">预计预算</p>
                  <p className="text-[12px] text-[var(--foreground)]">{leadDetail.budget}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[var(--muted)]" />
                <span className="text-[12px] font-medium text-[var(--foreground)]">险种意向</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {leadDetail.insuranceTypes.map((type) => (
                  <Badge key={type} variant="secondary">{type}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[var(--muted)]">意向等级:</span>
                  <div className="flex items-center gap-0.5">
                    {getIntentStars(leadDetail.intentLevel)}
                  </div>
                </div>
                <Badge variant="warning">{leadDetail.intentLabel}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 意向描述 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[var(--muted)]" />
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">意向描述</h3>
            </div>
            <p className="text-[12px] text-[var(--foreground)] leading-relaxed">
              {leadDetail.description}
            </p>
          </CardContent>
        </Card>

        {/* AI价值评估 */}
        <Card className="mb-4 border-l-4 border-l-[var(--primary)]">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--primary)]" />
                <h3 className="text-[14px] font-semibold text-[var(--foreground)]">AI价值评估</h3>
              </div>
              <Badge variant="primary">{leadDetail.aiScoreLabel}</Badge>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] text-[var(--muted)]">线索评分</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--primary)] rounded-full"
                    style={{ width: `${leadDetail.aiScore}%` }}
                  />
                </div>
                <span className="text-[14px] font-bold text-[var(--primary)]">{leadDetail.aiScore}分</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--muted)]">推荐定价区间</span>
                <span className="text-[12px] text-[var(--foreground)]">
                  {leadDetail.recommendPriceMin}-{leadDetail.recommendPriceMax}展业分
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--muted)]">同类线索均价</span>
                <span className="text-[12px] text-[var(--foreground)]">{leadDetail.avgPrice}展业分</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--muted)]">价格竞争力</span>
                <div className="flex items-center gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < leadDetail.priceCompetitive 
                        ? 'text-[var(--warning)] fill-[var(--warning)]' 
                        : 'text-[var(--border)]'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 卖家信息 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-[var(--muted)]" />
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">卖家信息</h3>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <span className="text-[14px] font-bold text-white">{leadDetail.seller.creditLevel}</span>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[var(--foreground)]">优质卖家</p>
                  <p className="text-[10px] text-[var(--muted)]">信用分 {leadDetail.seller.creditScore}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <Star className="w-4 h-4 text-[var(--warning)] fill-[var(--warning)]" />
                <span className="text-[14px] font-bold text-[var(--foreground)]">{leadDetail.seller.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-[var(--secondary)] rounded-lg">
                <p className="text-[14px] font-bold text-[var(--foreground)]">{leadDetail.seller.deals}</p>
                <p className="text-[10px] text-[var(--muted)]">成交单数</p>
              </div>
              <div className="text-center p-2 bg-[var(--secondary)] rounded-lg">
                <p className="text-[14px] font-bold text-[var(--primary)]">{leadDetail.seller.goodRate}%</p>
                <p className="text-[10px] text-[var(--muted)]">好评率</p>
              </div>
              <div className="text-center p-2 bg-[var(--secondary)] rounded-lg">
                <p className="text-[14px] font-bold text-[var(--foreground)]">{leadDetail.seller.afterSaleRate}%</p>
                <p className="text-[10px] text-[var(--muted)]">售后率</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 购买保障 */}
        <Card>
          <CardContent className="py-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-3">购买保障</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-[12px] text-[var(--foreground)]">24小时售后保护期</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-[12px] text-[var(--foreground)]">空号/错号自动退款</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-[12px] text-[var(--foreground)]">隐私号外呼保护</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-[12px] text-[var(--foreground)]">通话录音存证</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部购买栏 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] border-t border-[var(--border)] p-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[24px] font-bold text-[var(--primary)]">{leadDetail.price}</span>
              <span className="text-[12px] text-[var(--muted)]">展业分</span>
            </div>
            <p className="text-[10px] text-[var(--muted)]">上架时间: {leadDetail.createdAt}</p>
          </div>
          <Button size="lg" onClick={() => setShowPurchaseModal(true)}>
            立即购买
          </Button>
        </div>
      </div>

      {/* 购买确认弹窗 */}
      {showPurchaseModal && !purchaseSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">
          <div className="bg-[var(--card)] rounded-2xl w-full max-w-[335px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-[var(--foreground)]">确认购买</h3>
              <button onClick={() => setShowPurchaseModal(false)}>
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">线索编号</span>
                <span className="text-[12px] text-[var(--foreground)]">{leadDetail.leadNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">客户区域</span>
                <span className="text-[12px] text-[var(--foreground)]">{leadDetail.region}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">意向等级</span>
                <span className="text-[12px] text-[var(--warning)]">{leadDetail.intentLabel}</span>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">购买价格</span>
                  <span className="text-[16px] font-bold text-[var(--primary)]">{leadDetail.price}展业分</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[12px] text-[var(--muted)]">当前余额</span>
                  <span className="text-[12px] text-[var(--foreground)]">1,500展业分</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--secondary)] rounded-lg p-3 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-[var(--foreground)]">重要提示:</p>
                  <ul className="text-[10px] text-[var(--muted)] mt-1 space-y-0.5">
                    <li>购买后立即解锁联系方式</li>
                    <li>售后保护期: 24小时</li>
                    <li>24小时内如遇问题可申请退款</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowPurchaseModal(false)}
              >
                取消
              </Button>
              <Button 
                className="flex-1"
                onClick={handlePurchase}
              >
                确认购买
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 购买成功弹窗 */}
      {purchaseSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">
          <div className="bg-[var(--card)] rounded-2xl w-full max-w-[335px] p-5 text-center">
            <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[var(--primary)]" />
            </div>
            
            <h3 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">购买成功!</h3>
            <p className="text-[12px] text-[var(--muted)] mb-4">真实联系方式已解锁</p>

            <div className="bg-[var(--secondary)] rounded-lg p-4 mb-4">
              <p className="text-[10px] text-[var(--muted)] mb-1">客户电话</p>
              <p className="text-[20px] font-bold text-[var(--foreground)]">138-1234-5678</p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-[var(--warning)]" />
              <span className="text-[12px] text-[var(--warning)]">售后保护期: 24小时</span>
            </div>

            <div className="space-y-3">
              <Button size="full">
                立即联系客户
              </Button>
              <Button size="full" variant="outline">
                查看订单
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
