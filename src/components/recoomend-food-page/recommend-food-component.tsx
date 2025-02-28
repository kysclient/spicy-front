'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import '@/styles/rotate.scss'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const options: string[] = [
  '김치찌개',
  '된장찌개',
  '불고기',
  '제육볶음',
  '비빔밥',
  '김밥',
  '라면',
  '떡볶이',
  '만두',
  '김말이',
  '국밥',
  '돈까스',
  '카레',
  '냉면',
  '쌈밥',
  '오므라이스',
  '볶음밥',
  '칼국수',
  '수제비',
  '떡국',
  '콩나물국밥',
  '된장국',
  '미역국',
  '육개장',
  '순두부찌개',
  '동태찌개',
  '갈비탕',
  '추어탕',
  '감자탕',
  '설렁탕',
  '잡채',
  '계란말이',
  '김치전',
  '파전',
  '해물전',
  '부대찌개',
  '떡만두국',
  '해물탕',
  '어묵탕',
  '매운탕',
  '삼겹살',
  '보쌈',
  '족발',
  '냉이국',
  '고추장찌개',
  '청국장찌개',
  '두부김치',
  '고등어구이',
  '조림',
  '탕수어',
  '치킨',
  '간장치킨',
  '떡갈비',
  '탕수육',
  '짜장면',
  '짬뽕',
  '양장피',
  '마파두부',
  '유부초밥',
  '덮밥',
  '규동',
  '소바',
  '우동',
  '라멘',
  '돈부리',
  '가츠산도',
  '테리야키 치킨',
  '샐러드',
  '그릴드 치킨',
  '터키 샌드위치',
  '베이글',
  '토스트',
  '크로크무슈',
  '퀴노아 볼',
  '아보카도 토스트',
  '부리토',
  '나초',
  '피자',
  '햄버거',
  '파니니',
  '랩',
  '버거',
  '스프',
  '미소시루',
  '야키소바',
  '오믈렛',
  '샌드위치',
  '바게뜨 (햄)',
  '콘치즈',
  '감자튀김',
  '채소볶음',
  '두부조림',
  '단호박죽',
  '전복죽',
  '해산물 샐러드',
  '쌀국수',
  '비프샌드위치'
]
const RecommendFoodComponent: React.FC = () => {
  const [displayText, setDisplayText] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const controls = useAnimation()

  const spinText = async () => {
    if (isSpinning) return

    setIsSpinning(true)
    setDisplayText('')

    // 텍스트가 빠르게 변하는 애니메이션
    const spinDuration = 2 // 2초 동안 회전
    const totalFrames = 50 // 총 프레임 수
    const frameDuration = spinDuration / totalFrames

    for (let i = 0; i < totalFrames; i++) {
      await new Promise((resolve) => setTimeout(resolve, frameDuration * 1000))
      const randomIndex = Math.floor(Math.random() * options.length)
      setDisplayText(`${options[randomIndex]}`)
    }

    // 최종 결과 선택
    const finalIndex = Math.floor(Math.random() * options.length)

    setDisplayText(`${options[finalIndex]}`)
    await controls.start({
      opacity: [1, 0, 1],
      transition: { duration: 1 }
    })
    setIsSpinning(false)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 pt-[200px] md:pt-[400px]">
      <div onClick={spinText} className="cursor-pointer text-2xl md:text-4xl transition-all hover:scale-125">
        <span className="">오늘의 메뉴는 ??</span>
      </div>

      {displayText && (
        <motion.div animate={controls} className="w-full flex items-center justify-center animate-fadeIn">
          <div className="bg-secondary rounded-full shadow-lg font-bold  min-w-full text-center py-2">
            <span className="text-primary text-2xl md:text-4xl">{displayText}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default RecommendFoodComponent
