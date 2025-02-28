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
    setMounted(true)
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username')
      const currentPath = window.location.pathname
      if (!username && currentPath !== '/signin' && currentPath !== '/terms' && currentPath !== '/privacy') {
        router.push('/signin')
      }
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
