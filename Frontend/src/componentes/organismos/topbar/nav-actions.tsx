import { useNavigate } from '@tanstack/react-router'
import { logoutUser } from '../../templates/login/api'
import { GrLogout, FaCircleUser, IoIosPeople, FaMoneyBillTransfer } from "./icons"
import { EmployeePanel } from './panel'
import styles from './pseudo-topbar.module.scss'
import { useState, useEffect } from 'react'
import { getUser } from './api'
import { Employee } from '../../../models/Employee'
import { Sidebar } from './sidebar/sidebar.tsx'
import './topbar.scss'

export function NavActions(){
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [panelIsOpen, setPanelIsOpen] = useState(false)
  const [employee, setEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    async function fetchEmployee() {
      const emp = await getUser()
      if (emp)
        setEmployee(emp)
    }
    fetchEmployee()
  }, [navigate])

  const handleSettings = () => {
    setMenuIsOpen(prev => !prev)
  }

  const handlePanel = () => {
    setPanelIsOpen(prev => !prev)
  }

  const handleLogout = () => {
    logoutUser()
    setEmployee(null)
    navigate({ to: '/' })
  }

  const handleDashBoard = () => {
    navigate({ to: '/dashboard' })
  }

  return (
    <div className="navbar">
      <div className={styles.iconGroup}>
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
      </div>
      
      <div className={styles.iconGroup}>
        {employee && (
          <>
            <FaMoneyBillTransfer className="icon" size={30} onClick={handleDashBoard} />
            <EmployeePanel 
              isOpen={panelIsOpen} 
              employee={employee} 
              onClose={() => setPanelIsOpen(false)} 
            />
            <IoIosPeople className="icon" size={35} onClick={handlePanel} />
          </>
        )}

        <div className={styles.userIconWrapper}>
          {employee && (
            <>
              <FaCircleUser className="icon" size={35} onClick={handleSettings} />
              <div className={`${styles.menu} ${menuIsOpen ? styles.open : ''}`}>
                <div className={styles.item}>Perfil</div>
                <div className={styles.item} onClick={handleLogout}>
                  <GrLogout style={{ marginRight: '5px' }}/>
                  <label>Sair</label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
