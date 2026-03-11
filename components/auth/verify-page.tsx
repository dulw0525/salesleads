"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ShieldCheck, 
  User, 
  CreditCard, 
  Smartphone,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

type Step = "info" | "code" | "success"

export function VerifyPage() {
  const [step, setStep] = useState<Step>("info")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [formData, setFormData] = useState({
    realName: "",
    idCard: "",
    phone: "",
    code: ""
  })

  const handleSendCode = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSubmitInfo = async () => {
    if (!formData.realName || !formData.idCard || !formData.phone) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    handleSendCode()
    setStep("code")
  }

  const handleVerify = async () => {
    if (!formData.code) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setStep("success")
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="实名认证" />
      
      <div className="px-5 py-6">
        {/* 步骤指示器 */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium ${
              step === "info" ? "bg-[var(--primary)] text-white" : "bg-[var(--primary)] text-white"
            }`}>
              {step === "info" ? "1" : <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div className={`w-12 h-0.5 ${step !== "info" ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium ${
              step === "code" ? "bg-[var(--primary)] text-white" : 
              step === "success" ? "bg-[var(--primary)] text-white" : "bg-[var(--border)] text-[var(--muted)]"
            }`}>
              {step === "success" ? <CheckCircle2 className="w-4 h-4" /> : "2"}
            </div>
            <div className={`w-12 h-0.5 ${step === "success" ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium ${
              step === "success" ? "bg-[var(--primary)] text-white" : "bg-[var(--border)] text-[var(--muted)]"
            }`}>
              3
            </div>
          </div>
        </div>

        {step === "info" && (
          <>
            {/* 提示信息 */}
            <Card className="mb-6 border-l-4 border-l-[var(--primary)]">
              <CardContent className="py-3 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] text-[var(--foreground)] font-medium">安全认证保障</p>
                  <p className="text-[10px] text-[var(--muted)] mt-1">
                    您的身份信息将使用银行级加密存储，仅用于交易安全验证，不会泄露给第三方
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 表单 */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[var(--muted)]" />
                  <span className="text-[12px] font-medium text-[var(--foreground)]">真实姓名</span>
                </div>
                <Input 
                  placeholder="请输入身份证上的姓名"
                  value={formData.realName}
                  onChange={(e) => setFormData({...formData, realName: e.target.value})}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-[var(--muted)]" />
                  <span className="text-[12px] font-medium text-[var(--foreground)]">身份证号</span>
                </div>
                <Input 
                  placeholder="请输入18位身份证号码"
                  maxLength={18}
                  value={formData.idCard}
                  onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-[var(--muted)]" />
                  <span className="text-[12px] font-medium text-[var(--foreground)]">手机号码</span>
                </div>
                <Input 
                  type="tel"
                  placeholder="请输入11位手机号"
                  maxLength={11}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <Button 
              size="full" 
              className="mt-8"
              loading={loading}
              onClick={handleSubmitInfo}
              disabled={!formData.realName || !formData.idCard || !formData.phone}
            >
              下一步，获取验证码
            </Button>

            <p className="text-[10px] text-[var(--muted)] text-center mt-4">
              提交即表示您同意
              <span className="text-[var(--primary)]">《用户服务协议》</span>
              和
              <span className="text-[var(--primary)]">《隐私政策》</span>
            </p>
          </>
        )}

        {step === "code" && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-[16px] font-semibold text-[var(--foreground)]">输入验证码</h2>
              <p className="text-[12px] text-[var(--muted)] mt-2">
                验证码已发送至 {formData.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}
              </p>
            </div>

            <div className="flex gap-3 mb-6">
              <Input 
                type="tel"
                placeholder="请输入6位验证码"
                maxLength={6}
                className="flex-1"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
              <Button 
                variant="outline" 
                disabled={countdown > 0}
                onClick={handleSendCode}
                className="w-24 flex-shrink-0"
              >
                {countdown > 0 ? `${countdown}s` : "重新发送"}
              </Button>
            </div>

            <Button 
              size="full"
              loading={loading}
              onClick={handleVerify}
              disabled={formData.code.length !== 6}
            >
              确认验证
            </Button>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[var(--primary)]" />
            </div>
            <h2 className="text-[16px] font-semibold text-[var(--foreground)]">实名认证成功</h2>
            <p className="text-[12px] text-[var(--muted)] mt-2">
              恭喜您已完成实名认证，现在可以进入交易大厅
            </p>

            <div className="mt-8 space-y-3">
              <Button size="full">
                进入线索大厅
              </Button>
              <Button size="full" variant="outline">
                返回首页
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
