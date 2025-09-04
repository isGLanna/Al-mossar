import { useState, useEffect } from 'react'
import { logoutUser } from '../../../templates/login/api'
import { GrLogout, FaCircleUser, IoIosPeople, FaMoneyBillTransfer } from "./icons"
import { getPhoto } from './api'
import './sidebar.scss'

type SidebarProps = {
  isOpen: boolean;
}


export function Sidebar({ isOpen }: SidebarProps) {
  const [photo, setPhoto] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if(isOpen) setOpen(prev => !prev)
  }, [isOpen])

  useEffect(() => {
    getPhoto().then(res => {
      if(res?.photo) setPhoto(res.photo)
    })
  }, [open])

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
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
          <li><a href="home">Página Principal</a></li>
          <li><a href="management">Gerenciar Funcionários</a></li>
          <li><a href="dashboard">Painel Financeiro</a></li>
          <li><a href="nutricion">Informações Nutricionais</a></li>
          <li><a href="personalize">Personalizar</a></li>
          <li><a href="about">Sobre</a></li>
          <li><a href="exit" onClick={logoutUser}>Sair</a></li>
        </ul>
      </nav>
    </div>
  )
}