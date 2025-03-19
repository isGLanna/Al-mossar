import { Request, Response } from 'express'
import { authenticateUser } from '../services/authLogin'

export const login = (req: Request, res: Response): void => {
  const { email, password, remember } = req.body

  console.log('Passou no controlador de entrada')

  if (!email || !password) {
    res.status(400).json({ message: 'Preencha todos os campos' })
    return
  }

  const token = authenticateUser(email, password)

  console.log('Teste')

  if (!token) {
    res.status(401).json({ message: 'Credenciais inválidas' })
    return
  }

  res.json({ token, remember })
}