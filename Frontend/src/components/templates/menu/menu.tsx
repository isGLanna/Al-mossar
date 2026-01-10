import { NavActions } from '../../organisms/topbar/nav-actions.tsx'
import { DailyMenu } from './daily-menu.tsx'
import '../../atoms/button.scss'

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