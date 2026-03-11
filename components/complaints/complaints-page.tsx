"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  FileText
} from "lucide-react"
import Link from "next/link"

// 模拟申诉数据
const complaintsData = [
  {
    id: "COMP20260311001",
    orderId: "ORD20260311001",
    type: "hard",
    typeLabel: "硬性错误",
    errorType: "空号/停机",
    status: "passed",
    statusLabel: "已通过",
    refundAmount: 280,
    createdAt: "2026-03-11 15:30",
    handleTime: "2026-03-11 15:30",
  },
  {
    id: "COMP20260310002",
    orderId: "ORD20260310002",
    type: "soft",
    typeLabel: "主观错误",
    errorType: "意向不符",
    status: "processing",
    statusLabel: "处理中",
    refundAmount: 350,
    createdAt: "2026-03-10 10:00",
    handleTime: null,
  },
  {
    id: "COMP20260309003",
    orderId: "ORD20260309003",
    type: "hard",
    typeLabel: "硬性错误",
    errorType: "错号/非本人",
    status: "rejected",
    statusLabel: "已驳回",
    refundAmount: 0,
    createdAt: "2026-03-09 14:00",
    handleTime: "2026-03-09 14:05",
  },
]

const statusColors: Record<string, "primary" | "success" | "warning" | "destructive" | "secondary"> = {
  processing: "warning",
  passed: "success",
  rejected: "destructive",
  partial: "primary",
}

const statusIcons: Record<string, React.ElementType> = {
  processing: Clock,
  passed: CheckCircle2,
  rejected: XCircle,
  partial: AlertCircle,
}

export function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="申诉记录" />

      <div className="px-5 py-4">
        {complaintsData.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-[var(--muted)] mx-auto mb-4" />
            <p className="text-[14px] text-[var(--muted)]">暂无申诉记录</p>
          </div>
        ) : (
          <div className="space-y-3">
            {complaintsData.map((complaint) => {
              const StatusIcon = statusIcons[complaint.status]
              return (
                <Link key={complaint.id} href={`/complaints/${complaint.id}`}>
                  <Card className="p-4 active-scale">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] text-[var(--muted)]">申诉编号: {complaint.id}</span>
                      <Badge variant={statusColors[complaint.status]}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {complaint.statusLabel}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[var(--muted)]">申诉类型</span>
                        <span className="text-[12px] text-[var(--foreground)]">{complaint.typeLabel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[var(--muted)]">错误类型</span>
                        <span className="text-[12px] text-[var(--foreground)]">{complaint.errorType}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-[var(--muted)]">退款金额</span>
                        <span className={`text-[12px] font-semibold ${
                          complaint.status === "passed" ? "text-[var(--primary)]" : "text-[var(--muted)]"
                        }`}>
                          {complaint.status === "passed" ? `${complaint.refundAmount}展业分` : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                      <span className="text-[10px] text-[var(--muted)]">提交时间: {complaint.createdAt}</span>
                      <div className="flex items-center gap-1 text-[var(--primary)]">
                        <span className="text-[10px]">查看详情</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
