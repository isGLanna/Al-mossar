import crypto from 'crypto'
import bcrypt from "bcrypt"
import Person from "../models/person"
import {Enterprise} from "../models/enterprise"
import {sequelize} from '../models/db'


export const authenticateUser = async (email: string, password: string) => {
  try {
    /* INSERINDO USUÁRIO FICTÍCIO
    const hashedPassword = await bcrypt.hash('1234', 10);

    // Cria o usuário admin
    await Person.create({
      email: 'admin@gmail.com',
      password: hashedPassword,
      name: 'Admin',
      surname: 'Sistema',
      start_of_contract: '2023-01-01',
      id_enterprise: 1,
      role: 'admin'
    })
    */

    await Enterprise.sync()
    await Person.sync()

    const user = await Person.findOne({
      where: {email: email}
    })

    console.log('Resultado da busca:', user);

    if (!user) {
      throw new Error('User not found.')
    }

    const passwordExists = await bcrypt.compare(password, user.password)

    if (!passwordExists) {
      throw new Error('Wrong password.')
    }

    // Define um token para o usuário
    const token = crypto.randomBytes(256).toString('base64')

    console.log(token)

    return token
  } catch (error) {
    console.log(error)
    return false
  }
}