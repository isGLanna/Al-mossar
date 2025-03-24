import bcrypt from 'bcrypt'
import Person from '../models/person'
import { Enterprise } from '../models/enterprise';

/* Verificações:
  - empresa existe
  - usuário já existe em uma mesma empresa (email and idEnterprise)
  - dominio válido
  - tamanho do nome e sobrenome ([16], [48])
  - tamanho da senha ([6 - 16)]
*/

export const authenticateRegister = async(
  name: string, 
  surname: string, 
  email: string, 
  password: string, 
  idEnterprise: number,
  startOfContract: string,
  role: string) => {

    // Verificação se a empresa existe
    const enterprise = await Enterprise.findOne({ where: {id: idEnterprise}})

    if (!enterprise) {
      console.log('Empresa não encontrada')
      return false
    }

    // Verifica se o email já existe
    const existingUser = await Person.findOne({ where: {email: email, id_enterprise: idEnterprise}})

    if (existingUser){
      console.log('Usuário já existe')
      return false
    }

    // Verifica se o dominio é válido
    const domains = ['gmail.com', 'outlook.com', 'icloud.com', 'yahoo.com']
    const domainUser = email.split('@')[1]

    if (!domains.includes(domainUser)){
      console.log('Domínio inválido')
      return false
    }

  // Verifica se o nome/sobrenome está fora do tamanho proposto ou vazio
    if (name.length > 16 || !name || surname.length > 48 || surname)
      return false

    // Verifica se a senha está fora do tamanho proposto
    if (password.length > 16 || password.length < 6)
      return false

    const user = { 
      name, 
      surname, 
      email, 
      password, 
      idEnterprise,
      startOfContract, // Convertendo Date para "YYYY-MM-DD"
      role 
    };

    try {
      const newUser = await Person.create({
        name,
        surname,
        email,
        password,
        idEnterprise,
        startOfContract,
        role
      })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }