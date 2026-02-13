import { Request, Response } from 'express'
import { authenticateUser } from '../services/authenticator'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Logar usuários
export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("Teste")

  try{
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Preencha todos os campos' })
      return
    }

    const authResult  = await authenticateUser(email, password)

    await sleep(1500)
    
    if (!authResult) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }

    if (authResult.success === false) {
      res.status(401).json({ success: false, message: authResult.message })
      return
    }

    const {name, surname, idEnterprise, role, token } = authResult

    res.json({ success: true, email, name, surname, idEnterprise, role, token})

  } catch (error) {
    console.log('Erro:', error)
    res.status(500).json({ success: false, message: error || 'Falha no servidor.'})
  }
}
