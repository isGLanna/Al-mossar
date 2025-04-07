import { UserProfile } from '../../organismos/topbar/user-profile'
import styles from '../../organismos/topbar/pseudo-topbar.module.scss'
import '../../moleculas/cardapio.module.scss';
import { MenuCalendar } from './calendar'
import { menuQuery } from './api'

export function Menu() {
  return (
    <div>
      <div className={styles.buttonContainer}>
        <UserProfile />
      </div>

      <MenuCalendar />

      <p>Se chegou até aqui, o login foi realizado com sucesso!</p>
    </div>
  );
}