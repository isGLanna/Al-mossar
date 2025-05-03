import { useNavigate } from '@tanstack/react-router'
import { logoutUser } from '../../templates/login/api'
import { GrLogout, FaCircleUser, IoIosPeople, FaMoneyBillTransfer } from "./icons"
import { EmployeePanel } from '../../templates/menu/panel'
import styles from './pseudo-topbar.module.scss'
import { useState } from 'react'
import { Employee } from '../../../models/Employee'

type Props = {
  employee: Employee
}

export function EnterpriseProfile({ employee }: Props){
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
    navigate({ to: '/financial-control' }); // Agora passando um objeto com 'to'
  }

  return(
    <div className={styles.pseudoTopbarContainer}>
      <div className={styles.iconGroup}>
          {employee.canAccessEmployeePanel() && (
          <>
            <FaMoneyBillTransfer className='icon' size={25} onClick={handleDashBoard} />
            <IoIosPeople className='icon' size={35} color='white' onClick={handlePanel} />
            <EmployeePanel isOpen={panelIsOpen} employee={employee} onClose={() => setPanelIsOpen(false)} />
          </>
        )}
        
        <div className={styles.userIconWrapper}>
          <FaCircleUser className='icon' size={35} onClick={handleSettings} />

          <div className={`${styles.menu} ${menuIsOpen ? styles.open : ''}`}>
            <div className={styles.item}>Perfil</div>
            <div className={styles.item} onClick={handleLogout}>
              <GrLogout style={{marginRight: '5px'}}/>
              <label>Sair</label>
            </div>
          </div>
        </div>

      </div>


      
    </div>
  )

}