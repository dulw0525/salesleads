"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  DollarSign,
  Target,
  FileText,
  Zap,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Info,
  TrendingUp,
  X
} from "lucide-react"

type Step = "info" | "intent" | "price" | "preview"

// 职业选项
const occupations = [
  "企业高管", "IT工程师", "医生", "教师", "律师", 
  "公务员", "自由职业", "企业主", "销售", "其他"
]

// 险种选项
const insuranceTypes = [
  { value: "life", label: "人寿保险" },
  { value: "health", label: "健康保险" },
  { value: "property", label: "财产保险" },
  { value: "auto", label: "车险" },
  { value: "education", label: "教育金" },
  { value: "pension", label: "养老保险" },
]

// 意向等级
const intentLevels = [
  { value: 1, label: "暂无意向", desc: "了解阶段", color: "secondary" },
  { value: 2, label: "潜在了解", desc: "有初步兴趣", color: "secondary" },
  { value: 3, label: "明确规划", desc: "已有购买计划", color: "warning" },
  { value: 4, label: "近期急需", desc: "1-3个月内购买", color: "destructive" },
]

// 省市数据简化
const provinces = ["北京市", "上海市", "广东省", "浙江省", "江苏省", "四川省"]
const cities: Record<string, string[]> = {
  "北京市": ["朝阳区", "海淀区", "西城区", "东城区", "丰台区"],
  "上海市": ["浦东新区", "黄浦区", "静安区", "徐汇区", "长宁区"],
  "广东省": ["广州市", "深圳市", "东莞市", "佛山市", "珠海市"],
  "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "绍兴市"],
  "江苏省": ["南京市", "苏州市", "无锡市", "常州市", "南通市"],
  "四川省": ["成都市", "绵阳市", "德阳市", "乐山市", "自贡市"],
}

