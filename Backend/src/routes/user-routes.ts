import { Router } from 'express'
import { UserController } from '../controllers/user-controller'

const userRouter = Router()

userRouter.get('/user/photo', UserController.getUserPhoto)

export default userRouter