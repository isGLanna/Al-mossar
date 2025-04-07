import { Router } from 'express'
import getMenu from '../controllers/menu-controller'

const menuRouter = Router()

menuRouter.get('/menu', getMenu)

export default menuRouter