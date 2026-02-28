import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import { AppError } from '../utils/app-error'

const JWT_SECRET = process.env.JWT_SECRET

export interface AuthPayload {
  id: number
  email: string
  role: string
  enterprise_id: number
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token não fornecido', 401)

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload
    req.user = decoded
    next()
  } catch(error) {
    throw new AppError('Token inválido ou expirado', 401)
  }
}

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AppError('Acesso negado: não possui permissão.', 403)
    }
    next()
  }
}