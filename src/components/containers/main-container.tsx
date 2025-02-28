'use client'

import Footer from '../footer'
import Header from '../header'

interface PropsType {
  children: React.ReactNode
}

export default function MainContainer({ children }: PropsType) {
  return (
    <div id="mainContainer" className="w-full flex flex-col">
      <Header />
      <main className="pt-[80px] min-h-[calc(100vh-80px)] flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
