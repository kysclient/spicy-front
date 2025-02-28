'use client'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

interface AnswersTableProps {
  data: any[]
}

const AnswersTable = ({ data }: AnswersTableProps) => {
  if (data.length === 0) return null
  return (
    <Table>
      <TableCaption>정답자</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">문제</TableHead>
          <TableHead className="">닉네임</TableHead>
          <TableHead className="">정답</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data, idx) => (
          <TableRow key={data.answer}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell className="font-medium">{data.user}</TableCell>
            <TableCell>{data.answer}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default React.memo(AnswersTable)
