import { Link, useNavigate } from '@tanstack/react-router'
import { loginUser, getToken } from './api';
import { useState, useEffect } from 'react'
import logo from '../../../assets/favicon.jpg'
import '../../moleculas/formulario.sass'
import '../../atomos/checkbox.sass'
import './styles.css';

export function Login() {
  const navigate = useNavigate()

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

  // Lidar com verificação do estado do token
  useEffect(() => {
    const token = getToken();
    
    if (token) {
      navigate({to: '/menu'});
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(user);

      if (response.token) {
        navigate({to: '/menu'})
      }
    } catch (err) {
      console.error('Falha no login:', err);
      alert('Acesso negado. Verifique seu email e senha.');
    }
  };

  return (
    
    <div className="container">

      <main className="formulario" style={{ color: 'var(--texto)'}}>
        <img src={logo} alt="Logo com comida" className="logotipo" />
        
        <form className="form-container" onSubmit={handleSubmit} style={{textAlign:'center', alignItems:'center'}}>
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
            <input
              type="submit"
              value="Entrar"
            />
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
