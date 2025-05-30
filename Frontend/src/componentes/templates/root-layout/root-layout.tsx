import { TopBar } from '../../organismos/topbar'
import { ReactNode } from 'react'
import '../../atomos/scrollbar.sass'

interface Props {
  children: ReactNode
}

export function RootLayout({ children }: Props) {

  return (
    <>
      <TopBar />
      <div className="mt-[70px] relative">{children}</div>
    </>
  )
}