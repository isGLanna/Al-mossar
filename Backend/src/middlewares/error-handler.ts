import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app-error'
import { ZodError } from 'zod'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode || 400).json({ success: false, message: err.message})
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({ success: false, message: 'Valores de entrada inválidos', issues: err.flatten()})
    return
  }

  console.error('[Unhandled Error]:', err)

  res.status(500).json({success: false, message: 'Erro interno do servidor. Tente novamente mais tarde.'})
}