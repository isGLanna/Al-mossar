import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import '../../moleculas/formulario.sass'
import logo from '../../../assets/favicon.jpg'
import './styles.css';
import '../../atomos/checkbox.sass'

export function Login() {

  type User = {
    email: string;
    password: string;
    remember: boolean;
  };

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setUser({
        ...user,
        [name]: checked,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  return (
    <div className="container">
      <main className="formulario" style={{ color: 'var(--texto)'}}>
        <img src={logo} alt="Logo com comida" className="logotipo" />
        
        <form className="form-container" style={{textAlign:'center', alignItems:'center'}}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              style={{ fontWeight: '400' }}
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              style={{ fontWeight: '400' }}
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className='checkbox'>
            <label style={{fontWeight:'400'}}>
              <input
                type="checkbox"
                name="remember"
                checked={user.remember}
                onChange={handleChange}
                style={{padding:'0px'}}
              />
              Manter conectado
            </label>
          </div>

          <div className='form-group'>
            <Link to='/menu' >
              <input
                type="submit"
                value="Entrar"
              />
            </Link>
          </div>

          <div>
            <Link to="/create-account">Criar conta</Link>
          </div>

          {/* FUNCIONALIDADE SERÁ CRIADA FUTURAMENTE */}
          <div>
            <Link to="/create-account">Cadastrar corporação</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
