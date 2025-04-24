import { Router } from 'express'
import { get, create, update, deleted } from '../controllers/menu-controller'

const menuRouter = Router()

menuRouter.get('/menu', get)
menuRouter.post('/menu', create)
menuRouter.put('/menu', update)
menuRouter.delete('/menu', deleted)

export default menuRouter