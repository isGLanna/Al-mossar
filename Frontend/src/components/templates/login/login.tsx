import { Link, useNavigate } from '@tanstack/react-router'
import { loginUser, getUserByToken } from './api';
import { useState, useEffect, useContext } from 'react'
import { UserStateContext } from '../../../context/user-login-context'
import Logo from './sub-templates/logo'
import '../../molecules/formulario.sass'
import '../../atoms/checkbox.sass'
import '../../atoms/spinner.sass'

export function Login() {
  const navigate = useNavigate()
  const {setLogin} = useContext(UserStateContext)
  const [checkingToken, setCheckingToken] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  type credentials = {
    email: string;
    password: string;
    remember: boolean;
  };

  const [credentials, setcredentials] = useState<credentials>({
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

  // Lidar com entrada do usuário, caso exista campo vazio, negar acesso
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fields = {
      email: !credentials.email.trim(),
      password: !credentials.password.trim()
    }

    setEmptyField(fields)

    // Verifica condição campo *field.attribute* é vazio?
    if(fields.email || fields.password) return

    setIsLoading(true)
  
    try {
      const response = await loginUser(credentials);

      // Se o login for bem-sucedido, armazena o usuário e redireciona
      if (!response.success || !response.employee) {
        setEmptyField({ email: true, password: true })
        throw new Error(response.message || 'Erro ao fazer login')
      }
      setLogin(true)
      navigate({ to: '/menu'})
    } catch (err) {
      setcredentials(credentials => ({
        ...credentials, email: '', password: ''}))
      
    } finally {
      setIsLoading(false)
    }
  }

  if (checkingToken) {
    return <div className='spinner'></div>
  } else{

  return (
    <div className="container" style={{position:'fixed'}}>

      <main className="formulario" style={{ marginTop:'0px' }}> {/* Formulário sendo centralizado na marra*/}
        <Logo />
        
        <form className="form-container" onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              className={emptyField.email ? 'empty-input' : ''}
              type="email"
              name="email"
              placeholder="Digite seu email"
              autoComplete='current-password'
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Senha</label>
            <input
              className={emptyField.password ? 'empty-input' : ''}
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <div className='checkbox'>
            <label style={{fontWeight:'400'}}>
              <input
                type="checkbox"
                name="remember"
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
              value={isLoading ? '' : 'Entrar'}
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
              />
            {isLoading && (<div className='spinner fixed mt-[15px]'></div>)}
            {( emptyField.email || emptyField.password ) && <span>Credenciais inválidas</span>}
          </div>

          <div>
            <Link to="/create-account">Criar conta</Link>
          </div>

          <div>
            <Link to="/create-enterprise">Cadastrar corporação</Link>
          </div>
        </form>
      </main>
    </div>
  );
  }
}
