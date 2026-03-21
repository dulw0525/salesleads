"use client"

import { useState } from "react"
import { 
  ChevronLeft, 
  User, 
  Briefcase, 
  Shield, 
  Target,
  Wallet,
  ThermometerSun,
  Clock,
  ShoppingCart,
  FileText,
  Users,
  Eye,
  Calendar,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Info,
  ChevronRight,
  Zap
} from "lucide-react"
import Link from "next/link"

// 年龄段选项
const ageRangeOptions = [
  "18-25岁", "25-30岁", "30-35岁", "35-40岁", 
  "40-45岁", "45-50岁", "50-55岁", "55-60岁", "60岁以上"
]

// 行业选项
const industryOptions = [
  "金融", "医疗", "教育", "互联网", "房地产", 
  "制造业", "零售", "政府机关", "自由职业", "其他"
]

// 已购险种选项
const insuranceTypeOptions = [
  "寿险", "健康险", "意外险", "车险", "财产险", "年金险", "教育金险", "无"
]

// 当前保险需求选项
const insuranceNeedOptions = [
  "教育金", "养老规划", "重疾保障", "意外保障", 
  "财富传承", "资产配置", "医疗保障", "子女教育"
]

// 家庭年收入区间
const incomeRangeOptions = [
  "10万以下", "10-30万", "30-50万", "50-80万", 
  "80-100万", "100-200万", "200万以上"
]

// 客户意向程度
const intentionOptions = [
  { value: "high", label: "高", color: "bg-primary text-primary-foreground" },
  { value: "medium", label: "中", color: "bg-warning text-warning-foreground" },
  { value: "low", label: "低", color: "bg-muted text-muted-foreground" }
]

// 购买时间预期
const purchaseTimeOptions = [
  "1个月内", "3个月内", "半年内", "1年以上"
]

// 购买习惯
const purchaseHabitOptions = [
  "线上偏好", "线下偏好", "无明显偏好"
]

interface FormData {
  ageRange: string
  industry: string
  ownedInsurance: string[]
  insuranceNeed: string
  incomeRange: string
  intention: string
  purchaseTime: string
  purchaseHabit: string
  remark: string
  maxInquirers: number
  maxClaimers: number
  isAnonymous: boolean
  agreementSigned: boolean
}

