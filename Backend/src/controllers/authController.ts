import { Request, Response } from 'express'
import { authenticateUser } from '../services/authLogin'
import { authenticateRegister } from '../services/authRegister'


// Logar usuários
export const login = async (req: Request, res: Response): Promise<void> => {

  try{
    const { email, password, remember } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Preencha todos os campos' })
      return
    }


    const token = await authenticateUser(email, password)

    console.log('PORÉM AQUI DÁ PAU E NÃO PASSA:', token)

    if (!token) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }
    res.json({ token, remember })

  } catch (error) {
    console.log('Erro:', error)
    res.status(500).json({ message: 'Falha no servidor.'})
  }
  

}

// Registrar novos usuários
export const registerUser = (req: Request, res: Response): void => {

  try{
    const { name, surname, email, password, idEnterprise, startOfContract, role } = req.body
    
    console.log('Controlador de criação de conta')

    if(!name || !surname || !email || !password || ! idEnterprise){
      res.status(400).json({ message: 'Houve falha no cadastro. Verifique os campos'})
      return
    }
    const isValid = authenticateRegister(name, surname, email, password, idEnterprise, startOfContract, role)

    if (!isValid)
      res.status(400).json({ message: 'Credenciais não são válidas.'})
      return
  } catch(error) {
    res.status(500).json({ message: 'Falha no servidor'})
  }
}

// Registrar novas empresas
export const registerEnterprise = {
  
}