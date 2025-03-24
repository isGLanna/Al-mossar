import crypto from 'crypto'
import bcrypt from "bcrypt"
import Person from "../models/person"
import {Enterprise} from "../models/enterprise"

export const authenticateUser = async (email: string, password: string) => {

  try {
    console.log('\n\n\nO PROBLEMA COMEÇA AQUI\n\n\n')

    await Enterprise.sync()
    await Person.sync()

    const user = await Person.findOne({
      where: {email: email},
      raw: true     // retorna o objeto da busca
    })

    console.log('Resultado da busca:', user);

    if (!user) {
      throw('User not found.')
    }

    const passwordExists = await bcrypt.compare(password, user.password)

    if (!passwordExists) {
      throw('User not found.')
    }

    // Define um token para o usuário
    const token = crypto.randomBytes(32).toString('base64')

    return token
  } catch (error) {
    console.log(error)
    return false
  }
}