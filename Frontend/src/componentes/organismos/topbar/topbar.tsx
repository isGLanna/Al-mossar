import './topbar.scss'
import logo from './assets/logo_topbar.png'
import { useNavigate } from '@tanstack/react-router'
import { useContext } from 'react'
import { UserStateContext } from '../../../context/user-login-context'

export function TopBar() {
  const navigate = useNavigate()
  const {login} = useContext(UserStateContext)

  const redirectMenu = () => {
    if (login){
      navigate({to: '/menu'})
    }
  }

  return (
    <div className='window'>
      <img className='titulo' src={logo} alt="Logo Al-Mossar" onClick={redirectMenu}/>
    </div>
  )
}
