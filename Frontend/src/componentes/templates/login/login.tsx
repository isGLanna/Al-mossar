import { Link, useNavigate } from '@tanstack/react-router'
import { loginUser, getToken } from './api';
import { useState, useEffect } from 'react'
import logo from '../../../assets/favicon.jpg'
import '../../moleculas/formulario.sass'
import '../../atomos/checkbox.sass'
import './styles.sass';

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

  const [ emptyField, setEmptyField ] = useState<{ email: boolean; password: boolean}>({
    email: false,
    password: false,
  })

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

  // Lidar com entrada do usuário, caso exista campo vazio, negar acesso
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fields = {
      email: !user.email.trim(),
      password: !user.password.trim()
    }

    setEmptyField(fields)
  
    try {
      // Verifica condição campo *field.attribute* é vazio?
      if(fields.email || fields.password) return

      const response = await loginUser(user);

      if (response.token) {
        navigate({to: '/menu'})
      }
    } catch (err) {
      console.error('Falha no login:', err);
      setUser(user => ({
        ...user, email: '', password: ''}));

      alert('Email ou senha inválidos.');
    }
      
  };

  return (
    
    <div className="container" style={{position:'fixed'}}>

      <main className="formulario" style={{ marginTop:'0px' }}> {/* Formulário sendo centralizado na marra*/}
        <img src={logo} alt="Logo com comida" className="logoLogin" />
        
        <form className="form-container" onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              className={emptyField.email ? 'empty-login' : ''}
              type="email"
              name="email"
              placeholder="Digite seu email"
              autoComplete='current-password'
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Senha</label>
            <input
              className={emptyField.password ? 'empty-login' : ''}
              type="password"
              name="password"
              placeholder="Digite sua senha"
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
            {( emptyField.email || emptyField.password ) && <span>Preencha todos os campos</span>}
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
