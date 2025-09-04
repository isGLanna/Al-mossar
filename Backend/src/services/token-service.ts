import sequelize from '../repositories'
import { QueryTypes } from 'sequelize'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import e from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'chave-super-secreta-mesmo';

export class TokenService {
  
  static async queryEnterpriseId(token: string): Promise<number> {
    try {
      const result = await sequelize.query<{ id_enterprise: number }> (
        `SELECT id_enterprise FROM Employee WHERE token = :token`,
        {
          replacements: { token },
          type: QueryTypes.SELECT
        }
      )

      if (result.length === 0) {
        throw new Error('Token inválido ou expirado');
      }

      return result[0].id_enterprise;
    } catch (error) {
      return Promise.reject('Erro ao validar token');
    }
  }

  static async refreshToken (token: string): Promise<{token?: string; status: number}> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { email: string, role: string }
      const employee = await sequelize.query<{ token: string }>(
        `SELECT token FROM Employee WHERE email = :email`,
        {
          replacements: { email: decoded.email },
          type: QueryTypes.SELECT
        }
      )

      if (employee.length === 0) 
        return { status: 401 }
    
      const payload = {
        email: decoded.email,
        role: decoded.role,
      }

      const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' })

      await sequelize.query(
        `UPDATE Employee SET token = :token WHERE email = :email`,
        {
          replacements: { token: newToken, email: decoded.email },
          type: QueryTypes.UPDATE
        }
      )

      return {token: newToken, status: 201}
  } catch (error) {
      return { status: 401 }
    }
  }
}