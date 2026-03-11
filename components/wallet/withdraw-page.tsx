"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Wallet,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Calculator,
  FileText,
  Clock
} from "lucide-react"

// 模拟账户数据
const accountData = {
  incomeBalance: 2800,
  frozenBalance: 420,
  availableBalance: 2800, // 可提现金额 = 收益分 (冻结的不能提)
}

export function WithdrawPage() {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showAgreement, setShowAgreement] = useState(false)

  const withdrawAmount = parseInt(amount) || 0
  const cashAmount = withdrawAmount / 10 // 展业分转人民币 (10:1)
  const serviceFee = Math.round(cashAmount * 0.006 * 100) / 100 // 0.6% 支付通道费
  const taxFee = Math.round(cashAmount * 0.02 * 100) / 100 // 2% 税务服务费
  const actualAmount = Math.round((cashAmount - serviceFee - taxFee) * 100) / 100

  const canWithdraw = withdrawAmount >= 100 && withdrawAmount <= accountData.availableBalance

  const handleWithdraw = async () => {
    if (!canWithdraw) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header title="提现结果" showBack={false} />
        <div className="px-5 py-12 text-center">
          <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">提现申请已提交</h2>
          <p className="text-[12px] text-[var(--muted)] mb-6">
            预计1-3个工作日到账，请注意查收
          </p>

          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">提现金额</span>
                  <span className="text-[12px] text-[var(--foreground)]">{withdrawAmount}展业分</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">支付通道费</span>
                  <span className="text-[12px] text-[var(--foreground)]">-{serviceFee}元</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">税务服务费</span>
                  <span className="text-[12px] text-[var(--foreground)]">-{taxFee}元</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <span className="text-[12px] text-[var(--muted)]">实际到账</span>
                  <span className="text-[14px] text-[var(--primary)] font-bold">{actualAmount}元</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button size="full">
              查看提现记录
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
      <Header title="申请提现" />

      <div className="px-5 py-4">
        {/* 可提现余额 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-[10px] text-[var(--muted)]">可提现收益分</p>
                <p className="text-[20px] font-bold text-[var(--primary)]">{accountData.availableBalance}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-[var(--secondary)] rounded-lg">
              <Clock className="w-4 h-4 text-[var(--warning)]" />
              <span className="text-[10px] text-[var(--muted)]">
                待结算: {accountData.frozenBalance}分 (售后期内不可提现)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 提现金额 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">提现金额</h3>
            
            <div className="mb-4">
              <Input
                type="number"
                placeholder="请输入提现金额"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-[var(--muted)]">最低100展业分起提</span>
                <button 
                  onClick={() => setAmount(String(accountData.availableBalance))}
                  className="text-[10px] text-[var(--primary)]"
                >
                  全部提现
                </button>
              </div>
            </div>

            {/* 费用计算 */}
            {withdrawAmount >= 100 && (
              <div className="bg-[var(--secondary)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-4 h-4 text-[var(--muted)]" />
                  <span className="text-[12px] font-medium text-[var(--foreground)]">费用明细</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--muted)]">提现金额</span>
                    <span className="text-[12px] text-[var(--foreground)]">{cashAmount}元</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--muted)]">支付通道费 (0.6%)</span>
                    <span className="text-[12px] text-[var(--foreground)]">-{serviceFee}元</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--muted)]">税务服务费 (2%)</span>
                    <span className="text-[12px] text-[var(--foreground)]">-{taxFee}元</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <span className="text-[12px] font-medium text-[var(--foreground)]">实际到账</span>
                    <span className="text-[16px] font-bold text-[var(--primary)]">{actualAmount}元</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 收款账户 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--secondary)] rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[var(--muted)]" />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[var(--foreground)]">招商银行储蓄卡</p>
                  <p className="text-[10px] text-[var(--muted)]">尾号 6789</p>
                </div>
              </div>
              <button className="text-[12px] text-[var(--primary)]">更换</button>
            </div>
          </CardContent>
        </Card>

        {/* 提现说明 */}
        <Card className="border-l-4 border-l-[var(--warning)]">
          <CardContent className="py-3 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] text-[var(--foreground)] font-medium">提现说明</p>
              <ul className="text-[10px] text-[var(--muted)] mt-1 space-y-0.5">
                <li>提现将通过灵活用工平台代缴个人所得税</li>
                <li>预计1-3个工作日到账</li>
                <li>如有疑问请联系客服</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 协议 */}
        <div className="mt-4 flex items-start gap-2">
          <input 
            type="checkbox" 
            id="agreement" 
            className="mt-1 w-4 h-4 accent-[var(--primary)]"
            onChange={(e) => setShowAgreement(e.target.checked)}
          />
          <label htmlFor="agreement" className="text-[10px] text-[var(--muted)]">
            我已阅读并同意
            <span className="text-[var(--primary)]">《个人众包服务协议》</span>
            ，了解并接受预扣费用机制
          </label>
        </div>
      </div>

      {/* 底部确认 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] border-t border-[var(--border)] p-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] text-[var(--muted)]">实际到账</span>
          <div className="text-right">
            <span className="text-[20px] font-bold text-[var(--primary)]">
              {withdrawAmount >= 100 ? actualAmount : 0}
            </span>
            <span className="text-[12px] text-[var(--muted)]">元</span>
          </div>
        </div>
        <Button 
          size="full" 
          loading={loading}
          disabled={!canWithdraw || !showAgreement}
          onClick={handleWithdraw}
        >
          确认提现
        </Button>
      </div>
    </div>
  )
}
