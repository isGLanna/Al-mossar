import { Router } from 'express'
import menuRouter from './menu-routes'
import authRouter from './login-routes'

const router = Router()

// Rota para /api/menu/
router.use(menuRouter)

// Rota para /api/auth/
router.use(authRouter)

export default router