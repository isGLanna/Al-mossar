import { TopBar } from '../../organisms/topbar/index.ts'
import { ReactNode } from 'react'
import '../../atoms/scrollbar.sass'
import {ChatIcon} from "../../atoms/chat-icon/chat-icon.tsx";

interface Props {
  children: ReactNode
}

export function RootLayout({ children }: Props) {

  return (
    <>
      <TopBar />
      <div className="mt-[65px] relative">{children}</div>
      <ChatIcon/>
    </>
  )
}