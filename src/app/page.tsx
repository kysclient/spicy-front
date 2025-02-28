import MainContainer from '@/components/containers/main-container'
import SementleComponent from '@/components/sementle-page/sementle-component'

export default function Home() {
  return (
    <MainContainer>
      <section className="max-w-[600px] mx-auto">
        <SementleComponent />
      </section>
    </MainContainer>
  )
}
