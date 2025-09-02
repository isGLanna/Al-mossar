import './topbar.sass'
import logo from './assets/logo_topbar.png'

export function TopBar() {
  return (
    <div className='window'>
      <img className='titulo' src={logo} alt="Logo Al-Mossar"/>
    </div>
  )
}
