"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Wallet,
  TrendingUp,
  TrendingDown,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Filter
} from "lucide-react"
import Link from "next/link"

// 模拟账户数据
const accountData = {
  rechargeBalance: 1500,
  incomeBalance: 2800,
  frozenBalance: 420,
}

// 模拟交易记录
const transactions = [
  {
    id: 1,
    type: "purchase",
    typeLabel: "购买线索",
    amount: -280,
    balance: 1500,
    description: "线索编号: LD20260311001",
    time: "2026-03-11 10:30",
  },
  {
    id: 2,
    type: "sale",
    typeLabel: "卖出线索",
    amount: 420,
    balance: 3220,
    description: "线索编号: LD20260310004",
    time: "2026-03-11 09:00",
    status: "frozen",
  },
  {
    id: 3,
    type: "recharge",
    typeLabel: "账户充值",
    amount: 1000,
    balance: 2800,
    description: "微信支付",
    time: "2026-03-10 14:00",
  },
  {
    id: 4,
    type: "withdraw",
    typeLabel: "提现",
    amount: -500,
    balance: 1800,
    description: "提现至银行卡",
    time: "2026-03-09 16:00",
    status: "success",
  },
  {
    id: 5,
    type: "refund",
    typeLabel: "售后退款",
    amount: 200,
    balance: 2300,
    description: "订单: ORD20260308001",
    time: "2026-03-08 11:00",
  },
]

const tabs = [
  { value: "all", label: "全部" },
  { value: "recharge", label: "充值" },
  { value: "purchase", label: "购买" },
  { value: "sale", label: "卖出" },
  { value: "withdraw", label: "提现" },
]

export function WalletPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredTransactions = activeTab === "all" 
    ? transactions 
    : transactions.filter(t => t.type === activeTab)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="我的钱包" />

      <div className="px-5 py-4">
        {/* 账户概览 */}
        <Card className="mb-4 overflow-hidden">
          <div className="gradient-primary p-5">
            <p className="text-[12px] text-white/80 mb-1">总资产 (展业分)</p>
            <p className="text-[32px] font-bold text-white">
              {accountData.rechargeBalance + accountData.incomeBalance}
            </p>
          </div>
          <CardContent className="py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-[16px] font-bold text-[var(--foreground)]">{accountData.rechargeBalance}</p>
                <p className="text-[10px] text-[var(--muted)] mt-1">充值分</p>
              </div>
              <div className="text-center">
                <p className="text-[16px] font-bold text-[var(--primary)]">{accountData.incomeBalance}</p>
                <p className="text-[10px] text-[var(--muted)] mt-1">收益分</p>
              </div>
              <div className="text-center">
                <p className="text-[16px] font-bold text-[var(--warning)]">{accountData.frozenBalance}</p>
                <p className="text-[10px] text-[var(--muted)] mt-1">待结算</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Link href="/wallet/recharge" className="flex-1">
                <Button size="full">充值</Button>
              </Link>
              <Link href="/wallet/withdraw" className="flex-1">
                <Button size="full" variant="outline">提现</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 交易记录 */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-semibold text-[var(--foreground)]">交易记录</h3>
        </div>

        {/* 筛选标签 */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-1.5 rounded-full text-[10px] whitespace-nowrap transition-colors ${
                activeTab === tab.value
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--foreground)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 记录列表 */}
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.amount > 0 ? "bg-[var(--primary-light)]" : "bg-[var(--secondary)]"
                }`}>
                  {transaction.amount > 0 ? (
                    <ArrowDownLeft className={`w-5 h-5 ${
                      transaction.amount > 0 ? "text-[var(--primary)]" : "text-[var(--muted)]"
                    }`} />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-[var(--muted)]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-[var(--foreground)]">
                      {transaction.typeLabel}
                    </span>
                    {transaction.status === "frozen" && (
                      <Badge variant="warning" className="text-[10px]">
                        <Clock className="w-2.5 h-2.5 mr-0.5" />
                        待结算
                      </Badge>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--muted)] mt-0.5">{transaction.description}</p>
                  <p className="text-[10px] text-[var(--muted)]">{transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[14px] font-bold ${
                    transaction.amount > 0 ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}{transaction.amount}
                  </p>
                  <p className="text-[10px] text-[var(--muted)]">余额: {transaction.balance}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
