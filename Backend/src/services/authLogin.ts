import crypto from 'crypto'
import bcrypt from "bcrypt"
import Person from "../models/person"
import {Enterprise} from "../models/enterprise"
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('almossar', 'postgres', '!+@_#)', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
})



export const authenticateUser = async (email: string, password: string) => {
  try {

    await Enterprise.sync()
    await Person.sync()

    const user = await Person.findOne({
      where: {email: email},
      raw: true
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
    const token = crypto.randomBytes(32).toString('base64')

    return token
  } catch (error) {
    console.log(error)
    return false
  }
}