import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface RequestBody {
  age: string | number
}

export async function POST(req: NextRequest) {
  try {
    const { age }: RequestBody = await req.json()
    const today = new Date()
    const dateString = today.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }) // "2월 28일 금요일"
    const solarDate = today.toISOString().split('T')[0] // "2025-02-28"

    const prompt = `
      오늘 날짜는 양력 ${dateString}이며, 양력 날짜는 ${solarDate}입니다.
      한국 만세력 기준으로 다음 작업을 수행해주세요:
      1. 양력 ${solarDate}를 한국 음력으로 변환하여 "[음력 X월 Y일]" 형식으로 제공.
      2. 아래 형식에 맞춰 ${age}년생의 오늘의 운세를 생성. 운세와 운세지수(퍼센트), 금전/건강/애정 수치를 포함.

      형식 예시:
      #오늘의운세
      ●${dateString}

    〈쥐띠〉
96, 84년생 포기하지 말고 끈기 있게 밀어붙여라. 결국 원하는 것을 얻게 될 것이다. 72년생 인생에 큰 변화를 가져올 수 있는 중요한 시점에 와있다. 60년생 단골손님이 찾아와서 매상이 늘게 되겠다. 주머니로 들어오는 것도 많아진다. 48, 36년생 조금만 양보하면 좋은 결과가 나온다.
운세지수 94%. 금전 95 건강 90 애정 95
      `

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'developer', content: prompt }],
      max_tokens: 10000,
      stream: true // 스트림 모드 활성화
    })

    // 스트림을 ReadableStream으로 변환
    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) {
            controller.enqueue(encoder.encode(text))
          }
        }
        controller.close()
      }
    })

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return NextResponse.json({ error: '운세 생성 실패' }, { status: 500 })
  }
}
