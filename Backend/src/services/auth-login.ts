import crypto from 'crypto'
import bcrypt from "bcrypt"
import User from "../models/employee"
import {Enterprise} from '../models/enterprise'


export const authenticateUser = async (email: string, password: string) => {
  try {
    await Enterprise.sync()
    await User.sync()

    // Se não encontrou usuário, tentar encontrar a empresa
    const enterprise = await Enterprise.findOne({ where: { email } })

    if (enterprise) {
      const isValid = await bcrypt.compare(password, enterprise.password)

      if (!isValid) {
        throw new Error('Senha incorreta.')
      }

      const token = crypto.randomBytes(64).toString('base64')
      await enterprise.update({ token })

      // Consulta todos os funcionários da empresa
      const employees = await User.findAll({
        where: { id_enterprise: enterprise.id },
        attributes: ['name', 'surname', 'role']
      })

      return {
        token,
        type: 'enterprise',
        name: enterprise.name,
        employees
      }
    }

    // Primeiro, tentar encontrar o empregado
    const user = await User.findOne({ where: { email } })

    if (user) {
      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        throw new Error('Senha incorreta.')
      }

      const token = crypto.randomBytes(64).toString('base64')
      await user.update({ token })

      const employees = await User.findAll({
        where: { id_enterprise: user.id_enterprise },
        attributes: ['name', 'surname', 'role']
      })

      return { 
        token,
        type: 'user',
        name: user.name,
        surname: user.surname,
        role: user.role,
        employees
      }
    }
  } catch (error) {
    console.log(error)
    return null
  }
}