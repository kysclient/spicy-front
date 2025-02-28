import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const RootContainer = dynamic(() => import('../components/containers/root-container'), {
  ssr: false 
})
import './globals.css'

export const metadata: Metadata = {
  title: '강남구 지역 모임 - 🔥SPICY🔥 외모커트라인 높아요❤️',
  description: '지루한 일상 속 매운맛🌶️을 느끼고 싶다면',
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    images: [
      {
        url: '/og-image.jpeg', // OG 이미지 경로
        width: 1200,
        height: 630,
        alt: 'OG Image' // OG 이미지 설명
      }
    ]
  },
  keywords: ['씨멘틀', '소모임', '스파이시', '윈터']
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <RootContainer>{children}</RootContainer>
      </body>
    </html>
  )
}
