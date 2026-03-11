"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin,
  Clock,
  Phone,
  User,
  Briefcase,
  DollarSign,
  Shield,
  FileText,
  PhoneCall,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Mic,
  Play,
  Pause
} from "lucide-react"
import Link from "next/link"

// 模拟订单详情
const orderDetail = {
  id: "ORD20260311001",
  leadNo: "LD20260311001",
  status: "paid",
  statusLabel: "待联系",
  customer: {
    name: "张先生",
    phone: "138-1234-5678",
    region: "北京市朝阳区",
    age: 35,
    occupation: "企业高管",
    budget: "10-20万",
    insuranceTypes: ["人寿保险", "健康保险"],
    intentLevel: "近期急需",
  },
  price: 280,
  afterSaleDeadline: "2026-03-12 10:30:00",
  remainingHours: 22,
  remainingMinutes: 35,
  createdAt: "2026-03-11 10:30:00",
  paymentTime: "2026-03-11 10:30:15",
  callRecords: [
    {
      id: 1,
      duration: "02:35",
      time: "2026-03-11 11:00",
      status: "completed",
    },
  ],
}

export function OrderDetailPage() {
  const [copied, setCopied] = useState(false)
  const [showCallDialog, setShowCallDialog] = useState(false)
  const [calling, setCalling] = useState(false)
  const [callTime, setCallTime] = useState(0)
  const [playingRecording, setPlayingRecording] = useState<number | null>(null)

  const copyPhone = () => {
    navigator.clipboard.writeText("13812345678")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const startCall = () => {
    setCalling(true)
    // 模拟通话计时
    const timer = setInterval(() => {
      setCallTime(prev => prev + 1)
    }, 1000)
    
    // 模拟30秒后挂断
    setTimeout(() => {
      clearInterval(timer)
      setCalling(false)
      setShowCallDialog(false)
      setCallTime(0)
    }, 30000)
  }

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <Header title="订单详情" />

      <div className="px-5 py-4">
        {/* 订单状态 */}
        <Card className="mb-4 overflow-hidden">
          <div className="gradient-primary p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[16px] font-semibold text-white">{orderDetail.statusLabel}</h2>
              <Badge className="bg-white/20 text-white">订单号: {orderDetail.id}</Badge>
            </div>
            {orderDetail.remainingHours > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/80" />
                <span className="text-[12px] text-white/80">
                  售后保护期剩余 {orderDetail.remainingHours}小时{orderDetail.remainingMinutes}分钟
                </span>
              </div>
            )}
          </div>
        </Card>

        {/* 客户联系方式 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-4 h-4 text-[var(--primary)]" />
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">客户联系方式</h3>
            </div>

            <div className="bg-[var(--secondary)] rounded-xl p-4 mb-4">
              <p className="text-[10px] text-[var(--muted)] mb-1">客户电话</p>
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-bold text-[var(--foreground)]">{orderDetail.customer.phone}</span>
                <button 
                  onClick={copyPhone}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[var(--card)] rounded-full"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[10px] text-[var(--primary)]">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[var(--muted)]" />
                      <span className="text-[10px] text-[var(--muted)]">复制</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1" 
                onClick={() => setShowCallDialog(true)}
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                隐私号拨打
              </Button>
              <Button variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                直接拨打
              </Button>
            </div>

            <p className="text-[10px] text-[var(--muted)] text-center mt-3">
              推荐使用隐私号拨打，保护双方隐私，自动录音存证
            </p>
          </CardContent>
        </Card>

        {/* 客户信息 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">客户信息</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--primary-light)] rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[var(--muted)]">客户姓名</p>
                  <p className="text-[12px] text-[var(--foreground)]">{orderDetail.customer.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#e6f4ff] rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#1890ff]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[var(--muted)]">所在区域</p>
                  <p className="text-[12px] text-[var(--foreground)]">{orderDetail.customer.region}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f6ffed] rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-[#52c41a]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[var(--muted)]">年龄 / 职业</p>
                  <p className="text-[12px] text-[var(--foreground)]">{orderDetail.customer.age}岁 / {orderDetail.customer.occupation}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#fff7e6] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-[#fa8c16]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[var(--muted)]">预算 / 意向</p>
                  <p className="text-[12px] text-[var(--foreground)]">{orderDetail.customer.budget} / {orderDetail.customer.intentLevel}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 通话记录 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-[var(--muted)]" />
                <h3 className="text-[14px] font-semibold text-[var(--foreground)]">通话记录</h3>
              </div>
              <Badge variant="secondary">{orderDetail.callRecords.length}条</Badge>
            </div>

            {orderDetail.callRecords.length > 0 ? (
              <div className="space-y-2">
                {orderDetail.callRecords.map((record) => (
                  <div 
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-[var(--secondary)] rounded-lg"
                  >
                    <div>
                      <p className="text-[12px] text-[var(--foreground)]">通话时长: {record.duration}</p>
                      <p className="text-[10px] text-[var(--muted)]">{record.time}</p>
                    </div>
                    <button 
                      onClick={() => setPlayingRecording(playingRecording === record.id ? null : record.id)}
                      className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center"
                    >
                      {playingRecording === record.id ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-[var(--muted)] text-center py-4">暂无通话记录</p>
            )}
          </CardContent>
        </Card>

        {/* 订单信息 */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">订单信息</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">线索编号</span>
                <span className="text-[12px] text-[var(--foreground)]">{orderDetail.leadNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">购买金额</span>
                <span className="text-[12px] text-[var(--primary)] font-semibold">{orderDetail.price}展业分</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">下单时间</span>
                <span className="text-[12px] text-[var(--foreground)]">{orderDetail.createdAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">支付时间</span>
                <span className="text-[12px] text-[var(--foreground)]">{orderDetail.paymentTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--muted)]">售后截止</span>
                <span className="text-[12px] text-[var(--warning)]">{orderDetail.afterSaleDeadline}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 售后提示 */}
        {orderDetail.remainingHours > 0 && (
          <Card className="border-l-4 border-l-[var(--warning)]">
            <CardContent className="py-3 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] text-[var(--foreground)] font-medium">售后提示</p>
                <p className="text-[10px] text-[var(--muted)] mt-1">
                  如遇空号、错号等问题，请在售后保护期内申请退款
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] border-t border-[var(--border)] p-4 safe-area-inset-bottom">
        <div className="flex gap-3">
          {orderDetail.remainingHours > 0 && (
            <Link href={`/complaints/new?orderId=${orderDetail.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                申请售后
              </Button>
            </Link>
          )}
          <Button className="flex-1" onClick={() => setShowCallDialog(true)}>
            <PhoneCall className="w-4 h-4 mr-2" />
            联系客户
          </Button>
        </div>
      </div>

      {/* 拨打电话弹窗 */}
      {showCallDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">
          <div className="bg-[var(--card)] rounded-2xl w-full max-w-[335px] overflow-hidden">
            {!calling ? (
              <div className="p-6 text-center">
                <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneCall className="w-10 h-10 text-[var(--primary)]" />
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">隐私号拨打</h3>
                <p className="text-[12px] text-[var(--muted)] mb-4">
                  将通过平台虚拟号拨打客户，保护双方隐私
                </p>
                <p className="text-[12px] text-[var(--muted)] mb-6">
                  虚拟号: 010-8888-XXXX
                </p>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowCallDialog(false)}
                  >
                    取消
                  </Button>
                  <Button className="flex-1" onClick={startCall}>
                    开始拨打
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-[#1a1a1a] p-6 text-center">
                <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <PhoneCall className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-[16px] font-semibold text-white mb-2">{orderDetail.customer.name}</h3>
                <p className="text-[24px] font-bold text-[var(--primary)] mb-2">
                  {formatCallTime(callTime)}
                </p>
                <p className="text-[12px] text-white/60 mb-2">正在通话中...</p>
                <div className="flex items-center justify-center gap-1 mb-6">
                  <Mic className="w-3 h-3 text-[var(--destructive)]" />
                  <span className="text-[10px] text-[var(--destructive)]">正在录音</span>
                </div>
                
                <button 
                  onClick={() => {
                    setCalling(false)
                    setShowCallDialog(false)
                    setCallTime(0)
                  }}
                  className="w-16 h-16 bg-[var(--destructive)] rounded-full flex items-center justify-center mx-auto"
                >
                  <Phone className="w-8 h-8 text-white rotate-[135deg]" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
