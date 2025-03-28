import { logoutUser } from '../../templates/login/api';
import { useNavigate } from '@tanstack/react-router';
import { FaCircleUser } from "react-icons/fa6";
import '../../moleculas/cardapio.module.scss';
import '../../moleculas/pseudo-topbar.scss';

export function Menu() { 
  const navigate = useNavigate();

  // Finalizar validade do token
  const handleLogout = () => {
    logoutUser();
    navigate({ to: '/' });
  };

  return (
    <div>
      <div className="button-container">
        <FaCircleUser size={35} color='white'/>
        <button className="btn" onClick={handleLogout}>Sair</button>
      </div>

      <p>Se chegou até aqui, o login foi realizado com sucesso!</p>
    </div>
  );
}