import { useState, useEffect } from 'react'
import { logoutUser } from '../../../templates/login/api'
import { useNavigate } from '@tanstack/react-router'
import { GrLogout, FaCircleUser, IoIosPeople, FaMoneyBillTransfer, BiSolidPaintRoll, BiFoodMenu, FcAbout, ImHome } from "./icons"
import { getPhoto } from './api'
import './sidebar.scss'

type SidebarProps = {
  isOpen: boolean;
}


export function Sidebar({ isOpen }: SidebarProps) {
  const [photo, setPhoto] = useState<string | null>(null)
  const [showNav, setShowNav] = useState<boolean>(isOpen)
  const navigate = useNavigate()

  useEffect(() => {
    if(!photo && isOpen)
      getPhoto().then(res => setPhoto(res.photo))
    

    isOpen ? 
      setShowNav(true) :
      setTimeout(() => { setShowNav(false)}, 250)
      
  }, [isOpen])

  const handleLogout = () => {
    logoutUser()
    setPhoto(null)
    navigate({ to: '/'})
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {showNav && (
      <nav>
        <ul>
          <div className='profile-container'>
            {photo ? 
            (<img src={photo} alt="" />) : 
            (<FaCircleUser className='img' size={50} />)}
            <div className='profile-content'>
              <label>Nome do usuário</label>
              <label>Cargo</label>
            </div>
          </div>
          <li><ImHome size={20}/>Página Principal</li>
          <li><IoIosPeople size={20}/> Painel de Funcionários</li>
          <li><FaMoneyBillTransfer size={20}/> Dashboard Financeiro</li>
          <li><BiFoodMenu /> Informação Nutricional</li>
          <li><BiSolidPaintRoll size={20}/> Personalizar</li>
          <li><FcAbout size={20} /> Sobre</li>
          <li onClick={handleLogout}> <GrLogout size={20}/>Sair</li>
        </ul>
      </nav>
      )}
    </div>
  )
}