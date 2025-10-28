import { Menu, Dish } from '../repositories/menu'
import { TokenService } from './token-service'

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

      const result: MenuResponse = {
        cafe_manha: [],
        almoco: [],
        cafe_tarde: [],
        janta: [],
      }

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

  async createMenu( 
    token:string, 
    day:string, 
    dishes: { name: string; description: string; meal: string}[]) {
    
    try {
      const { token: newToken, status: status } = await TokenService.refreshToken(token)

      if (status !== 201 || !newToken) {
        return { status: status, message: 'Token inválido ou expirado' }
      }

      const id_enterprise = await TokenService.queryEnterpriseId(newToken)

      // Verifica se já existe um menu para o dia e empresa para evitar duplicidade
      let menu = await Menu.findOne({
        where: { id_enterprise, day },
        include: {
          model: Dish,
          as: 'dishes',
        }
      })


      if (!menu) {
        menu = await Menu.create({ id_enterprise, day });
      } else {
        await this.updateMenu(newToken, day, dishes)
      }

      const createdDishes = await Dish.bulkCreate(
        dishes.map(({ name, description, meal }) => ({
          name,
          description,
          meal_type: meal
        })),
        { returning: true }
      )

      await menu.setDishes(createdDishes)

      return { status: 200, token: newToken}
    } catch (error) {
      console.error('Erro ao criar menu:', error)
      return { error, success: false}
    }
  }

  async updateMenu (
    token:string,
    day:string,   
    dishes: { name: string, description: string, meal: string}[]) {
      
    try {
      const { token: newToken, status: status } = await TokenService.refreshToken(token)

      if (status !== 201 || !newToken) {
        return { status: status, message: 'Token inválido ou expirado' }
      }
      
      const id_enterprise = await TokenService.queryEnterpriseId(newToken)
      // Consulta menu igual
      const menu = await Menu.findOne({
        where: { id_enterprise, day}
      })

      if (!menu) throw new Error('Menu não encontrado.')

      await menu.setDishes([])

      const newDishes = await Dish.bulkCreate(
        dishes.map(({ name, description, meal }) => ({
          name,
          description,
          meal_type: meal
        })),
        { returning: true }
      )

      await menu.setDishes(newDishes)
        
      return { status: 200, token: newToken}
    } catch (error) {
      console.error('Erro ao atualizar menu:', error)
      throw error
    }
  }

  async deleteMenu(
    token:string,
    name: string, 
    day: string) {
    try {
      const { token: newToken, status: status } = await TokenService.refreshToken(token)

      if (status !== 201 || !newToken) {
        return { status: status, message: 'Token inválido ou expirado' }
      }
      
      const id_enterprise = await TokenService.queryEnterpriseId(newToken)

      const menu = await Menu.findOne({
        where: { id_enterprise, day },
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
        // Só 1 prato? Deleta o menu inteiro
        await menu.setDishes([]);
        await menu.destroy();
      } else {
        // Mais de 1 prato? Apenas remove o prato
        await menu.removeDish(dishToDelete.id);
      }

      return { status: 200, token: newToken}
    } catch (error) {
      return { error, success: false };
    }
  }

}
