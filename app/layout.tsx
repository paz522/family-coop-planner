import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'

// フォントの設定
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '家族起業サポートプランナー | スキルと時間から最適な役割を提案',
  description: 'パートナーのスキルと協力可能時間から、起業での最適な役割を提案するツールです。家族での起業をスムーズに進めるためのサポートツール。',
  keywords: '家族起業, 役割分担, スキル活用, 起業サポート, 協力時間, 家族ビジネス',
  authors: [{ name: 'Family Coop Planner Team' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
