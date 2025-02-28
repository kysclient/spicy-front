'use client'
import { useState } from 'react'
import { Separator } from '../ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '../ui/input'
import { Compass, Loader2, Search } from 'lucide-react'
import { Button } from '../ui/button'
import SementleTable from './sementle-table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import AnswersTable from './answers-table'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const SementleComponent = () => {
  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [explanation, setExplanation] = useState('')
  const [similarity, setSimilarity] = useState<number | null>(null)
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : ''
  const isOwner = username === 'topten'
  const guessList = typeof window !== 'undefined' ? localStorage.getItem('guessList') : '[]'
  const [guessData, setGuessData] = useState<any[]>(guessList ? JSON.parse(guessList) : [])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem('currentIndex') ?? '0' : '0')
  const [answers, setAnswers] = useState<any[]>([])
  const [showAnswerResult, setShowAnswerResult] = useState(false)
  const [hints, setHints] = useState([])

  const checkValidation = () => {
    if (word2.length < 1) {
      window.alert('단어는 최소 1글자 이상입니다.')
      return false
    }
    if (!/^[가-힣]+$/.test(word2)) {
      window.alert('한국어만 입력해주세요.')
      return false
    }
    return true
  }

  const checkSimilarity = async () => {
    if (!checkValidation()) {
      return
    }
    if (loading) return
    setLoading(true)
    if (showAnswerResult) {
      setGuessData([])
      setShowAnswerResult(false)
    }
    const res = await fetch('/api/similarity', {
      method: 'POST',
      body: JSON.stringify({ word1, word2, isOwner, username }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    if (data) {
      if (data.error) {
        setError(data.error)
      } else {
        if (parseInt(currentIndex) !== parseInt(data.questionIndex)) {
          if (data.answers.length > 0) {
            if (data.answers[data.answers.length - 1].user === username) {
              setShowAnswerResult(true)
              localStorage.removeItem('guessList')
            } else {
              setOpenAlert(true)
              setGuessData([])
              localStorage.removeItem('guessList')
            }
          } else {
            setOpenAlert(true)
            setGuessData([])
            localStorage.removeItem('guessList')
          }
        } else {
          const similarity = (data.similarity * 100).toFixed(2)

          setGuessData((prev: any[]) => {
            if (prev.some((item) => item.guess === word2)) {
              return prev
            }

            const place = prev.length > 0 ? prev.length + 1 : 1
            const updatedGuessData = [{ similarity, guess: word2, rank: data.rank, createdAt: new Date(), place: place }, ...prev.sort((a: any, b: any) => a.similarity - b.similarity)]

            localStorage.setItem('guessList', JSON.stringify(updatedGuessData))

            return updatedGuessData
          })

          setExplanation(data.explanation)
        }
        localStorage.setItem('currentIndex', data.questionIndex)
        setCurrentIndex(data.questionIndex)
        setAnswers((prev) => {
          const updatedAnswers = [...prev, ...data.answers].filter((value, index, self) => self.findIndex((v) => v.user === value.user && v.answer === value.answer) === index)
          return updatedAnswers
        })
        setHints(data.similar_words)
        setError('')
      }
    }
    setLoading(false)
    setWord2('')
  }
  return (
    <div className="space-y-6 flex flex-col w-full px-4 pt-[20px]">
      <div className="">
        <h3 className="text-lg font-medium">씨멘틀 Extreme - 단어 유사도 추측 게임</h3>
        {explanation && <p className="text-sm text-muted-foreground">{explanation}</p>}
      </div>
      <Separator />

      <div className="space-y-4 flex flex-col items-center w-full">
        <div className="relative w-full">
          <Compass className="absolute top-3.5 left-3 w-5 h-5 text-muted-foreground" />
          <Input
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                checkSimilarity()
              }
            }}
            value={word2}
            onChange={(e) => {
              setWord2(e.target.value)
            }}
            maxLength={10}
            placeholder="Enter a word..."
            className="h-[46px] pl-10 rounded-full w-full bg-secondary transition-all hover:bg-secondary/80"
          />
          {error && <p className="animate-fadeIn text-destructive-foreground text-sm mt-1">{String(error)}</p>}
        </div>
        <div className="flex flex-row justify-around items-center w-full gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'secondary'} className="w-full rounded-lg">
                힌트
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-lg bg-background">
              <div className="grid grid-cols-2 gap-4">
                {hints.length > 0 ? (
                  hints.map((hint, idx) => (
                    <div key={hint} className="flex flex-row items-center gap-2">
                      <span>{`1${idx}`}위</span>
                      <span>{hint}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex w-full justify-center items-center py-4">
                    <p className="text-center">힌트가 없습니다.</p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button disabled={loading} onClick={checkSimilarity} variant={'default'} className="w-full rounded-lg">
            {loading && <Loader2 className="animate-spin" />}
            추측
          </Button>
        </div>
        <p className="animate-fadeIn text-muted-foreground text-sm mt-1 self-start">Chill하지 못하신분들을 위한 힌트!</p>

      </div>

      {showAnswerResult && (
        <div className="flex flex-col space-y-4 w-full bg-secondary rounded-lg p-4 animate-fadeIn">
          <p>
            축하합니다! {parseInt(currentIndex) - 1}번째 문제를 {guessData?.length}번째 추측만에 정답을 맞혔네요!
          </p>

          <Button
            onClick={() => {
              setGuessData([])
              setShowAnswerResult(false)
            }}
          >
            계속 진행하기
          </Button>

          <p>현재 진행상황</p>
          <div className="flex flex-col">
            <AnswersTable data={answers} />
          </div>
        </div>
      )}

      {guessData.length > 0 && (
        <div className="w-full animate-fadeIn">
          <SementleTable data={guessData} />
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium">FAQ</h3>

        <Accordion type="single" collapsible className="w-full">
          {faqList.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx + 1}`}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent>{faq.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {answers.length > 0 && currentIndex && !isNaN(parseInt(currentIndex)) && parseInt(currentIndex) > 0 && (
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span>
                  🎉 <span className="text-[#f58ef5]">{answers[parseInt(currentIndex) - 2]?.user}님이</span> {parseInt(currentIndex)}번째 문제 정답을 맞추셨습니다🎉
                </span>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>문제는 계속됩니다.</AlertDialogDescription>
            <div>
              {parseInt(currentIndex)}번째 문제의 정답은 <span className="text-[#1d9bf0]">{answers[parseInt(currentIndex) - 2]?.answer}</span>였습니다..!
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>닫기</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

export default SementleComponent

const faqList = [
  {
    title: '플레이하는 방법은 무엇인가요?',
    description: '목표는 비밀 단어를 추측하는 것입니다. 각 추측은 하나의 단어여야 합니다. Semantle은 당신의 추측이 비밀 단어와 의미상 얼마나 유사한지 알려줄 것입니다. 다른 단어 게임과 달리 이 게임은 철자법에 관한 것이 아닙니다. 그것은 의미에 관한 것입니다. 우리는 대규모 한글 모델을 바탕으로 Wikipedia의 빈도수가 높은 한글 10000개 단어를 추출하여, Kiwi 기술을 활용하여 형태소분석 후 의미있는 정답 리스트 5000가지를 뽑아내며, 인공지능(특히 fasttext 기술)을 사용하여 이 의미를 계산합니다. fasttext에서 각 단어는 다른 단어와의 측정 가능한 의미적 거리를 갖고 있어 관련성 수준을 나타냅니다. 비밀 단어를 5000 단어 이내로 얻으면 근접성 열에서 알려드립니다. 당신은 무제한의 추측을 할 수 있습니다! 행운을 빌어요!'
  },
  {
    title: '새로운 단어는 언제 나오나요?',
    description: '누군가 정답을 맞추면 바로 랜덤한 다음 단어 문제로 넘어가게 됩니다. 현재까지 추측한 단어들은 초기화됩니다.'
  },
  {
    title: '누가 Semantle을 운영하나요?',
    description: 'Gæl.lɛ'
  }
]
