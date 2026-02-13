import { Router } from 'express'
import { MenuService } from '../services/menu-service'
import { MenuController } from '../controllers/menu-controller'

const menuRouter = Router()
const service = new MenuService()
const controller = new MenuController(service)

menuRouter.get('/menu', (req, res) => { controller.get})
menuRouter.post('/menu', (req, res) => { controller.create})
menuRouter.put('/menu', (req, res) => { controller.update})
menuRouter.delete('/menu', (req, res) => { controller.delete})

export default menuRouter