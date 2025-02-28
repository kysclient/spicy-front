import { NextResponse } from 'next/server'

interface RequestBody {
  word1: string
  word2: string
  isOwner: boolean
  username: string
}

export async function POST(req: Request): Promise<NextResponse> {
  const { word1, word2, isOwner, username }: RequestBody = await req.json()
  const baseUrl = 'https://spicy-backend-49d2fee7a2ad.herokuapp.com'

  try {
    // Heroku에 배포된 FastAPI 서버로 HTTP 요청 보내기
    const response = await fetch(`${baseUrl}/similarity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input1: word1, input2: word2, isOwner: isOwner, username: username })
    })

    if (!response.ok) {
      throw new Error('Failed to compute similarity')
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error', error) // 추가적인 에러 로그
    return NextResponse.json({
      error: 'Error processing similarity calculation'
    })
  }
}
