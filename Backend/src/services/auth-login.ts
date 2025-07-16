import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Employee } from "../repositories/employee"
import { Permission } from "../repositories/permission"

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-de-desenvolvimento';

export const authenticateUser = async (email: string, password: string) => {
  try {
    const employee = await Employee.findOne({ 
      where: { email },
      include: [{
        model: Permission,
        as: 'permissions',
        attributes: ['name'], // Inclui apenas o nome da permissão
        through: { attributes: [] } // Ignora a tabela de junção
      }] 
    })

    if (!employee) {
      return { success: false, message: 'Email ou senha incorretos' }
    }

    const isValid = await bcrypt.compare(password, employee.password)

    if (!isValid) {
      return { success: false, message: 'Email ou senha incorretos' }
    }

    const permissionNames = (employee as any).permissions.map((p: Permission) => p.name)

    const payload = {
      id: employee.id,
      idEnterprise: employee.id_enterprise,
      role: employee.role,
      permissions: permissionNames
    }

    // Gerar o token JWT com acesso de 15 minutos
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })

    // Armazenar o token no banco de dados
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