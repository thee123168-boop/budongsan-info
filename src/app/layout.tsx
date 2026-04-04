import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '핀인포 — 청년·직장인 금융 정보',
  description: '청년도약계좌, 연말정산, 신용점수, 정부지원금까지. 직장인이 꼭 알아야 할 금융 정보를 쉽게 정리합니다.',
  keywords: '청년지원금, 연말정산, 신용점수, 전세대출, 실손보험, 절세',
  openGraph: {
    title: '핀인포 — 청년·직장인 금융 정보',
    description: '직장인이 꼭 알아야 할 금융 정보를 쉽게 정리합니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
