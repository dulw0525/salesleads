"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  AlertCircle,
  PhoneOff,
  UserX,
  FileX,
  HelpCircle,
  Upload,
  X,
  CheckCircle2,
  Clock,
  Zap,
  FileText,
  Image as ImageIcon
} from "lucide-react"

type ComplaintType = "hard" | "soft" | null
type HardErrorType = "empty" | "wrong" | "unreachable" | null
type Step = "type" | "detail" | "submit" | "processing" | "result"

export function NewComplaintPage() {
  const [step, setStep] = useState<Step>("type")
  const [complaintType, setComplaintType] = useState<ComplaintType>(null)
  const [hardErrorType, setHardErrorType] = useState<HardErrorType>(null)
  const [description, setDescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<"success" | "failed" | null>(null)

  const handleSubmit = async () => {
    setStep("processing")
    setProcessing(true)
    
    // 模拟处理过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setProcessing(false)
    setResult("success")
    setStep("result")
  }

  const hardErrorTypes = [
    { value: "empty", label: "空号/停机", icon: PhoneOff, desc: "拨打提示已停机或空号" },
    { value: "wrong", label: "错号/非本人", icon: UserX, desc: "接听者非目标客户" },
    { value: "unreachable", label: "无法接通", icon: FileX, desc: "多次拨打始终无法接通" },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <Header title="申请售后" />

      <div className="px-5 py-4">
        {/* 进度指示 */}
        {step !== "result" && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium ${
              step === "type" ? "bg-[var(--primary)] text-white" : "bg-[var(--primary)] text-white"
            }`}>
              {step === "type" ? "1" : <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div className={`w-8 h-0.5 ${step !== "type" ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium ${
              step === "detail" ? "bg-[var(--primary)] text-white" : 
              step === "submit" || step === "processing" ? "bg-[var(--primary)] text-white" : 
              "bg-[var(--border)] text-[var(--muted)]"
            }`}>
              {step === "submit" || step === "processing" ? <CheckCircle2 className="w-4 h-4" /> : "2"}
            </div>
            <div className={`w-8 h-0.5 ${step === "submit" || step === "processing" ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium ${
              step === "submit" || step === "processing" ? "bg-[var(--primary)] text-white" : "bg-[var(--border)] text-[var(--muted)]"
            }`}>
              3
            </div>
          </div>
        )}

        {/* Step 1: 选择申诉类型 */}
        {step === "type" && (
          <div className="space-y-4">
            <h2 className="text-[14px] font-semibold text-[var(--foreground)] text-center mb-4">请选择申诉类型</h2>

            <button
              onClick={() => setComplaintType("hard")}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                complaintType === "hard" 
                  ? "bg-[var(--primary-light)] border-2 border-[var(--primary)]" 
                  : "bg-[var(--card)] border-2 border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  complaintType === "hard" ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"
                }`}>
                  <Zap className={`w-5 h-5 ${complaintType === "hard" ? "text-white" : "text-[var(--muted)]"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-semibold text-[var(--foreground)]">硬性错误</span>
                    <Badge variant="success" className="text-[10px]">秒级自动处理</Badge>
                  </div>
                  <ul className="text-[10px] text-[var(--muted)] space-y-0.5">
                    <li>空号/停机</li>
                    <li>错号/非本人接听</li>
                    <li>号码完全无法接通</li>
                  </ul>
                </div>
                {complaintType === "hard" && (
                  <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                )}
              </div>
            </button>

            <button
              onClick={() => setComplaintType("soft")}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                complaintType === "soft" 
                  ? "bg-[var(--primary-light)] border-2 border-[var(--primary)]" 
                  : "bg-[var(--card)] border-2 border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  complaintType === "soft" ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"
                }`}>
                  <FileText className={`w-5 h-5 ${complaintType === "soft" ? "text-white" : "text-[var(--muted)]"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-semibold text-[var(--foreground)]">主观错误</span>
                    <Badge variant="warning" className="text-[10px]">人工仲裁 3-5工作日</Badge>
                  </div>
                  <ul className="text-[10px] text-[var(--muted)] space-y-0.5">
                    <li>客户意向与描述严重不符</li>
                    <li>客户已有多份保单无购买需求</li>
                    <li>其他影响成交的重大信息不符</li>
                  </ul>
                </div>
                {complaintType === "soft" && (
                  <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                )}
              </div>
            </button>

            <Button 
              size="full" 
              className="mt-6"
              disabled={!complaintType}
              onClick={() => setStep("detail")}
            >
              下一步
            </Button>
          </div>
        )}

        {/* Step 2: 填写详情 */}
        {step === "detail" && (
          <div className="space-y-4">
            {complaintType === "hard" ? (
              <>
                <h2 className="text-[14px] font-semibold text-[var(--foreground)] text-center mb-4">请选择错误类型</h2>

                <div className="space-y-3">
                  {hardErrorTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setHardErrorType(type.value as HardErrorType)}
                      className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all ${
                        hardErrorType === type.value 
                          ? "bg-[var(--primary-light)] border-2 border-[var(--primary)]" 
                          : "bg-[var(--card)] border-2 border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        hardErrorType === type.value ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"
                      }`}>
                        <type.icon className={`w-5 h-5 ${hardErrorType === type.value ? "text-white" : "text-[var(--muted)]"}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[12px] font-medium text-[var(--foreground)]">{type.label}</p>
                        <p className="text-[10px] text-[var(--muted)]">{type.desc}</p>
                      </div>
                      {hardErrorType === type.value && (
                        <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                      )}
                    </button>
                  ))}
                </div>

                <Card className="border-l-4 border-l-[var(--info)]">
                  <CardContent className="py-3 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[var(--info)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[12px] text-[var(--foreground)] font-medium">自动核实说明</p>
                      <p className="text-[10px] text-[var(--muted)] mt-1">
                        系统将自动调用运营商接口核实号码状态，核实成功后秒级退款
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <h2 className="text-[14px] font-semibold text-[var(--foreground)] text-center mb-4">填写申诉详情</h2>

                <Card>
                  <CardContent className="py-4">
                    <div className="mb-4">
                      <label className="text-[12px] font-medium text-[var(--foreground)] mb-2 block">
                        申诉原因 <span className="text-[var(--destructive)]">*</span>
                      </label>
                      <textarea
                        placeholder="请详细描述客户实际情况与线索描述的差异..."
                        className="w-full h-28 p-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[12px] placeholder:text-[var(--muted)] outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <p className="text-[10px] text-[var(--muted)] text-right mt-1">{description.length}/500</p>
                    </div>

                    <div>
                      <label className="text-[12px] font-medium text-[var(--foreground)] mb-2 block">
                        证据材料
                      </label>
                      <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-[var(--muted)] mx-auto mb-2" />
                        <p className="text-[12px] text-[var(--foreground)]">点击上传证据</p>
                        <p className="text-[10px] text-[var(--muted)] mt-1">支持图片、截图等，最多5张</p>
                      </div>
                      
                      {uploadedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="relative w-16 h-16 bg-[var(--secondary)] rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-[var(--muted)]" />
                              <button 
                                onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--destructive)] rounded-full flex items-center justify-center"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[var(--warning)]">
                  <CardContent className="py-3 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[12px] text-[var(--foreground)] font-medium">通话录音</p>
                      <p className="text-[10px] text-[var(--muted)] mt-1">
                        系统已自动关联您的通话录音作为证据，无需额外上传
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep("type")}>
                上一步
              </Button>
              <Button 
                className="flex-1" 
                disabled={complaintType === "hard" ? !hardErrorType : !description}
                onClick={() => setStep("submit")}
              >
                下一步
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: 确认提交 */}
        {step === "submit" && (
          <div className="space-y-4">
            <h2 className="text-[14px] font-semibold text-[var(--foreground)] text-center mb-4">确认申诉信息</h2>

            <Card>
              <CardContent className="py-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">订单编号</span>
                    <span className="text-[12px] text-[var(--foreground)]">ORD20260311001</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">申诉类型</span>
                    <Badge variant={complaintType === "hard" ? "success" : "warning"}>
                      {complaintType === "hard" ? "硬性错误" : "主观错误"}
                    </Badge>
                  </div>
                  {complaintType === "hard" && (
                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                      <span className="text-[12px] text-[var(--muted)]">错误类型</span>
                      <span className="text-[12px] text-[var(--foreground)]">
                        {hardErrorTypes.find(t => t.value === hardErrorType)?.label}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">退款金额</span>
                    <span className="text-[12px] text-[var(--primary)] font-semibold">280展业分</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[12px] text-[var(--muted)]">预计处理时间</span>
                    <span className="text-[12px] text-[var(--foreground)]">
                      {complaintType === "hard" ? "秒级自动处理" : "3-5个工作日"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep("detail")}>
                上一步
              </Button>
              <Button className="flex-1" onClick={handleSubmit}>
                提交申诉
              </Button>
            </div>
          </div>
        )}

        {/* 处理中 */}
        {step === "processing" && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Zap className="w-10 h-10 text-[var(--primary)]" />
            </div>
            <h2 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">正在核实中</h2>
            <p className="text-[12px] text-[var(--muted)]">
              {complaintType === "hard" ? "正在调用运营商接口核实号码状态..." : "正在提交申诉材料..."}
            </p>
          </div>
        )}

        {/* 结果页 */}
        {step === "result" && (
          <div className="text-center py-12">
            {result === "success" ? (
              <>
                <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[var(--primary)]" />
                </div>
                <h2 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">
                  {complaintType === "hard" ? "申诉成功，已自动退款" : "申诉已提交"}
                </h2>
                <p className="text-[12px] text-[var(--muted)] mb-6">
                  {complaintType === "hard" 
                    ? "280展业分已退回您的充值账户" 
                    : "预计3-5个工作日内处理完成，请耐心等待"}
                </p>

                {complaintType === "hard" ? (
                  <Card className="mb-6">
                    <CardContent className="py-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[var(--muted)]">退款金额</span>
                          <span className="text-[14px] text-[var(--primary)] font-bold">280展业分</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[var(--muted)]">退回账户</span>
                          <span className="text-[12px] text-[var(--foreground)]">充值分账户</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[var(--muted)]">处理时间</span>
                          <span className="text-[12px] text-[var(--foreground)]">2026-03-11 15:30:25</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="mb-6">
                    <CardContent className="py-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[var(--muted)]">申诉编号</span>
                          <span className="text-[12px] text-[var(--foreground)]">COMP20260311001</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[var(--muted)]">当前状态</span>
                          <Badge variant="warning">待处理</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[var(--muted)]">卖家申诉期</span>
                          <span className="text-[12px] text-[var(--foreground)]">48小时</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-3">
                  <Button size="full">
                    查看申诉记录
                  </Button>
                  <Button size="full" variant="outline">
                    返回订单列表
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-[#fee2e2] rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="w-10 h-10 text-[var(--destructive)]" />
                </div>
                <h2 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">核实未通过</h2>
                <p className="text-[12px] text-[var(--muted)] mb-6">
                  经运营商接口核实，该号码状态正常，不符合自动退款条件
                </p>

                <div className="space-y-3">
                  <Button size="full">
                    转人工仲裁
                  </Button>
                  <Button size="full" variant="outline">
                    放弃申诉
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
