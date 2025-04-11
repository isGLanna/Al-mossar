import { Request, Response } from 'express'
import { Menu } from '../models/menu/menu'
import { Dish } from '../models/menu/dish'
import { Enterprise} from "../models/enterprise";

export const getMenu = async (req: Request, res: Response): Promise<void> => {
  const { day } = req.query

  try {
    if(!day) {
      res.status(400).json({ success: false, message: 'Dia não encontrado'})
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
      res.status(404).json({ message: 'Menu não foi encontrado'})
      throw 'Menu não foi encontrado'
    }
    res.status(200).json(menu)

  } catch (error) {
    res.status(401).json({ success: false, message: error || 'Erro no servidor' })
  }
}