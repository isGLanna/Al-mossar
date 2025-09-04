import './topbar.scss'
import logo from './assets/logo_topbar.png'
import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar/sidebar.tsx'
import { useAuthStore } from '../../../store/auth-store.ts'

export function TopBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const user = useAuthStore(state => state.user)



  return (
    <div className='window'>
      <div className='left'>
        {user?.hasUser && user?.hasLogged ? (
        <>
          <div
            id="nav-icon3"
            className={isSidebarOpen ? "open" : ""}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Sidebar isOpen={isSidebarOpen} />
        </>
        ) : null}
      </div>
      <img className='titulo' src={logo} alt="Logo Al-Mossar"/>
    </div>
  )
}
