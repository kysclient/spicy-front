import MainContainer from '@/components/containers/main-container'
import dynamic from 'next/dynamic'

const SementleComponent = dynamic(() => import('@/components/sementle-page/sementle-component'), {})

export default function Home() {
  return (
    <MainContainer>
      <section className="max-w-[600px] mx-auto">
        <SementleComponent />
      </section>
    </MainContainer>
  )
}
