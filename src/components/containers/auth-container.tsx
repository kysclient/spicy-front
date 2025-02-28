'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PropsType {
  children: React.ReactNode
}

export default function AuthContainer({ children }: PropsType) {
  const router = useRouter()

  useEffect(() => {
    // 클라이언트에서만 실행 보장
    if (typeof window === 'undefined') return
    const username = localStorage.getItem('username')
    const currentPath = window.location.pathname
    if (!username && !['/signin', '/terms', '/privacy'].includes(currentPath)) {
      router.replace('/signin')
    }
  }, [])

  return <div id="authContainer">{children}</div>
}
