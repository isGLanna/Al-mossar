import { useState, useEffect, useContext } from 'react'
import { logoutUser } from '../../templates/login/api'
import { useNavigate } from '@tanstack/react-router'
import { GrLogout, FaCircleUser, IoIosPeople, FaMoneyBillTransfer, BiSolidPaintRoll, BiFoodMenu, FcAbout, ImHome } from "./icons"
import { UserStateContext } from '../../../context/user-login-context'
import { EmployeePanel } from '../panel/employee-panel'
import { createEmployee } from '../../../models/EmployeeFactory'
import { Employee } from '../../../models/Employee'
import { getPhoto, getUser } from './api'
import './sidebar.scss'

type SidebarProps = {
  isOpen: boolean;
}


export function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<string | null>(null)
  const [showNav, setShowNav] = useState<boolean>(isOpen)
  const [user, setUser] = useState<{ email: string, name: string, surname: string, role: string } | null>(null)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [paneIslOpen, setIsPanelIsOpen] = useState<boolean>(false)
  const { login, setLogin } = useContext(UserStateContext)

  // Consultar quando sidebar for aberto
  useEffect(() => {
    if(!photo && isOpen){
      getPhoto().then(res => setPhoto(res.photo))
      getUser().then(res => setUser(res))
    }

    isOpen ? 
      setShowNav(true) :
      setTimeout(() => { setShowNav(false)}, 250)

  }, [isOpen])

  const handleLogout = () => {
    logoutUser()
    setPhoto(null)
    setLogin(false)
    navigate({ to: '/'})
  }

  const toggleEmployeePanel = () => {
    if (user) {
      const employee = createEmployee(user.email, user.name, user.surname, user.role)
      setEmployee(employee)
    }
    setIsPanelIsOpen(prev => !prev)
  }

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {showNav && (
        <nav>
          <ul>
            <div className='profile-container'>
              {photo ? 
                (<img src={photo} alt="" />) : 
                (<FaCircleUser className='img' size={50} />)}
              <div className='profile-content'>
                <label>{user ? `${user.name} ${user.surname}` : ''}                              </label>
                <label>{user ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : ''} </label>
              </div>
            </div>
            <li onClick={() => navigate({to:'/menu'})}>     <ImHome size={18}/>Página Principal                   </li>
            <li onClick={toggleEmployeePanel}>              <IoIosPeople size={20}/> Painel de Funcionários       </li>
            <li onClick={() => navigate({to:'/dashboard'})}><FaMoneyBillTransfer size={20}/> Dashboard Financeiro </li>
            <li>                                            <BiFoodMenu /> Informação Nutricional                 </li>
            <li>                                            <BiSolidPaintRoll size={20}/>Personalizar             </li>
            <li>                                            <FcAbout size={20} />Sobre                            </li>
            <li onClick={handleLogout}>                     <GrLogout size={20}/>Sair                             </li>
          </ul>
        </nav>
        )}
      </div>
      {employee && (
        <EmployeePanel 
          isOpen={paneIslOpen} 
          employee={employee} 
          onClose={() => setIsPanelIsOpen(false)}/>
      )}
    </>
  )
}