import { Request, Response } from 'express'
import { User } from '../services/user-service'

export class UserController {
  
  static async getUserPhoto(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization

      if (!token) {
        res.status(200).json({ success: true, hasPhoto: false })
        return
      }

      const photo = await User.getUserPhoto(token)

      photo ? res.status(200).json({ success: true, photo }) : res.status(200).json({ success: true, photo: null })
    } catch (error) {
      res.status(500).json({ success: false, hasPhoto: false, message: 'Erro interno do servidor' })
    }
  }
}