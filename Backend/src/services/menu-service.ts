import { Menu, Dish } from '../repositories/menu'
import { TokenService } from './token-service'
import  { Pool } from 'pg'
import { transactional } from '../decorators/transactional'
import { AppError } from '../utils/app-error'

type MenuResponse = {
  cafe_manha: Dish[];
  almoco: Dish[];
  cafe_tarde: Dish[];
  janta: Dish[];
}

export class MenuService {

  async getMenuByDate(token: string, day: string): Promise<MenuResponse> {
    try {
      // Consulta id da empresa do funcionário logado
      const id_enterprise = await TokenService.queryEnterpriseId(token)

      const menu = await Menu.findOne({
        where: {id_enterprise, day},
        include: {
          model: Dish,
          as: 'dishes',
        }
      })

      const result: MenuResponse = {  cafe_manha: [], almoco: [], cafe_tarde: [], janta: []  }

      if (menu?.dishes) {
        for (const dish of menu.dishes) {
          if (dish.meal_type && result[dish.meal_type] !== undefined) {
            result[dish.meal_type].push(dish)
          }
        }
      }

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @transactional
  async create(enterpriseId: number, day: string, dishes: { id: number; mealType: string}[], client: Pool) {
    const menuResult = await client.query(
      `SELECT id
        FROM menus
      WHERE enterprise_id = $1 AND day <= $2`, [enterpriseId, day]
    )

    let menuId: number

    // Cria relação entre enterprise e menu do dia
    if (!menuResult.rowCount) {
      const insertMenu = await client.query(
        `INSERT INTO menus(enterprise_id, day) VALUES ($1, $2) RETURNING id`, [enterpriseId, day]
      )
      menuId = insertMenu.rows[0].id
    } else {
      await this.update(enterpriseId, day, dishes)
      return
    }

    for (const { id, mealType } of dishes) {
      await client.query(
        `INSERT INTO dishes(id, name, meal_type, menu_id)
        VALUES ($1, $2, $3, $4, $5)`, [id, name, description, mealType, menuId]
      )
    }
  }

  async update( enterpriseId: number, day: string, dishes: { id: number; mealType: string}[]) {
      const menu = await Menu.findOne({
        where: { enterpriseId, day}
      })

      if (!menu) throw new Error('Menu não encontrado.')

      await menu.setDishes([])

      const newDishes = await Dish.bulkCreate(
        dishes.map(({ name, description, mealType }) => ({
          name,
          description,
          meal_type: mealType
        })),
        { returning: true }
      )

      await menu.setDishes(newDishes)
  }

  async delete(enterpriseId: number, name: string, day: string) {
    const client = await new Pool()

    const deleteRelation = await client.query(`
      DELETE FROM menu_dish md
      USING menu m, dish d
      WHERE md.id_menu = m.id
        AND md.id_dish = d.id
        AND m.enterprise_id = $1
        AND d.name = $2
        AND m.day = $3
      RETURNING m.id`, [enterpriseId, name, day])

    if(deleteRelation.rowCount === 0)
      throw new AppError('Prato ou cardápio não encontrado', 404)
  }

  async deleteBeforeThat(day: string) {
    const today = new Date()
    const targetDate = new Date(day)
    const client = await new Pool()

    if (targetDate > today) return

    const deleteResult = await client.query(
      `DELETE FROM menus
      WHERE day < $1`, [day])

    if(deleteResult.rowCount === 0)
      throw new AppError('Nenhum cardápio deletado', 404)
  }
}
