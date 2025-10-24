import { Request, Response } from 'express'
import { User } from '../services/user-service'

export class UserController {
  
  static async getUserPhoto(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization

      if (!token) {
        throw res.status(404).json({ success: false, photo: null, message: 'Usuário não possui autorização' })
      }

      const photo = await User.getUserPhoto(token)

      console.log("Passou aqui")

      photo ? res.status(200).json({ success: true, photo }) : res.status(200).json({ success: true, photo: null })
    } catch (error: any) {
      const status = error.status || 500
      const message = error.message || 'Erro interno do servidor'
      res.status(status).json({ success: false, photo: null, message: message })
    }
  }
}