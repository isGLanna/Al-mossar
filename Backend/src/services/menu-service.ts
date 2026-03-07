import { Menu, Dish } from '../repositories/menu'
import  { Pool } from 'pg'
import { transactional } from '../decorators/transactional'
import { AppError } from '../utils/app-error'

/* Alterar toda a lógica do código:
  - Menu deve ser responsável apenas por linkar pratos ao dia*/
type MenuDish = {
  id: number
  name: string
  description: string
  meal_type: 'cafe_manha' | 'almoco' | 'cafe_tarde' | 'janta'
}
export class MenuService {

  async getMenuByDate(enterpriseId: number, day: string) {
    try {
      const client = await new Pool()
      const menu = await client.query(`
        SELECT d.id, d.name, d.description, md.meal_type
        FROM menu m
          JOIN menu_dish md ON md.id_menu = m.id
          JOIN dish d ON md.id_dish = d.id
        WHERE m.enterprise_id = $1
          AND m.day = $2`, [enterpriseId, day])

      const listOfDishes: MenuDish= { cafe_manha: [], almoco: [], cafe_tarde: [], janta: []  }

      for (const dish of menu.rows) {
        if (dish.meal_type && listOfDishes[dish.meal_type] !== undefined) {
          listOfDishes[dish.meal_type].push(dish)
        }
      }

      return listOfDishes
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @transactional
  async create(enterpriseId: number, days: string[], dishes: { dishId: number; mealType: string}[], client: Pool) {
    const menuResult = await client.query(
      `SELECT id
      FROM menu
        JOIN menu_dish md ON menu.id = md.id_menu
      WHERE enterprise_id = $1
        AND day = $2
        AND md.meal_type = $3`, [enterpriseId, days, dishes[0].mealType]
    )

    if (menuResult.rowCount)
      throw new AppError('Cardápio para esse dia e tipo de refeição já existe',400)

    await Promise.all(days.map(async day => {
      let menuId = await client.query(`INSERT INTO menu(enterprise_id, day) VALUES ($1, $2) RETURNING id`, [enterpriseId, day])

      await Promise.all(dishes.map(async ({ dishId, mealType}) => {
          await client.query(`
            INSERT INTO menu_dish(id_menu, id_dish, meal_type)
            VALUES ($1, $2, $3)`, [menuId.rows[0].id, dishId, mealType])
        }))
    }))
  }

  // Método para remover relacionamentos entre menu e pratos
  async removeMenuDishes(enterpriseId: number, day: string[], dishesId: number[]) {
    try {
      const client = await new Pool()

      await Promise.all(dishesId.map(id => {
        client.query(
        `DELETE FROM menu_dish md
        USING dish
        WHERE md.id_dish = $1
          AND menu.enterprise_id = $2`,
          [enterpriseId, id]
      )}))
    }
  }

  async deleteBeforeThat(enterpriseId: number, day: string) {
    const today = new Date()
    const targetDate = new Date(day)
    try {
      const client = await new Pool()

      if (targetDate > today) return

      const deleteResult = await client.query(
        `DELETE FROM menu
        WHERE enterprise_id = $1
          AND day < $2`, [enterpriseId, day])

      if(deleteResult.rowCount === 0)
        throw new AppError('Nenhum cardápio removido', 404)
    }catch(error: AppError | any) {
      throw new AppError(error?.message || 'Falha ao remover cardápios', error, error.status)
    }
  }
}
