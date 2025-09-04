import { Request, Response } from 'express'
import { User } from '../services/user-service'

export class UserController {
  
  static async getUserPhoto(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        res.status(401).json({ success: false })
        return
      }

      let token = authHeader.split(' ')[1]
      token = token.slice(10)
      token = token.slice(0, -2)

      if (!token) {
        res.status(200).json({ success: true, hasPhoto: false })
        return
      }

      const photo = await User.getUserPhoto(token)

      res.status(200).json({ success: true, hasPhoto: true, photo })
    } catch (error) {
      res.status(500).json({ success: false, hasPhoto: false, message: 'Erro interno do servidor' })
    }
  }
}