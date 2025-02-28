'use client'
import { GalleryVerticalEnd } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AppLogo from '../app-logo'
import Link from 'next/link'

export function SigninForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [username, setUsername] = useState('')
  const [openQuiz, setOpenQuiz] = useState(false)
  const [answer, setAnswer] = useState('')
  const router = useRouter()

  const handleSignIn = () => {
    window.alert('되겠냐고')
  }

  const handleLogin = () => {
    if (answer !== '윈터') {
      window.alert('나가')
      setAnswer('')
      return
    }
    localStorage.setItem('username', username)
    setOpenQuiz(false)
    router.replace('/')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      if (username.length < 2) {
        window.alert('2글자는 넘겨주세요...')
        return
      }
      setOpenQuiz(true)
    }
  }

  const handleAnswerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      handleLogin()
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link href={'/'}>
              <img src="/app-logo.png" className="w-[180px]" />
            </Link>
            <h1 className="text-xl font-bold">
              Welcome to <span className="text-primary font-bold">Spicy</span>
            </h1>
            <div className="text-center text-sm">
              아직 회원이 아니신가요?{' '}
              <button
                type="button"
                onClick={() => {
                  window.alert('사실 아직 회원가입 기능같은거 없음 ㅋ')
                }}
                className="underline underline-offset-4"
              >
                회원가입
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">닉네임</Label>
              <Input
                onKeyDown={handleKeyDown}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                id="email"
                type="text"
                placeholder="알아볼 수 있는 닉네임"
                required
              />
            </div>
            <Dialog open={openQuiz} onOpenChange={setOpenQuiz}>
              <Button
                onClick={() => {
                  if (username.length < 2) {
                    window.alert('2글자는 넘겨주세요...')
                    return
                  }
                  setOpenQuiz(true)
                }}
                type="button"
                className="w-full"
              >
                로그인
              </Button>
              <DialogContent className="w-full">
                <DialogHeader>
                  <DialogTitle>서비스 이용 절차</DialogTitle>
                  <DialogDescription>잘못 대답하면 강퇴당할 수 있음 주의.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4 justify-center w-full items-center">
                  <div className="flex justify-center items-center w-[70px] h-[70px] rounded-full overflow-hidden border border-border">
                    <img src="/master.png" alt="휘" className="blur-sm" />
                  </div>
                  <Label>누구게요?</Label>
                  <div className="w-full">
                    <Input
                      onKeyDown={handleAnswerKeyDown}
                      placeholder="정답"
                      value={answer}
                      onChange={(e) => {
                        setAnswer(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleLogin}>확인</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button onClick={handleSignIn} variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor" />
              </svg>
              애플로 로그인
            </Button>
            <Button onClick={handleSignIn} variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
              </svg>
              구글로 로그인
            </Button>
          </div>
        </div>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        계속 진행하면 <Link href="/terms">서비스 이용약관</Link> 및 <Link href="/privacy">개인정보 처리방침</Link>에 동의하는 것으로 간주됩니다.
      </div>
    </div>
  )
}
