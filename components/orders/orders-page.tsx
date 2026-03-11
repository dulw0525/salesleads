"use client"

import { useState } from "react"
import { BottomNav } from "@/components/ui/bottom-nav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin,
  Clock,
  Phone,
  FileText,
  ChevronRight,
  ShoppingBag
} from "lucide-react"
import Link from "next/link"

// 模拟订单数据
const ordersData = {
  bought: [
    {
      id: "ORD20260311001",
      leadNo: "LD20260311001",
      region: "北京 · 朝阳区",
      occupation: "企业高管",
      price: 280,
      status: "paid",
      statusLabel: "待联系",
      phone: "138****5678",
      afterSaleDeadline: "2026-03-12 10:30",
      remainingHours: 22,
      createdAt: "2026-03-11 10:30",
    },
    {
      id: "ORD20260310002",
      leadNo: "LD20260310002",
      region: "上海 · 浦东新区",
      occupation: "医生",
      price: 350,
      status: "completed",
      statusLabel: "已完成",
      phone: "139****6789",
      afterSaleDeadline: "2026-03-11 14:00",
      remainingHours: 0,
      createdAt: "2026-03-10 14:00",
    },
    {
      id: "ORD20260309003",
      leadNo: "LD20260309003",
      region: "深圳 · 南山区",
      occupation: "IT工程师",
      price: 200,
      status: "refunded",
      statusLabel: "已退款",
      phone: "137****4567",
      afterSaleDeadline: "-",
      remainingHours: 0,
      createdAt: "2026-03-09 09:00",
    },
  ],
  sold: [
    {
      id: "ORD20260311004",
      leadNo: "LD20260310004",
      region: "杭州 · 西湖区",
      occupation: "企业主",
      price: 420,
      status: "pending",
      statusLabel: "待结算",
      afterSaleDeadline: "2026-03-12 16:00",
      remainingHours: 18,
      createdAt: "2026-03-11 16:00",
    },
    {
      id: "ORD20260308005",
      leadNo: "LD20260307005",
      region: "成都 · 高新区",
      occupation: "自由职业",
      price: 180,
      status: "settled",
      statusLabel: "已结算",
      afterSaleDeadline: "-",
      remainingHours: 0,
      createdAt: "2026-03-08 11:00",
    },
  ],
}

const tabs = [
  { value: "bought", label: "我买的" },
  { value: "sold", label: "我卖的" },
]

const statusColors: Record<string, "primary" | "success" | "warning" | "destructive" | "secondary"> = {
  paid: "warning",
  completed: "success",
  refunded: "destructive",
  pending: "warning",
  settled: "success",
}

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"bought" | "sold">("bought")

  const orders = ordersData[activeTab]

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      {/* 顶部标签页 */}
      <div className="sticky top-0 z-40 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as "bought" | "sold")}
              className={`flex-1 py-4 text-center text-[14px] font-medium relative transition-colors ${
                activeTab === tab.value 
                  ? 'text-[var(--primary)]' 
                  : 'text-[var(--muted)]'
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[var(--primary)] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 订单列表 */}
      <div className="px-5 py-4">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-[var(--muted)] mx-auto mb-4" />
            <p className="text-[14px] text-[var(--muted)]">暂无订单</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="p-4 active-scale">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-[var(--muted)]">订单号: {order.id}</span>
                    <Badge variant={statusColors[order.status]}>{order.statusLabel}</Badge>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3 h-3 text-[var(--muted)]" />
                    <span className="text-[12px] text-[var(--foreground)]">{order.region}</span>
                    <span className="text-[var(--border)]">|</span>
                    <span className="text-[12px] text-[var(--foreground)]">{order.occupation}</span>
                  </div>

                  {activeTab === "bought" && order.phone && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Phone className="w-3 h-3 text-[var(--muted)]" />
                      <span className="text-[12px] text-[var(--foreground)]">{order.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-[var(--muted)]">金额:</span>
                        <span className="text-[14px] font-bold text-[var(--primary)]">{order.price}</span>
                        <span className="text-[10px] text-[var(--muted)]">展业分</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[var(--primary)]">
                      <span className="text-[10px]">查看详情</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* 售后倒计时 */}
                  {order.remainingHours > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 p-2 bg-[var(--warning)]/10 rounded-lg">
                      <Clock className="w-3 h-3 text-[var(--warning)]" />
                      <span className="text-[10px] text-[var(--warning)]">
                        售后保护期剩余 {order.remainingHours} 小时
                      </span>
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
