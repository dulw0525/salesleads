"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Wallet,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

// 充值档位
const rechargeOptions = [
  { amount: 50, points: 500 },
  { amount: 100, points: 1000 },
  { amount: 200, points: 2000 },
  { amount: 500, points: 5000 },
  { amount: 1000, points: 10000 },
]

// 支付方式
const paymentMethods = [
  { value: "wechat", label: "微信支付", icon: "/wechat-pay.png" },
  { value: "alipay", label: "支付宝", icon: "/alipay.png" },
]

export function RechargePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const currentAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0)
  const currentPoints = currentAmount * 10

  const handleRecharge = async () => {
    if (currentAmount < 10) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header title="充值结果" showBack={false} />
        <div className="px-5 py-12 text-center">
          <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">充值成功!</h2>
          <p className="text-[12px] text-[var(--muted)] mb-6">
            {currentPoints}展业分已到账
          </p>

          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">充值金额</span>
                  <span className="text-[12px] text-[var(--foreground)]">{currentAmount}元</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">到账展业分</span>
                  <span className="text-[14px] text-[var(--primary)] font-bold">{currentPoints}分</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">支付方式</span>
                  <span className="text-[12px] text-[var(--foreground)]">
                    {paymentMethods.find(p => p.value === paymentMethod)?.label}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button size="full">
              去购买线索
            </Button>
            <Button size="full" variant="outline">
              返回钱包
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <Header title="账户充值" />

      <div className="px-5 py-4">
        {/* 当前余额 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-[10px] text-[var(--muted)]">当前充值分余额</p>
                <p className="text-[20px] font-bold text-[var(--foreground)]">1,500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 充值金额选择 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">选择充值金额</h3>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {rechargeOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => {
                    setSelectedAmount(option.amount)
                    setCustomAmount("")
                  }}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedAmount === option.amount
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--secondary)] text-[var(--foreground)]"
                  }`}
                >
                  <p className="text-[14px] font-bold">{option.amount}元</p>
                  <p className={`text-[10px] mt-1 ${
                    selectedAmount === option.amount ? "text-white/80" : "text-[var(--muted)]"
                  }`}>
                    {option.points}展业分
                  </p>
                </button>
              ))}
            </div>

            <div>
              <label className="text-[12px] text-[var(--muted)] mb-2 block">自定义金额</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="请输入金额"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                />
                <span className="text-[12px] text-[var(--muted)]">元</span>
              </div>
              <p className="text-[10px] text-[var(--muted)] mt-1">最低充值10元，1元=10展业分</p>
            </div>
          </CardContent>
        </Card>

        {/* 支付方式 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">选择支付方式</h3>
            
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.value}
                  onClick={() => setPaymentMethod(method.value)}
                  className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                    paymentMethod === method.value
                      ? "bg-[var(--primary-light)] border-2 border-[var(--primary)]"
                      : "bg-[var(--secondary)] border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className={`text-[12px] font-bold ${
                        method.value === "wechat" ? "text-[#07C160]" : "text-[#1677FF]"
                      }`}>
                        {method.value === "wechat" ? "微" : "支"}
                      </span>
                    </div>
                    <span className="text-[12px] text-[var(--foreground)]">{method.label}</span>
                  </div>
                  {paymentMethod === method.value && (
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 充值说明 */}
        <Card className="border-l-4 border-l-[var(--info)]">
          <CardContent className="py-3 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[var(--info)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] text-[var(--foreground)] font-medium">充值说明</p>
              <ul className="text-[10px] text-[var(--muted)] mt-1 space-y-0.5">
                <li>充值分仅用于购买线索，不可提现</li>
                <li>充值即时到账，如遇延迟请联系客服</li>
                <li>充值后不支持退款</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部确认 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] border-t border-[var(--border)] p-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] text-[var(--muted)]">充值金额</span>
          <div className="text-right">
            <span className="text-[20px] font-bold text-[var(--primary)]">{currentAmount || 0}</span>
            <span className="text-[12px] text-[var(--muted)]">元</span>
            <p className="text-[10px] text-[var(--muted)]">可获得 {currentPoints || 0} 展业分</p>
          </div>
        </div>
        <Button 
          size="full" 
          loading={loading}
          disabled={currentAmount < 10}
          onClick={handleRecharge}
        >
          确认充值
        </Button>
      </div>
    </div>
  )
}
