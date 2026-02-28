import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Employee } from '../repositories/user/employee'
import { AppError } from '../utils/app-error'
import { success } from 'zod'

const JWT_SECRET = process.env.JWT_SECRET

export class AuthService {
  
  async login(email: string, password: string) {
    const employee = await Employee.findOne({ where: { email }})
    if(!employee) throw new AppError("Verifique email ou senha incorretos.", 401)

    const isValid = await bcrypt.compare(password, employee.password || '')
    if(!isValid) throw new AppError("Verifique email ou senha incorretos.", 401)

    const payload = {
      id: employee.id,
      enterprise_id: employee.enterprise_id,
      role: employee.role,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'})
  
    return {
      success: true,
      user: {
        name: employee.name,
        surname: employee.surname,
        role: employee.role,
        enterprise_id: employee.enterprise_id
      },
      token
    }
  }
}