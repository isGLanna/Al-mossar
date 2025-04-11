import { Request, Response } from 'express'
import { authenticateUser } from '../services/auth-login'
import { authenticateRegister } from '../services/auth-register'


// Adormecer 
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Logar usuários
export const login = async (req: Request, res: Response): Promise<void> => {

  try{
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Preencha todos os campos' })
      return
    }

    const authResult  = await authenticateUser(email, password)

    await sleep(2000)
    
    if (!authResult ) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }

    const { token, type, name, surname, role, employees } = authResult

    res.json({ token, type, name, surname, role, employees })

  } catch (error) {
    console.log('Erro:', error)
    res.status(500).json({ message: 'Falha no servidor.'})
  }
}

// Registrar novos usuários
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, surname, email, password, id_enterprise, start_of_contract, role } = req.body;

    if (!name || !surname || !email || !password || !id_enterprise) {
      res.status(400).json({ message: 'Preencha todos os campos!' });
      return
    }

    const response = await authenticateRegister(name, surname, email, password, id_enterprise, start_of_contract, role);

    console.log(response.message)
    // Acesso negado (há credenciais inválidas ou falha na conexão com db)
    if (!response.success) {
      res.status(401).json({ success: response.success, message: response.message });
      return
    }
    res.status(201).json({ success: true });
    return

  } catch (error) {
    res.status(500).json({ success: false, message: 'Falha inesperada' });
    return 
  }
};
