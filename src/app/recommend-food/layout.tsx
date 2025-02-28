import MainContainer from '@/components/containers/main-container'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <MainContainer>{children}</MainContainer>
}
