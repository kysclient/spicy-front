'use client'
import { useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { Skeleton } from '../ui/skeleton'

const DrinkingGameComponent = () => {
  const opts: YouTubeProps['opts'] = {
    height: 'auto',
    width: '100%',
    playerVars: {
      autoplay: 0
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-[20px] px-4">
      {youtubeItems.map((item, idx) => (
        <div key={idx}>
          <VideoCard title={item.title} videoId={item.videoId} />
        </div>
      ))}
    </div>
  )
}

export default DrinkingGameComponent

interface VideoCardProps {
  title: string
  videoId: string
}

const VideoCard = ({ title, videoId }: VideoCardProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const opts = {
    height: '200',
    width: '100%',
    playerVars: { autoplay: 0 }
  }

  return (
    <div className="rounded-lg overflow-hidden flex flex-col gap-2 border border-border">
      {isLoading && <Skeleton className="w-full h-[200px]" />}
      <YouTube loading="lazy" className={`animate-fadeIn ${isLoading ? 'hidden' : 'block'}`} videoId={videoId} opts={opts} onReady={() => setIsLoading(false)} />
      <div className="px-4 py-4">
        <p className='text-sm'>{title}</p>
      </div>
    </div>
  )
}

const youtubeItems = [
  {
    title: '슈퍼마리오게임',
    videoId: 'itdtnx_TUs8'
  },
  {
    title: '바니바니',
    videoId: '9rM-uHns5_w'
  },
  {
    title: '두부게임',
    videoId: 'SB5YjpNMQO4'
  },
  {
    title: '랭킹게임',
    videoId: 'pEAlFYqmgbU'
  },
  {
    title: '출석부게임',
    videoId: 'vSqkdPZL1RQ'
  },
  {
    title: '바보게임',
    videoId: 'ug3cfMf826I'
  },
  {
    title: '울트라369게임',
    videoId: 'GVI6mZodqto'
  },
  {
    title: '바나나게임',
    videoId: 'w9yCuiwa7ZI'
  },
  {
    title: '슛돌이게임',
    videoId: 'eGansGfxZHM'
  },
  {
    title: '딸기당근수박참외메론게임',
    videoId: 'YC3KIfeBixw'
  }
]
