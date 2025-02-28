'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Calendar, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FortunePage() {
  const [fortune, setFortune] = useState('')
  const [loading, setLoading] = useState(false)
  const [age, setAge] = useState('')

  const fetchFortune = async () => {
    if (age.length !== 4) {
      window.alert('제대로 입력해주세요. ex) 1997')
      return
    }
    setLoading(true)
    setFortune('') // 초기화

    try {
      const response = await fetch('/api/fortune', {
        method: 'POST',
        body: JSON.stringify({ age }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        throw new Error('API 요청 실패')
      }
      if (!response.body) {
        throw new Error('응답 본문 없음')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullFortune = '' // 스트림 전체를 저장할 변수

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullFortune += chunk
        setFortune(fullFortune) // 실시간 업데이트
        await new Promise((resolve) => setTimeout(resolve, 20)) // 타이핑 속도
      }

      // 스트림 완료 후 로컬스토리지 저장
      const today = new Date().toISOString().split('T')[0]
      localStorage.setItem('fortune', fullFortune)
      localStorage.setItem('fortuneDate', today)
    } catch (error) {
      console.error('Fetch Error:', error)
      setFortune('운세를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const storedDate = localStorage.getItem('fortuneDate')
    const storedFortune = localStorage.getItem('fortune')

    if (storedFortune && storedDate === today) {
      setFortune(storedFortune)
      setLoading(false)
    }
  }, [])

  return (
    <div className="max-w-[800px] mx-auto py-[20px] space-y-4">
      <h1 className="px-4">오늘의 운세</h1>
      <Separator />
      {!fortune && (
        <div className="flex flex-col justify-center items-center w-full space-y-6 px-4">
          <div className="w-full relative">
            <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input type="number" className="bg-secondary rounded-full py-6 pl-10" placeholder="연생을 입력하세요 ex) 1997" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <Button onClick={fetchFortune} disabled={loading} className="bg-secondary">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            운세보기
          </Button>
        </div>
      )}

      {loading && fortune === '' ? (
        <p className="text-center px-4">운세를 불러오는 중...</p>
      ) : (
        <div className="px-4">
          <pre
            className="text-sm md:text-base leading-relaxed break-words"
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}
          >
            {fortune}
          </pre>
        </div>
      )}
    </div>
  )
}
