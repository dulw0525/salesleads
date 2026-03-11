"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Camera,
  Shield,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw
} from "lucide-react"

type Status = "ready" | "scanning" | "success" | "failed"

export function FaceVerifyPage() {
  const [status, setStatus] = useState<Status>("ready")
  const [instruction, setInstruction] = useState("请将面部置于框内")

  const startScan = async () => {
    setStatus("scanning")
    setInstruction("请正对屏幕")
    await new Promise(resolve => setTimeout(resolve, 1500))
    setInstruction("请缓慢眨眼")
    await new Promise(resolve => setTimeout(resolve, 1500))
    setInstruction("请缓慢转头")
    await new Promise(resolve => setTimeout(resolve, 1500))
    setInstruction("验证中...")
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStatus("success")
  }

  const retry = () => {
    setStatus("ready")
    setInstruction("请将面部置于框内")
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="人脸识别" />

      <div className="px-5 py-6">
        {/* 提示卡片 */}
        <Card className="mb-6 border-l-4 border-l-[var(--info)]">
          <CardContent className="py-3 flex items-start gap-3">
            <Shield className="w-5 h-5 text-[var(--info)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] text-[var(--foreground)] font-medium">高级认证说明</p>
              <p className="text-[10px] text-[var(--muted)] mt-1">
                人脸识别认证用于发布线索和提现操作，请确保面部清晰、光线充足
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 扫描区域 */}
        <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden aspect-[3/4] mb-6">
          {/* 模拟摄像头画面 */}
          <div className="absolute inset-0 flex items-center justify-center">
            {status === "ready" && (
              <div className="text-center">
                <Camera className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-[12px] text-white/60">点击下方按钮开始人脸识别</p>
              </div>
            )}
            
            {status === "scanning" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* 扫描框 */}
                <div className="relative w-48 h-60 border-2 border-[var(--primary)] rounded-[60px]">
                  {/* 扫描动画线 */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--primary)] animate-pulse" />
                  {/* 角标 */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-[var(--primary)] rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-[var(--primary)] rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-[var(--primary)] rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-[var(--primary)] rounded-br-xl" />
                </div>
                {/* 提示文字 */}
                <div className="absolute bottom-20 left-0 right-0 text-center">
                  <p className="text-[14px] text-white font-medium">{instruction}</p>
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <p className="text-[14px] text-white font-medium">人脸识别成功</p>
              </div>
            )}

            {status === "failed" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-[var(--destructive)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-10 h-10 text-white" />
                </div>
                <p className="text-[14px] text-white font-medium">识别失败，请重试</p>
              </div>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        {status === "ready" && (
          <Button size="full" onClick={startScan}>
            <Eye className="w-4 h-4 mr-2" />
            开始人脸识别
          </Button>
        )}

        {status === "scanning" && (
          <Button size="full" disabled>
            识别中...
          </Button>
        )}

        {status === "success" && (
          <div className="space-y-3">
            <Button size="full">
              继续操作
            </Button>
            <Button size="full" variant="outline">
              返回
            </Button>
          </div>
        )}

        {status === "failed" && (
          <Button size="full" onClick={retry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            重新识别
          </Button>
        )}

        {/* 识别小贴士 */}
        <div className="mt-6">
          <h3 className="text-[12px] font-medium text-[var(--foreground)] mb-3">识别小贴士</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <span className="text-[10px] text-[var(--primary)]">1</span>
              </div>
              <span className="text-[10px] text-[var(--muted)]">请确保光线充足，避免逆光</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <span className="text-[10px] text-[var(--primary)]">2</span>
              </div>
              <span className="text-[10px] text-[var(--muted)]">请勿佩戴帽子、墨镜等遮挡物</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <span className="text-[10px] text-[var(--primary)]">3</span>
              </div>
              <span className="text-[10px] text-[var(--muted)]">请保持面部在框内并正对屏幕</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
