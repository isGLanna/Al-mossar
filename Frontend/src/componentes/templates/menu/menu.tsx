import { NavActions } from '../../organismos/topbar/nav-actions'
import { DailyMenu } from './daily-menu.tsx'
import '../../moleculas/menu/menu.scss'
import '../../atomos/button.scss'

export function Menu() {
  return (
    <div>
      <NavActions />
      <div className='mt-[65px]'>

        <DailyMenu />

      <footer>
      </footer>
      </div>
    </div>
  );
}