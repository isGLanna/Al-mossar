import { users } from '../models/userModels'

export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email === email && u.password === password)

  console.log('Passou aqui service')

  if(!user) return null

  const token = Math.random().toString(36).substring(2)

  return token
}