'use client'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, formatDate } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import React from 'react'

interface SementleTableProps {
  data: any[]
}

const SementleTable = ({ data }: SementleTableProps) => {
  if (data.length === 0) return null

  const sortedData = data.sort((a: any, b: any) => b.createdAt - a.createdAt)
  const [latestData, ...remainingData] = sortedData
  const sortedRemainingData = remainingData.sort((a: any, b: any) => b.similarity - a.similarity)

  return (
    <Table>
      <TableCaption>마지막 추측 - {latestData && formatDate(latestData.createdAt)}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">#</TableHead>
          <TableHead className="w-[100px]">추측한 단어</TableHead>
          <TableHead>유사도</TableHead>
          <TableHead className="">유사도 순위</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-b">
          <TableCell>{latestData.place}</TableCell>
          <TableCell className="font-medium text-primary">{latestData.guess}</TableCell>
          <TableCell>{latestData.similarity}</TableCell>
          <TableCell className="flex flex-row items-center gap-2">
            <span className={cn('flex-1 whitespace-nowrap font-bold', !latestData.rank.toString().includes('?') ? (latestData.rank === 1 ? 'text-[#1d9bf0]' : 'text-[#f58ef5]') : '')}>{latestData.rank === 1 ? '정답!!' : latestData.rank}</span>
            <Progress value={latestData.similarity} className="max-w-[120px]" />
          </TableCell>
        </TableRow>
        {sortedRemainingData.map((data, idx) => (
          <TableRow key={data.createdAt}>
            <TableCell>{data.place}</TableCell>
            <TableCell className="font-medium">{data.guess}</TableCell>
            <TableCell>{data.similarity}</TableCell>
            <TableCell className="flex flex-row items-center gap-2">
              <span className={cn('flex-1 whitespace-nowrap font-bold', !data.rank.toString().includes('?') ? (data.rank === 1 ? 'text-[#1d9bf0]' : 'text-[#f58ef5]') : '')}>{data.rank === 1 ? '정답!!' : data.rank}</span>
              <Progress value={data.similarity} className="max-w-[120px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SementleTable
