import { Router } from 'express'
import menuRouter from './menu-routes'
import authRouter from './register-routes'
import userRouter from './user-routes'
import employeeRouter from './employee-routes'

const router = Router()

router.use(menuRouter)

router.use(authRouter)

router.use(employeeRouter)

router.use(userRouter)

router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy!' })
})

export default router
