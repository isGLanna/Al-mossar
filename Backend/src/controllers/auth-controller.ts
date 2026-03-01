import { Request, Response } from 'express'
import { AuthService } from '../services/auth-service'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (req: Request, res: Response): Promise<void> => {
  const authService = new AuthService()

  try{
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Preencha todos os campos' })
      return
    }

    const authResult  = await authService.login(email, password)

    await sleep(1500)
    
    if (!authResult) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }

    const {success, user: {name, surname, role, enterpriseId}, token } = authResult

    res.json({ success: true, email, name, surname, enterpriseId, role, token})

  } catch (error) {
    console.log('Erro:', error)
    res.status(500).json({ success: false, message: error || 'Falha no servidor.'})
  }
}
