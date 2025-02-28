import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  const parsedDate = new Date(date) // 문자열을 Date 객체로 변환

  if (isNaN(parsedDate.getTime())) {
    return
  }

  const year = parsedDate.getFullYear() // parsedDate 사용
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
  const day = String(parsedDate.getDate()).padStart(2, '0')
  const hours = String(parsedDate.getHours()).padStart(2, '0')
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}