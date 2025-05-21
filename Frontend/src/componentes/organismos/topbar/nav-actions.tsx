import { useNavigate } from '@tanstack/react-router'
import { logoutUser } from '../../templates/login/api'
import { GrLogout, FaCircleUser, IoIosPeople, FaMoneyBillTransfer } from "./icons"
import { EmployeePanel } from '../../templates/menu/panel'
import styles from './pseudo-topbar.module.scss'
import { Employee } from '../../../models/Employee'
import { useState } from 'react'


type Props = {
  employee: Employee
}

export function NavActions({ employee }: Props){
  const navigate = useNavigate()
  const [ menuIsOpen, setMenuIsOpen ] = useState<boolean>(false)
  const [ panelIsOpen, setPanelIsOpen ] = useState<boolean>(false)
  
  // lidar com open/close das configurações
  const handleSettings = () => {
    setMenuIsOpen(menuIsOpen => !menuIsOpen)
  }

  // Lidar com open/close do painel de empregados
  const handlePanel = () => {
    setPanelIsOpen(panelIsOpen => !panelIsOpen)
  }

  // Finalizar validade do token
  const handleLogout = () => {
    logoutUser();
    navigate({ to: '/' });
  }

  const handleDashBoard = () => {
    navigate({ to: '/dashboard' })
  }

  return(
    
    <div className='navbar'>

      <div className={styles.iconGroup}>
          {employee.canAccessEmployeePanel() && (
          <>
            <FaMoneyBillTransfer className='icon' size={30} onClick={handleDashBoard} />
            <EmployeePanel isOpen={panelIsOpen} employee={employee} onClose={() => setPanelIsOpen(false)} />
            <IoIosPeople className='icon' size={35} onClick={handlePanel} />
          </>
        )}
        
        <div className={styles.userIconWrapper}>
          {employee.haveProfile() && (
          <>
            <FaCircleUser className='icon' size={35} onClick={handleSettings} />
              <div className={`${styles.menu} ${menuIsOpen ? styles.open : ''}`}>
              <div className={styles.item}>Perfil</div>
              <div className={styles.item} onClick={handleLogout}>
                <GrLogout style={{marginRight: '5px'}}/>
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