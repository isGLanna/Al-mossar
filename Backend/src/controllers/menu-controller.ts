import { Request, Response } from 'express'
import { Menu } from '../models/menu/menu'
import { Dish } from '../models/menu/dish'
import { Enterprise} from "../models/enterprise";

const getMenu = async (req: Request, res: Response) => {
  const { day } = req.query

  try {
    if(!day) {
      return res.status(400).json({ message: 'Dia não encontrado'})
    }

    const menu = await Menu.findOne({
      where: { day },
      include: [{
        model: Dish,
        as: 'dishes',
        attributes: ['id', 'description'],
        through: { attributes: [] },
      },
        {
          model: Enterprise,
          as: 'enterprise',
          attributes: ['name']
        },
      ],
    })

    if(!menu) {
      return res.status(404).json({ message: 'Menu não foi encontrado'})
    }
    return res.json(menu)

  } catch (error) {
    res.status(401).json({ message: '' })
    return null
  }
}

export default getMenu