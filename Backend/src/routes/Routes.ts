import { Router } from 'express'
import { login, registerUser } from '../controllers/authController'

const router = Router()

router.post('/login', login)

const value = router.post('/register', registerUser)

console.log('Routes OK!')

export default router