export function PublishPage() {
  const [step, setStep] = useState<Step>("info")
  const [loading, setLoading] = useState(false)
  const [showOccupationPicker, setShowOccupationPicker] = useState(false)
  const [showProvincePicker, setShowProvincePicker] = useState(false)
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [aiVerifying, setAiVerifying] = useState(false)
  const [aiResult, setAiResult] = useState<{score: number, minPrice: number, maxPrice: number} | null>(null)
  const [publishSuccess, setPublishSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    province: "",
    city: "",
    age: "",
    occupation: "",
    budgetMin: "",
    budgetMax: "",
    insuranceTypes: [] as string[],
    intentLevel: 0,
    description: "",
    price: "",
  })

  const handleNext = () => {
    if (step === "info") setStep("intent")
    else if (step === "intent") {
      // 触发AI校验
      setAiVerifying(true)
      setTimeout(() => {
        setAiResult({
          score: 85,
          minPrice: 200,
          maxPrice: 350,
        })
        setAiVerifying(false)
        setStep("price")
      }, 2000)
    }
    else if (step === "price") setStep("preview")
  }

  const handleBack = () => {
    if (step === "intent") setStep("info")
    else if (step === "price") setStep("intent")
    else if (step === "preview") setStep("price")
  }

  const handlePublish = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setPublishSuccess(true)
  }

  const toggleInsuranceType = (value: string) => {
    setFormData(prev => ({
      ...prev,
      insuranceTypes: prev.insuranceTypes.includes(value)
        ? prev.insuranceTypes.filter(t => t !== value)
        : [...prev.insuranceTypes, value]
    }))
  }

  const stepProgress = {
    info: 25,
    intent: 50,
    price: 75,
    preview: 100,
  }

  if (publishSuccess) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header title="发布成功" showBack={false} />
        <div className="px-5 py-12 text-center">
          <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-[16px] font-semibold text-[var(--foreground)] mb-2">线索发布成功!</h2>
          <p className="text-[12px] text-[var(--muted)] mb-6">
            您的线索已通过审核并上架，等待买家购买
          </p>

          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">线索编号</span>
                  <span className="text-[12px] text-[var(--foreground)]">LD20260311002</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">定价</span>
                  <span className="text-[12px] text-[var(--primary)] font-semibold">{formData.price}展业分</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">AI评分</span>
                  <Badge variant="primary">{aiResult?.score}分</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[var(--muted)]">预计曝光</span>
                  <span className="text-[12px] text-[var(--foreground)]">首页推荐位</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button size="full">
              查看我的线索
            </Button>
            <Button size="full" variant="outline">
              继续发布
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      <Header title="发布线索" />

      {/* 进度条 */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[var(--muted)]">
            {step === "info" && "第1步: 客户信息"}
            {step === "intent" && "第2步: 意向信息"}
            {step === "price" && "第3步: 定价设置"}
            {step === "preview" && "第4步: 确认发布"}
          </span>
          <span className="text-[10px] text-[var(--primary)]">{stepProgress[step]}%</span>
        </div>
        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--primary)] rounded-full transition-all duration-300"
            style={{ width: `${stepProgress[step]}%` }}
          />
        </div>
      </div>

      <div className="px-5">
        {/* Step 1: 客户信息 */}
        {step === "info" && (
          <div className="space-y-4">
            <Card>
              <CardContent className="py-4">
                <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">客户基本信息</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-[var(--muted)]" />
                      <span className="text-[12px] font-medium text-[var(--foreground)]">客户姓名 <span className="text-[var(--destructive)]">*</span></span>
                    </div>
                    <Input 
                      placeholder="请输入客户真实姓名"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[var(--muted)]" />
                      <span className="text-[12px] font-medium text-[var(--foreground)]">联系方式 <span className="text-[var(--destructive)]">*</span></span>
                    </div>
                    <Input 
                      type="tel"
                      placeholder="请输入11位手机号"
                      maxLength={11}
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    />
                    <p className="text-[10px] text-[var(--muted)] mt-1">手机号将加密存储，仅购买后可见</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[var(--muted)]" />
                      <span className="text-[12px] font-medium text-[var(--foreground)]">所在城市 <span className="text-[var(--destructive)]">*</span></span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowProvincePicker(true)}
                        className="flex-1 h-11 px-3 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] flex items-center justify-between"
                      >
                        <span className={`text-[14px] ${formData.province ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                          {formData.province || "选择省份"}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
                      </button>
                      <button 
                        onClick={() => formData.province && setShowCityPicker(true)}
                        className="flex-1 h-11 px-3 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] flex items-center justify-between"
                      >
                        <span className={`text-[14px] ${formData.city ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                          {formData.city || "选择城市"}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-[var(--muted)]" />
                        <span className="text-[12px] font-medium text-[var(--foreground)]">年龄 <span className="text-[var(--destructive)]">*</span></span>
                      </div>
                      <Input 
                        type="number"
                        placeholder="岁"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-[var(--muted)]" />
                        <span className="text-[12px] font-medium text-[var(--foreground)]">职业 <span className="text-[var(--destructive)]">*</span></span>
                      </div>
                      <button 
                        onClick={() => setShowOccupationPicker(true)}
                        className="w-full h-11 px-3 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] flex items-center justify-between"
                      >
                        <span className={`text-[14px] ${formData.occupation ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                          {formData.occupation || "选择职业"}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-[var(--muted)]" />
                      <span className="text-[12px] font-medium text-[var(--foreground)]">预计保费预算 <span className="text-[var(--destructive)]">*</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number"
                        placeholder="最低"
                        className="flex-1"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({...formData, budgetMin: e.target.value})}
                      />
                      <span className="text-[var(--muted)]">-</span>
                      <Input 
                        type="number"
                        placeholder="最高"
                        className="flex-1"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({...formData, budgetMax: e.target.value})}
                      />
                      <span className="text-[12px] text-[var(--muted)]">万元</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: 意向信息 */}
        {step === "intent" && (
          <div className="space-y-4">
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-[var(--muted)]" />
                  <h3 className="text-[14px] font-semibold text-[var(--foreground)]">险种意向</h3>
                  <span className="text-[10px] text-[var(--muted)]">(可多选)</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {insuranceTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => toggleInsuranceType(type.value)}
                      className={`p-3 rounded-lg text-center text-[12px] transition-colors ${
                        formData.insuranceTypes.includes(type.value)
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">意向等级</h3>
                
                <div className="space-y-2">
                  {intentLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setFormData({...formData, intentLevel: level.value})}
                      className={`w-full p-3 rounded-lg flex items-center justify-between transition-colors ${
                        formData.intentLevel === level.value
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-[12px] font-medium">{level.label}</p>
                        <p className={`text-[10px] ${
                          formData.intentLevel === level.value ? 'text-white/80' : 'text-[var(--muted)]'
                        }`}>{level.desc}</p>
                      </div>
                      {formData.intentLevel === level.value && (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-[var(--muted)]" />
                  <h3 className="text-[14px] font-semibold text-[var(--foreground)]">备注说明</h3>
                  <span className="text-[10px] text-[var(--muted)]">(选填)</span>
                </div>
                
                <textarea
                  placeholder="请输入客户的其他重要信息，如收入情况、家庭状况、已有保单等..."
                  className="w-full h-24 p-3 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius)] text-[12px] placeholder:text-[var(--muted)] outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <p className="text-[10px] text-[var(--muted)] mt-1 text-right">{formData.description.length}/200</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI校验中 */}
        {aiVerifying && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <Card className="w-[280px]">
              <CardContent className="py-8 text-center">
                <div className="w-16 h-16 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Zap className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-2">AI智能校验中</h3>
                <p className="text-[12px] text-[var(--muted)]">正在检测号码状态、防撞单校验...</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: 定价设置 */}
        {step === "price" && (
          <div className="space-y-4">
            {/* AI评估结果 */}
            <Card className="border-l-4 border-l-[var(--primary)]">
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--primary)]" />
                    <h3 className="text-[14px] font-semibold text-[var(--foreground)]">AI价值评估</h3>
                  </div>
                  <Badge variant="primary">{aiResult?.score}分 优秀</Badge>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] text-[var(--muted)]">线索评分</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[var(--primary)] rounded-full"
                        style={{ width: `${aiResult?.score}%` }}
                      />
                    </div>
                    <span className="text-[14px] font-bold text-[var(--primary)]">{aiResult?.score}分</span>
                  </div>
                </div>

                <div className="bg-[var(--secondary)] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
                    <span className="text-[12px] font-medium text-[var(--foreground)]">推荐定价区间</span>
                  </div>
                  <p className="text-[20px] font-bold text-[var(--primary)]">
                    {aiResult?.minPrice}-{aiResult?.maxPrice}
                    <span className="text-[12px] font-normal text-[var(--muted)]"> 展业分</span>
                  </p>
                  <p className="text-[10px] text-[var(--muted)] mt-1">
                    基于历史同类线索成交数据智能推荐
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-4">
                <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">设置售价</h3>
                
                <div className="mb-4">
                  <Input 
                    type="number"
                    placeholder="请输入价格"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    hint="价格范围: 10-5000展业分"
                  />
                </div>

                {/* 快捷价格 */}
                <div className="flex flex-wrap gap-2">
                  {[aiResult?.minPrice, Math.round((aiResult?.minPrice || 0 + (aiResult?.maxPrice || 0)) / 2), aiResult?.maxPrice].map((price) => (
                    <button
                      key={price}
                      onClick={() => setFormData({...formData, price: String(price)})}
                      className={`px-4 py-2 rounded-full text-[12px] ${
                        formData.price === String(price)
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--secondary)] text-[var(--foreground)]'
                      }`}
                    >
                      {price}分
                    </button>
                  ))}
                </div>

                <div className="flex items-start gap-2 mt-4 p-3 bg-[#fffbe6] rounded-lg">
                  <Info className="w-4 h-4 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-[#8c6e00]">
                      定价建议: 价格越接近推荐区间中值，成交速度越快
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: 确认发布 */}
        {step === "preview" && (
          <div className="space-y-4">
            <Card>
              <CardContent className="py-4">
                <h3 className="text-[14px] font-semibold text-[var(--foreground)] mb-4">线索预览</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">客户姓名</span>
                    <span className="text-[12px] text-[var(--foreground)]">{formData.customerName}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">联系方式</span>
                    <span className="text-[12px] text-[var(--foreground)]">{formData.customerPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">所在城市</span>
                    <span className="text-[12px] text-[var(--foreground)]">{formData.province} {formData.city}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">年龄 / 职业</span>
                    <span className="text-[12px] text-[var(--foreground)]">{formData.age}岁 / {formData.occupation}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">预算范围</span>
                    <span className="text-[12px] text-[var(--foreground)]">{formData.budgetMin}-{formData.budgetMax}万</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">险种意向</span>
                    <div className="flex gap-1">
                      {formData.insuranceTypes.map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">
                          {insuranceTypes.find(i => i.value === t)?.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                    <span className="text-[12px] text-[var(--muted)]">意向等级</span>
                    <Badge variant="warning">{intentLevels.find(l => l.value === formData.intentLevel)?.label}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[12px] text-[var(--muted)]">售价</span>
                    <span className="text-[16px] font-bold text-[var(--primary)]">{formData.price}展业分</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 协议确认 */}
            <Card className="border-l-4 border-l-[var(--warning)]">
              <CardContent className="py-3 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] text-[var(--foreground)] font-medium">发布须知</p>
                  <p className="text-[10px] text-[var(--muted)] mt-1">
                    发布线索即表示您已阅读并同意
                    <span className="text-[var(--primary)]">《线索来源合法合规承诺书》</span>
                    ，承诺线索来源合法合规
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] border-t border-[var(--border)] p-4 safe-area-inset-bottom">
        <div className="flex gap-3">
          {step !== "info" && (
            <Button variant="outline" className="flex-1" onClick={handleBack}>
              上一步
            </Button>
          )}
          {step !== "preview" ? (
            <Button className="flex-1" onClick={handleNext}>
              下一步
            </Button>
          ) : (
            <Button className="flex-1" loading={loading} onClick={handlePublish}>
              确认发布
            </Button>
          )}
        </div>
      </div>

      {/* 职业选择器 */}
      {showOccupationPicker && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowOccupationPicker(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] rounded-t-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">选择职业</h3>
              <button onClick={() => setShowOccupationPicker(false)}>
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {occupations.map((occ) => (
                <button 
                  key={occ}
                  onClick={() => {
                    setFormData({...formData, occupation: occ})
                    setShowOccupationPicker(false)
                  }}
                  className={`p-3 rounded-lg text-[12px] ${
                    formData.occupation === occ 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-[var(--secondary)] text-[var(--foreground)]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 省份选择器 */}
      {showProvincePicker && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowProvincePicker(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] rounded-t-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">选择省份</h3>
              <button onClick={() => setShowProvincePicker(false)}>
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {provinces.map((province) => (
                <button 
                  key={province}
                  onClick={() => {
                    setFormData({...formData, province, city: ""})
                    setShowProvincePicker(false)
                  }}
                  className={`w-full p-3 rounded-lg text-left text-[12px] ${
                    formData.province === province 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-[var(--secondary)] text-[var(--foreground)]'
                  }`}
                >
                  {province}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 城市选择器 */}
      {showCityPicker && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowCityPicker(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-[var(--card)] rounded-t-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-[var(--foreground)]">选择城市</h3>
              <button onClick={() => setShowCityPicker(false)}>
                <X className="w-5 h-5 text-[var(--muted)]" />
              </button>
            </div>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {cities[formData.province]?.map((city) => (
                <button 
                  key={city}
                  onClick={() => {
                    setFormData({...formData, city})
                    setShowCityPicker(false)
                  }}
                  className={`w-full p-3 rounded-lg text-left text-[12px] ${
                    formData.city === city 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'bg-[var(--secondary)] text-[var(--foreground)]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
