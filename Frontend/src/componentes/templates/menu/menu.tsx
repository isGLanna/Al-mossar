import { UserProfile } from '../../organismos/topbar/user-profile'
import styles from '../../organismos/topbar/pseudo-topbar.module.scss'
import '../../moleculas/cardapio.module.scss';
import { MenuCalendar } from './menuCalendar'
import { getAuthData } from '../login/api'
import { menuQuery } from './api'

export function Menu() {

  // Puxa dados do usuário
  const authData = getAuthData()
  
  const { name, surname, role, type, employees } = authData || {}

  return (
    <div className='mt-[70px]'>
      <h3 className='h3' style={{textAlign:'center', paddingTop:'20px'}}>
        "Esse aí vai ser cozinheiro igual um dia eu vou ser o papa" — Jacquin
      </h3>

      <header>
        <UserProfile name={name} role={role} type={type}/>
      </header>

      <main>
        <MenuCalendar user='' work-team=''/>
      </main>

      <p>Se chegou até aqui, o login foi realizado com sucesso!</p>
    </div>
  );
}