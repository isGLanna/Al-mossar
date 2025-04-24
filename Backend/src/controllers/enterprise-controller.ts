import { Request, Response } from 'express'
import { createEnterprise } from '../services/enterprise-register'

export async function registerEnterprise(req: Request, res: Response): Promise<void>{

  try {
    const result = await createEnterprise(req.body)

    if (result.success) {
      res.status(201).json({ success: true, id: result.id})
    } else{
      res.status(400).json({ success: false, message: result.message})
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro do servidor. Tente mais tarde!'})
  }
}