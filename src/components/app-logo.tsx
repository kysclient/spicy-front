import Link from 'next/link'

const AppLogo = () => {
  return (
    <Link href={'/'} className="flex flex-row items-center gap-1">
      <img src="/app-logo.png" alt="logo" className="w-[70px] sm:w-[120px]" />
    </Link>
  )
}

export default AppLogo
