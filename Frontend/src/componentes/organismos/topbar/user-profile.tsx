import { useNavigate } from '@tanstack/react-router'
import { logoutUser } from '../../templates/login/api'
import { GrLogout, FaCircleUser, IoIosPeople } from "./icons"
import styles from './pseudo-topbar.module.scss'
import { useState } from 'react'

type UserProfileProps = {
  name: string
  type: string
  role: string
}

export function UserProfile({name, type, role}: UserProfileProps){
  const navigate = useNavigate()
  const [ menuIsOpen, setMenuIsOpen ] = useState<boolean>(false)
  
  // lidar com open/close das configurações
  const handleSettings = () => {
    setMenuIsOpen(menuIsOpen => !menuIsOpen)
  }

  // Finalizar validade do token
  const handleLogout = () => {
    logoutUser();
    navigate({ to: '/' });
  };

  return(
    <div className={styles.pseudoTopbarContainer}>
      <div className={styles.iconGroup}>
        
        {type === 'enterprise' && (
          <IoIosPeople  className='icon' size={35} color='white'/>)}
        
        <div className={styles.userIconWrapper}>
          <FaCircleUser className='icon' size={35} color='white' onClick={handleSettings} />

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