import './topbar.scss'
import logo from './assets/logo_topbar.png'
import { useNavigate } from '@tanstack/react-router'

export function TopBar() {
  const navigate = useNavigate()

  const redirectMenu = () => {
    navigate({to: '/menu'})
  }

  return (
    <div className='window'>
      <img className='titulo' src={logo} alt="Logo Al-Mossar" onClick={redirectMenu}/>
    </div>
  )
}
