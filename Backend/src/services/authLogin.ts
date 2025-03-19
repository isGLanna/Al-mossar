import { users } from '../models/userModels'
import crypto from 'crypto'

export const authenticateUser = (email: string, password: string) => {
  
  // Pesquisa do usuário na base de dados
  const user = users.find(u => u.email === email && u.password === password)

  if(!user) return null

  // Cria e define o tamanho do token
  const token = crypto.randomBytes(4).toString('base64')

  console.log('Confirmação de login:', token)

  return token
}