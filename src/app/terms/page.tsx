import MainContainer from '@/components/containers/main-container'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function Privacy() {
  return (
    <MainContainer>
      <section className="max-w-[600px] mx-auto">
        <div className="space-y-6 flex flex-col w-full px-4 pt-[20px]">
          <div className="">
            <h3 className="text-lg font-medium">서비스 이용 약관</h3>
          </div>
          <Separator />
          <Link className='text-primary' href={'https://www.somoim.co.kr/e03ab496-0dd3-11ee-8cf5-0a16fe5c82071'}>https://www.somoim.co.kr/e03ab496-0dd3-11ee-8cf5-0a16fe5c82071</Link>
          <p>가입하면 이용 가능</p>
        </div>
      </section>
    </MainContainer>
  )
}
