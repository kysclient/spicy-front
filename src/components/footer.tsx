import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center px-2 mt-[20px]">
      <div className="flex flex-row gap-[20px] mb-[20px] flex-wrap items-center justify-center">
        {footerLinks.map((item, idx) => (
          <Link href={item.href} key={idx} className="hover:underline relative text-muted-foreground text-[12px]">
            {item.title}
          </Link>
        ))}
      </div>
      <span className="text-muted-foreground text-[12px]">© 2025 Spicy from Kim Yu Shin</span>
    </footer>
  )
}

export default Footer

export const footerLinks = [

  {
    title: '개인정보처리방침',
    href: '/privacy'
  },
  {
    title: '서비스이용약관',
    href: '/terms'
  },
  {
    title: '문의하기',
    href: 'https://open.kakao.com/o/sEErsbte'
  },
  
]