export function ShareLeadPage() {
  const [step, setStep] = useState(1) // 1: 画像采集, 2: 承诺函, 3: 参数设置, 4: 预览确认, 5: 成功
  const [formData, setFormData] = useState<FormData>({
    ageRange: "",
    industry: "",
    ownedInsurance: [],
    insuranceNeed: "",
    incomeRange: "",
    intention: "",
    purchaseTime: "",
    purchaseHabit: "",
    remark: "",
    maxInquirers: 10,
    maxClaimers: 1,
    isAnonymous: false,
    agreementSigned: false
  })

  // 计算画像完整度
  const calculateCompleteness = () => {
    let filled = 0
    const requiredFields = ['ageRange', 'industry', 'ownedInsurance', 'insuranceNeed', 'incomeRange', 'intention']
    const optionalFields = ['purchaseTime', 'purchaseHabit', 'remark']
    
    requiredFields.forEach(field => {
      if (field === 'ownedInsurance') {
        if (formData.ownedInsurance.length > 0) filled += 1
      } else if (formData[field as keyof FormData]) {
        filled += 1
      }
    })
    
    let optionalFilled = 0
    optionalFields.forEach(field => {
      if (formData[field as keyof FormData]) optionalFilled += 0.1
    })
    
    const baseCompleteness = (filled / requiredFields.length) * 100
    return Math.min(100, baseCompleteness + optionalFilled * 100)
  }

  // 计算预估积分
  const calculatePoints = () => {
    const basePoints = 50
    const completeness = calculateCompleteness()
    const completenessCoef = 0.8 + (completeness / 100) * 0.4 // 0.8-1.2
    
    // 根据需求热度计算系数
    const hotNeeds = ['重疾保障', '养老规划', '教育金']
    const needCoef = hotNeeds.includes(formData.insuranceNeed) ? 1.3 : 1.0
    
    // 根据意向程度调整
    const intentionCoef = formData.intention === 'high' ? 1.2 : formData.intention === 'medium' ? 1.0 : 0.9
    
    return Math.round(basePoints * completenessCoef * needCoef * intentionCoef)
  }

  const isStep1Valid = () => {
    return formData.ageRange && 
           formData.industry && 
           formData.ownedInsurance.length > 0 && 
           formData.insuranceNeed && 
           formData.incomeRange && 
           formData.intention
  }

  const handleOwnedInsuranceToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      ownedInsurance: prev.ownedInsurance.includes(type)
        ? prev.ownedInsurance.filter(t => t !== type)
        : [...prev.ownedInsurance, type]
    }))
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-[8px] py-[16px]">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center gap-[8px]">
          <div 
            className={`w-[24px] h-[24px] rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-300 ${
              step >= s 
                ? 'bg-primary text-primary-foreground pulse-glow' 
                : 'bg-secondary text-muted'
            }`}
          >
            {step > s ? <CheckCircle2 className="w-[14px] h-[14px]" /> : s}
          </div>
          {s < 4 && (
            <div className={`w-[24px] h-[2px] rounded-full transition-all duration-300 ${
              step > s ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="flex flex-col gap-[20px]">
      {/* 客户画像卡片 */}
      <div className="border-glow rounded-[12px] p-[16px] bg-card">
        <div className="flex items-center gap-[8px] mb-[16px]">
          <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-[16px] h-[16px] text-primary" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-foreground">客户画像</h3>
            <p className="text-[11px] text-muted">填写客户基本信息</p>
          </div>
          <div className="ml-auto flex items-center gap-[4px]">
            <Sparkles className="w-[14px] h-[14px] text-primary" />
            <span className="text-[11px] text-primary font-medium">{Math.round(calculateCompleteness())}%</span>
          </div>
        </div>

        {/* 年龄段 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <User className="w-[14px] h-[14px] text-muted" />
            客户年龄段
            <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {ageRangeOptions.map(age => (
              <button
                key={age}
                onClick={() => setFormData(prev => ({ ...prev, ageRange: age }))}
                className={`px-[12px] py-[6px] rounded-full text-[12px] transition-all ${
                  formData.ageRange === age
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* 所属行业 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <Briefcase className="w-[14px] h-[14px] text-muted" />
            所属行业
            <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {industryOptions.map(industry => (
              <button
                key={industry}
                onClick={() => setFormData(prev => ({ ...prev, industry }))}
                className={`px-[12px] py-[6px] rounded-full text-[12px] transition-all ${
                  formData.industry === industry
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* 已购险种 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <Shield className="w-[14px] h-[14px] text-muted" />
            已购险种
            <span className="text-destructive">*</span>
            <span className="text-[11px] text-muted ml-[4px]">(可多选)</span>
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {insuranceTypeOptions.map(type => (
              <button
                key={type}
                onClick={() => handleOwnedInsuranceToggle(type)}
                className={`px-[12px] py-[6px] rounded-full text-[12px] transition-all ${
                  formData.ownedInsurance.includes(type)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 当前保险需求 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <Target className="w-[14px] h-[14px] text-muted" />
            当前保险需求
            <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {insuranceNeedOptions.map(need => (
              <button
                key={need}
                onClick={() => setFormData(prev => ({ ...prev, insuranceNeed: need }))}
                className={`px-[12px] py-[6px] rounded-full text-[12px] transition-all ${
                  formData.insuranceNeed === need
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {need}
              </button>
            ))}
          </div>
        </div>

        {/* 家庭年收入 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <Wallet className="w-[14px] h-[14px] text-muted" />
            家庭年收入区间
            <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {incomeRangeOptions.map(income => (
              <button
                key={income}
                onClick={() => setFormData(prev => ({ ...prev, incomeRange: income }))}
                className={`px-[12px] py-[6px] rounded-full text-[12px] transition-all ${
                  formData.incomeRange === income
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {income}
              </button>
            ))}
          </div>
        </div>

        {/* 客户意向程度 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <ThermometerSun className="w-[14px] h-[14px] text-muted" />
            客户意向程度
            <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-[12px]">
            {intentionOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, intention: option.value }))}
                className={`flex-1 py-[10px] rounded-[8px] text-[14px] font-medium transition-all ${
                  formData.intention === option.value
                    ? option.color
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 选填信息卡片 */}
      <div className="rounded-[12px] p-[16px] bg-card border border-border">
        <div className="flex items-center gap-[8px] mb-[16px]">
          <div className="w-[32px] h-[32px] rounded-full bg-secondary flex items-center justify-center">
            <FileText className="w-[16px] h-[16px] text-muted" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-foreground">补充信息</h3>
            <p className="text-[11px] text-muted">选填，可提升匹配精准度</p>
          </div>
        </div>

        {/* 购买时间预期 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <Clock className="w-[14px] h-[14px] text-muted" />
            购买时间预期
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {purchaseTimeOptions.map(time => (
              <button
                key={time}
                onClick={() => setFormData(prev => ({ ...prev, purchaseTime: time }))}
                className={`px-[12px] py-[6px] rounded-full text-[12px] transition-all ${
                  formData.purchaseTime === time
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* 购买习惯 */}
        <div className="mb-[16px]">
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <ShoppingCart className="w-[14px] h-[14px] text-muted" />
            客户购买习惯
          </label>
          <div className="flex flex-wrap gap-[8px]">
            {purchaseHabitOptions.map(habit => (
              <button
                key={habit}
                onClick={() => setFormData(prev => ({ ...prev, purchaseHabit: habit }))}
                className={`px-[12px] py-[6px] rounded-full text-[12px] transition-all ${
                  formData.purchaseHabit === habit
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {habit}
              </button>
            ))}
          </div>
        </div>

        {/* 备注 */}
        <div>
          <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground mb-[8px]">
            <FileText className="w-[14px] h-[14px] text-muted" />
            备注信息
          </label>
          <textarea
            value={formData.remark}
            onChange={(e) => setFormData(prev => ({ ...prev, remark: e.target.value }))}
            placeholder="请输入特殊需求说明（选填）"
            className="w-full h-[80px] px-[12px] py-[10px] rounded-[8px] border border-border bg-background text-[14px] text-foreground placeholder:text-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* 预估积分提示 */}
      <div className="border-glow rounded-[12px] p-[16px] bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <Zap className="w-[20px] h-[20px] text-primary float-animation" />
            <div>
              <p className="text-[14px] font-medium text-foreground">预估激励积分</p>
              <p className="text-[11px] text-muted">基于画像完整度和需求热度计算</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[24px] font-bold text-gradient">{calculatePoints()}</p>
            <p className="text-[11px] text-muted">积分</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="flex flex-col gap-[20px]">
      <div className="border-glow rounded-[12px] p-[20px] bg-card">
        <div className="flex items-center gap-[8px] mb-[20px]">
          <div className="w-[40px] h-[40px] rounded-full bg-primary/10 flex items-center justify-center pulse-glow">
            <Shield className="w-[20px] h-[20px] text-primary" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-foreground">信息来源合法及已获授权承诺函</h3>
            <p className="text-[11px] text-muted">请仔细阅读并签署</p>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-[8px] p-[16px] mb-[20px] max-h-[300px] overflow-y-auto no-scrollbar">
          <div className="space-y-[16px] text-[14px] text-foreground leading-relaxed">
            <p>本人（以下简称"分享人"）在此郑重承诺：</p>
            
            <div className="space-y-[8px]">
              <p className="font-medium">一、信息来源合法性</p>
              <p className="text-muted-foreground">本人所分享的客户线索信息来源合法、正当，系通过合法渠道获取，不存在任何侵犯他人隐私权、个人信息权益或其他合法权益的情形。</p>
            </div>

            <div className="space-y-[8px]">
              <p className="font-medium">二、客户授权确认</p>
              <p className="text-muted-foreground">本人已取得相关客户的明确授权或同意，允许将其信息用于保险咨询、产品推介等相关服务目的。</p>
            </div>

            <div className="space-y-[8px]">
              <p className="font-medium">三、隐私保护承诺</p>
              <p className="text-muted-foreground">本人承诺不会泄露客户的敏感个人信息，包括但不限于身份证号、银行账户、详细住址等信息，保护客户隐私安全。</p>
            </div>

            <div className="space-y-[8px]">
              <p className="font-medium">四、法律责任</p>
              <p className="text-muted-foreground">如因本人提供的信息存在虚假、违法或侵权情形，本人愿意承担由此产生的全部法律责任，并赔偿平台及相关方因此遭受的一切损失。</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFormData(prev => ({ ...prev, agreementSigned: !prev.agreementSigned }))}
          className="flex items-start gap-[12px] p-[16px] rounded-[8px] bg-primary/5 border border-primary/20 cursor-pointer active-scale"
        >
          <div className={`w-[22px] h-[22px] rounded-[6px] border-2 flex items-center justify-center transition-all ${
            formData.agreementSigned 
              ? 'bg-primary border-primary' 
              : 'border-border'
          }`}>
            {formData.agreementSigned && <CheckCircle2 className="w-[14px] h-[14px] text-primary-foreground" />}
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-foreground">我已阅读并同意上述承诺内容</p>
            <p className="text-[11px] text-muted mt-[4px]">签署后具有法律效力，系统将记录签署时间及IP地址</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[8px] p-[12px] rounded-[8px] bg-info/10 border border-info/20">
        <Info className="w-[16px] h-[16px] text-info flex-shrink-0" />
        <p className="text-[12px] text-info">您的签署信息将被安全存储，仅在必要时用于法律追溯</p>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="flex flex-col gap-[20px]">
      <div className="border-glow rounded-[12px] p-[16px] bg-card">
        <div className="flex items-center gap-[8px] mb-[16px]">
          <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-[16px] h-[16px] text-primary" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-foreground">分享参数设置</h3>
            <p className="text-[11px] text-muted">设置线索的曝光和申领规则</p>
          </div>
        </div>

        {/* 最大打听人数 */}
        <div className="mb-[20px]">
          <div className="flex items-center justify-between mb-[8px]">
            <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground">
              <Eye className="w-[14px] h-[14px] text-muted" />
              最大允许打听人数
            </label>
            <span className="text-[16px] font-bold text-primary">{formData.maxInquirers}人</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={formData.maxInquirers}
            onChange={(e) => setFormData(prev => ({ ...prev, maxInquirers: parseInt(e.target.value) }))}
            className="w-full h-[4px] rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[11px] text-muted mt-[4px]">
            <span>1人</span>
            <span>50人</span>
          </div>
        </div>

        {/* 允许申领人数 */}
        <div className="mb-[20px]">
          <div className="flex items-center justify-between mb-[8px]">
            <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground">
              <Users className="w-[14px] h-[14px] text-muted" />
              允许申领人数
            </label>
            <span className="text-[16px] font-bold text-primary">{formData.maxClaimers}人</span>
          </div>
          <div className="flex gap-[12px]">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => setFormData(prev => ({ ...prev, maxClaimers: num }))}
                className={`flex-1 py-[12px] rounded-[8px] text-[14px] font-medium transition-all ${
                  formData.maxClaimers === num
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                }`}
              >
                {num}人
              </button>
            ))}
          </div>
        </div>

        {/* 有效期限 */}
        <div className="mb-[20px]">
          <div className="flex items-center justify-between mb-[8px]">
            <label className="flex items-center gap-[4px] text-[14px] font-medium text-foreground">
              <Calendar className="w-[14px] h-[14px] text-muted" />
              有效期限
            </label>
          </div>
          <div className="p-[12px] rounded-[8px] bg-secondary/50 flex items-center justify-between">
            <span className="text-[14px] text-foreground">7天</span>
            <span className="text-[11px] text-muted">系统自动下架</span>
          </div>
        </div>

        {/* 匿名分享 */}
        <div className="flex items-center justify-between p-[16px] rounded-[8px] bg-secondary/30">
          <div className="flex items-center gap-[8px]">
            <EyeOff className="w-[16px] h-[16px] text-muted" />
            <div>
              <p className="text-[14px] font-medium text-foreground">匿名分享</p>
              <p className="text-[11px] text-muted">开启后大厅显示"匿名代理人"</p>
            </div>
          </div>
          <button
            onClick={() => setFormData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
            className={`w-[48px] h-[28px] rounded-full transition-all relative ${
              formData.isAnonymous ? 'bg-primary' : 'bg-border'
            }`}
          >
            <div className={`absolute top-[2px] w-[24px] h-[24px] rounded-full bg-white shadow-sm transition-all ${
              formData.isAnonymous ? 'left-[22px]' : 'left-[2px]'
            }`} />
          </button>
        </div>
      </div>

      {/* 智能推荐提示 */}
      <div className="flex items-center gap-[8px] p-[12px] rounded-[8px] bg-primary/5 border border-primary/20">
        <Sparkles className="w-[16px] h-[16px] text-primary flex-shrink-0" />
        <p className="text-[12px] text-primary">已为您智能推荐最优参数配置</p>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="flex flex-col gap-[20px]">
      {/* 预览卡片 */}
      <div className="glow-effect rounded-[12px] p-[16px] bg-card">
        <div className="flex items-center gap-[8px] mb-[16px]">
          <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="w-[16px] h-[16px] text-primary" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-foreground">确认分享内容</h3>
            <p className="text-[11px] text-muted">请核对以下信息</p>
          </div>
        </div>

        {/* 线索卡片预览 */}
        <div className="border-glow rounded-[8px] p-[16px] bg-gradient-to-br from-primary/5 to-transparent mb-[16px]">
          <div className="flex items-start justify-between mb-[12px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[40px] h-[40px] rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-[20px] h-[20px] text-primary" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-foreground">
                  {formData.isAnonymous ? '匿名代理人' : '您的昵称'}
                </p>
                <p className="text-[11px] text-muted">刚刚发布</p>
              </div>
            </div>
            <div className={`px-[8px] py-[4px] rounded-full text-[11px] font-medium ${
              formData.intention === 'high' ? 'bg-primary/10 text-primary' :
              formData.intention === 'medium' ? 'bg-warning/10 text-warning' :
              'bg-muted/10 text-muted'
            }`}>
              {formData.intention === 'high' ? '高意向' : formData.intention === 'medium' ? '中意向' : '低意向'}
            </div>
          </div>

          <div className="flex flex-wrap gap-[8px] mb-[12px]">
            <span className="px-[8px] py-[4px] rounded-full bg-secondary text-[11px] text-secondary-foreground">
              {formData.ageRange}
            </span>
            <span className="px-[8px] py-[4px] rounded-full bg-secondary text-[11px] text-secondary-foreground">
              {formData.industry}
            </span>
            <span className="px-[8px] py-[4px] rounded-full bg-primary/10 text-[11px] text-primary">
              {formData.insuranceNeed}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>已购: {formData.ownedInsurance.join('、')}</span>
            <span>收入: {formData.incomeRange}</span>
          </div>
        </div>

        {/* 参数汇总 */}
        <div className="space-y-[8px]">
          <div className="flex items-center justify-between py-[8px] border-b border-border">
            <span className="text-[14px] text-muted">最大打听人数</span>
            <span className="text-[14px] font-medium text-foreground">{formData.maxInquirers}人</span>
          </div>
          <div className="flex items-center justify-between py-[8px] border-b border-border">
            <span className="text-[14px] text-muted">允许申领人数</span>
            <span className="text-[14px] font-medium text-foreground">{formData.maxClaimers}人</span>
          </div>
          <div className="flex items-center justify-between py-[8px] border-b border-border">
            <span className="text-[14px] text-muted">有效期限</span>
            <span className="text-[14px] font-medium text-foreground">7天</span>
          </div>
          <div className="flex items-center justify-between py-[8px]">
            <span className="text-[14px] text-muted">匿名分享</span>
            <span className="text-[14px] font-medium text-foreground">{formData.isAnonymous ? '是' : '否'}</span>
          </div>
        </div>
      </div>

      {/* 积分预览 */}
      <div className="border-glow rounded-[12px] p-[16px] bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="w-[48px] h-[48px] rounded-full bg-primary/20 flex items-center justify-center pulse-glow">
              <Zap className="w-[24px] h-[24px] text-primary" />
            </div>
            <div>
              <p className="text-[14px] text-foreground">提交后预计获得</p>
              <p className="text-[11px] text-muted">积分将进入冻结账户，状态：待确认</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[28px] font-bold text-gradient">{calculatePoints()}</p>
            <p className="text-[11px] text-muted">激励积分</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="flex flex-col items-center justify-center py-[40px]">
      <div className="w-[80px] h-[80px] rounded-full bg-primary/10 flex items-center justify-center mb-[24px] pulse-glow">
        <CheckCircle2 className="w-[48px] h-[48px] text-primary" />
      </div>
      
      <h2 className="text-[18px] font-bold text-foreground mb-[8px]">分享成功</h2>
      <p className="text-[14px] text-muted text-center mb-[24px]">
        您的线索已提交审核，预计获得
      </p>

      <div className="border-glow rounded-[12px] p-[24px] bg-gradient-to-br from-primary/10 to-transparent w-full mb-[24px]">
        <div className="flex items-center justify-center gap-[12px]">
          <Zap className="w-[32px] h-[32px] text-primary float-animation" />
          <div className="text-center">
            <p className="text-[36px] font-bold text-gradient">{calculatePoints()}</p>
            <p className="text-[14px] text-muted">激励积分（冻结中）</p>
          </div>
        </div>
      </div>

      <div className="w-full space-y-[12px]">
        <Link 
          href="/leads"
          className="flex items-center justify-center gap-[8px] w-full py-[14px] rounded-[8px] bg-primary text-primary-foreground text-[16px] font-medium active-scale"
        >
          查看线索大厅
          <ChevronRight className="w-[16px] h-[16px]" />
        </Link>
        <Link 
          href="/"
          className="flex items-center justify-center w-full py-[14px] rounded-[8px] bg-secondary text-secondary-foreground text-[16px] font-medium active-scale"
        >
          返回首页
        </Link>
      </div>
    </div>
  )

  const handleNext = () => {
    if (step === 1 && !isStep1Valid()) return
    if (step === 2 && !formData.agreementSigned) return
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const getNextButtonText = () => {
    switch (step) {
      case 1: return '下一步：签署承诺函'
      case 2: return '下一步：设置参数'
      case 3: return '下一步：预览确认'
      case 4: return '提交分享'
      default: return '下一步'
    }
  }

  const isNextDisabled = () => {
    if (step === 1) return !isStep1Valid()
    if (step === 2) return !formData.agreementSigned
    return false
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部导航 */}
      <header className="flex items-center justify-between px-[22px] py-[12px] bg-card border-b border-border">
        {step < 5 ? (
          <button onClick={step === 1 ? undefined : handleBack} className="w-[32px] h-[32px] flex items-center justify-center">
            {step > 1 && <ChevronLeft className="w-[24px] h-[24px] text-foreground" />}
          </button>
        ) : (
          <div className="w-[32px]" />
        )}
        <h1 className="text-[18px] font-bold text-foreground">
          {step === 5 ? '分享成功' : '分享线索'}
        </h1>
        <Link href="/" className="w-[32px] h-[32px] flex items-center justify-center">
          <span className="text-[14px] text-muted">取消</span>
        </Link>
      </header>

      {/* 步骤指示器 */}
      {step < 5 && renderStepIndicator()}

      {/* 内容区域 */}
      <main className="flex-1 px-[22px] py-[16px] overflow-y-auto no-scrollbar pb-[100px]">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
      </main>

      {/* 底部按钮 */}
      {step < 5 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[375px] max-w-[430px] px-[22px] py-[16px] bg-card border-t border-border safe-area-bottom">
          <button
            onClick={handleNext}
            disabled={isNextDisabled()}
            className={`w-full py-[14px] rounded-[8px] text-[16px] font-medium transition-all ${
              isNextDisabled()
                ? 'bg-secondary text-muted cursor-not-allowed'
                : 'bg-primary text-primary-foreground active-scale pulse-glow'
            }`}
          >
            {getNextButtonText()}
          </button>
        </div>
      )}
    </div>
  )
}
