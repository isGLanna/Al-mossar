import { TopBar } from '../../organismos/topbar'
import { ReactNode } from 'react'
import { Employee } from '../../../models/Employee'
import '../../atomos/scrollbar.sass'

interface Props {
  children: ReactNode
  employee: Employee | null
}

export function RootLayout({ children, employee  }: Props) {

  return (
    <>
      <TopBar employee={employee} />
      <div className="mt-[70px] relative">{children}</div>
    </>
  )
}