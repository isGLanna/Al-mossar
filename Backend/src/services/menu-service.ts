import { Menu, Dish } from '../repositories/menu'
import { TokenService } from './token-service'
import pool from '../database/database'
import { TransactionalService } from '../database/transactional-service'

type MenuResponse = {
  cafe_manha: Dish[];
  almoco: Dish[];
  cafe_tarde: Dish[];
  janta: Dish[];
}

export class MenuService extends TransactionalService {

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

  async create(enterpriseId: number, day: string, dishes: { name: string; description: string; mealType: string}[]) {
    const client = await pool.connect()
    
    return this.transaction(async (client) => {
      const menuResult = await client.query(
        `SELECT id
        FROM menus
        WHERE enterprise_id = ? AND day = ?`, [enterpriseId, day]
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

      for (const { name, description, mealType } of dishes) {
        await client.query(
          `INSERT INTO dishes(name, description, meal_type, menu_id)
          VALUES ($1, $2, $3, $4)`, [name, description, mealType, menuId]
        )
      }
    })
  }

  async update( enterpriseId: number, day: string, dishes: { name: string, description: string, mealType: string}[]) {
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
      
    return
  }

  async delete(enterpriseId: number, name: string, day: string) {
    const client = await pool.connect()

    return this.transaction(async (client) => {
      const menu = await client.query(`
        DELETE FROM dishes
        WHERE enterprise_id = $1 AND name = $2 AND day = $3
        RETURNS COUNT(dish)`)
    })
    try {
      const menu = await Menu.findOne({
        where: { enterpriseId, day },
        include: {
          model: Dish,
          as: 'dishes',
        }
      });

      if (!menu) throw new Error('Menu não encontrado');
      if (!menu.dishes) throw new Error('Nenhum prato encontrado');

      const dishToDelete = menu.dishes.find(dish => dish.name === name);
      if (!dishToDelete) throw new Error('Prato não encontrado no menu');

      if (menu.dishes.length === 1) {
        await menu.setDishes([]);
        await menu.destroy();
      } else {
        await menu.removeDish(dishToDelete.id);
      }
    } catch (error) {
      return { error, success: false };
    }
  }
  
  async deleteBeforeThat(day: string) {
    const today = new Date()
    const targetDate = new Date(day)

    if (targetDate < today) {
      await pool.query(
        `DELETE FROM menus
        WHERE day < ?`, [day])
    }
  }
}
