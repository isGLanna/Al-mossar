import { Request, Response } from 'express'
import { User } from '../services/user-service'

export class UserController {
  
  async getUserPhoto(req: Request, res: Response) {
    const token = req.headers.authorization

    if (!token) {
      throw res.status(404).json({ success: false, photo: null, message: 'Usuário não possui autorização' })
    }

    const photo = await User.getUserPhoto(token)

    photo ? res.status(200).json({ success: true, photo }) : res.status(200).json({ success: true, photo: null })
  }
}