'use client'

import { ThemeProvider } from '@/app/providers/theme-provider'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PropsType {
  children: React.ReactNode
}

export default function RootContainer({ children }: PropsType) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // 클라이언트에서만 실행
    setMounted(true)
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
    if (!username && currentPath && !['/signin', '/terms', '/privacy'].includes(currentPath)) {
      router.replace('/signin')
    }
  }, [router])

  if (!mounted) {
    return <div id="rootContainer">{children}</div>
  }

  return (
    <div id="rootContainer">
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </div>
  )
}
