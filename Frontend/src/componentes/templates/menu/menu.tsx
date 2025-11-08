import { NavActions } from '../../organismos/topbar/nav-actions'
import { DailyMenu } from './daily-menu.tsx'
import '../../moleculas/menu/menu.scss'
import '../../atomos/button.scss'

export function Menu() {
  return (
    <div>
      <NavActions />
      <div className='mt-[65px]'>
        <h3 className='h3' style={{textAlign:'center', paddingTop:'20px'}}>
          "Esse aí vai ser cozinheiro igual um dia eu vou ser o papa" — Jacquin
        </h3>

        <main>
          <DailyMenu />
        </main>

      <footer>
      </footer>
      </div>
    </div>
  );
}