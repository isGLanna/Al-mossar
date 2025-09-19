import './topbar.scss'
import logo from './assets/logo_topbar.png'
import { useNavigate } from '@tanstack/react-router'

export function TopBar() {
  const navigate = useNavigate()

  const handleExit = () => {
    navigate({ to: '/' })
  }

  return (
    <div className='window'>
      <img className='titulo' src={logo} alt="Logo Al-Mossar"/>
    </div>
  )
}
