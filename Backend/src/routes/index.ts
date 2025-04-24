import { Router } from 'express'
import menuRouter from './menu-routes'
import authRouter from './login-register-routes'
import employeeRouter from './employee-routes'

const router = Router()

// Rota para /api/menu/
router.use(menuRouter)

// Rota para /api/auth/
router.use(authRouter)

// Rota para /api/employee
router.use(employeeRouter)

export default router