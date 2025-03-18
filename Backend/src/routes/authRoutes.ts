import { Router } from 'express'
import { login } from '../controllers/authController'

const router = Router()

router.post('/login', login)

console.log('Passou aqui routes')

export default router
