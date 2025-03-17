import { TopBar } from '../../organismos/topbar'
import { ReactNode } from '@tanstack/react-router'

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