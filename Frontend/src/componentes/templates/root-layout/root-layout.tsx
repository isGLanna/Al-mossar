import { TopBar } from '../../organismos/topbar'
import { ReactNode } from 'react'
import '../../atomos/scrollbar.sass'
import {ChatIcon} from "../../atomos/chat-icon/chat-icon.tsx";

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