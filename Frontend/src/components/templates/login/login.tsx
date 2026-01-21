import { Link, useNavigate } from '@tanstack/react-router'
import { loginUser, getUserByToken } from './api';
import { useState, useEffect, useContext } from 'react'
import { UserStateContext } from '../../../context/user-login-context'
import Logo from './sub-templates/logo'
import '../../molecules/formulario.scss'
import '../../atoms/checkbox.sass'
import '../../atoms/spinner.sass'

export function Login() {
  const navigate = useNavigate()
  const {setLogin} = useContext(UserStateContext)
  const [checkingToken, setCheckingToken] = useState(true)
  const [loading, setLoading] = useState(false)

  type credentials = {
    email: string;
    password: string;
    remember: boolean;
  }

  const [credentials, setcredentials] = useState<credentials>({
    email: '',
    password: '',
    remember: false,
  })

  const [ emptyField, setEmptyField ] = useState<{ email: boolean; password: boolean}>({
    email: false,
    password: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setcredentials({
        ...credentials,
        [name]: checked,
      })
    } else {
      setcredentials({
        ...credentials,
        [name]: value,
      })
      setEmptyField(prev => ({
        ...prev,
        [name]: false
      }))
    }
  }

  // Lidar com verificação do estado do token
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await getUserByToken()

        if (response.success && response.employee){
          setLogin(true)
          navigate({ to: '/menu'})
        }
        } finally {
          setCheckingToken(false)
        }
      }
    autoLogin()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fields = {
      email: !credentials.email.trim(),
      password: !credentials.password.trim()
    }

    setEmptyField(fields)

    if(fields.email || fields.password) return

    setLoading(true)
  
    try {
      const response = await loginUser(credentials);

      if (!response.success || !response.employee) {
        setEmptyField({ email: true, password: true })
        throw new Error(response.message || 'Erro ao fazer login')
      }
      setLogin(true)
      navigate({ to: '/menu'})
    } catch (err: unknown) {
      setcredentials(credentials => ({
        ...credentials, email: '', password: ''}))
    } finally {
      setLoading(false)
    }
  }

  if (checkingToken) {
    return <div className='spinner'></div>
  } else{

  return (
    <div className="container" style={{position:'fixed'}}>
      <form className="form-container" onSubmit={handleSubmit}>
        <Logo />
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className={emptyField.email ? 'empty-input' : ''}
            id='email'    name="email"    type="email"
            autoComplete='email'
            placeholder="Digite seu email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Senha</label>
          <input
            className={emptyField.password ? 'empty-input' : ''}
            id='password'   name="password"   type="password"
            placeholder="Digite sua senha"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <div className='checkbox'>
          <label style={{fontWeight:'400'}}>
            <input
              name="remember"   type="checkbox"
              checked={credentials.remember}
              onChange={handleChange}
              style={{padding:'0px'}}
            />
            Manter conectado
          </label>
        </div>

        <div className='form-group'>
          <input
            type="submit"
            value={loading ? '' : 'Entrar'}
            disabled={loading}
            className={loading ? 'loading' : ''}
            />
          {loading && (<div className='spinner fixed mt-[5px]'></div>)}
          {( emptyField.email || emptyField.password ) && <span>Credenciais inválidas</span>}
        </div>

        <Link to="/create-account">Criar conta</Link>

        <Link to="/create-enterprise">Cadastrar corporação</Link>

        <Link to="/password-recovery">Recuperar senha</Link>
      </form>

    </div>
  );
  }
}
