'use client'

import { ThemeProvider } from '@/app/providers/theme-provider'
import { useState, useEffect } from 'react'
interface PropsType {
  children: React.ReactNode
}

export default function RootContainer({ children }: PropsType) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
