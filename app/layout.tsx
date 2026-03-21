import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "保险代理人展业平台 - 客户线索交易",
  description: "为保险代理人提供透明的保险意向线索流转市场，快速变现闲置客户资源，获取精准意向客户线索",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#00bc71",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        <div className="mx-auto w-full min-w-[375px] max-w-[430px] min-h-screen bg-background shadow-xl">
          {children}
        </div>
      </body>
    </html>
  )
}
