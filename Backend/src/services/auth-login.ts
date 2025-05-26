import crypto from 'crypto'
import bcrypt from "bcrypt"
import { Employee } from "../models/employee"

export const authenticateUser = async (email: string, password: string) => {
  try {
    const employee = await Employee.findOne({ where: { email } })

    if (!employee) {
      return { success: false, message: 'Email ou senha incorretos' }
    }

    const isValid = await bcrypt.compare(password, employee.password)

    if (!isValid) {
      return { success: false, message: 'Email ou senha incorretos' }
    }

    const token = crypto.randomBytes(64).toString('base64')
    await employee.update({ token })

    return {
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      idEnterprise: employee.id_enterprise,
      role: employee.role,
      token,
    }
    
  } catch (error) {
    console.log(error)
    return { success: false, message: 'internal-error' }
  }
}