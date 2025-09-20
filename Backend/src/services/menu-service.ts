import { Menu, Dish } from '../repositories/menu'
import { TokenService } from './token-service'

// Query ao menu
export async function getMenuByDate (token: string, day:string ): Promise<(Menu & { dishes: Dish[] }) | null> {
  try {
    // Consulta id da empresa do funcionário logado
    const id_enterprise = await TokenService.queryEnterpriseId(token)

    const menu = await Menu.findOne({
      where: { id_enterprise, day},
      include: {
        model: Dish,
        as: 'dishes',
      }
    })

    // Retorna os pratos encontrados
    return menu ? (menu as Menu & { dishes: Dish[] }) : null
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Criar cardápio
export async function createMenu (
  token:string,
  day:string, 
  dishes: { name: string; description: string}[]) {
  
  try {
    const { token: newToken, status: status } = await TokenService.refreshToken(token)

    if (status !== 201 || !newToken) {
      return { status: status, message: 'Token inválido ou expirado' }
    }

    const id_enterprise = await TokenService.queryEnterpriseId(token)

    // Verifica se já existe um menu para o dia e empresa para evitar duplicidade
    let menu = await Menu.findOne({
      where: { id_enterprise, day },
      include: [{ association: 'dishes' }],
    })


    if (!menu) {
      menu = await Menu.create({ id_enterprise, day });
    } else {
      updateMenu(token, day, dishes)
    }

    const createdDishes = await Dish.bulkCreate(
      dishes.map(({ name, description }) => ({
        name,
        description,
        id_enterprise
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

export async function updateMenu (
  token:string,
  day:string,   
  dishes: { name: string, description: string}[]) {

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
      dishes.map(({ name, description }) => ({
        name,
        description,
        id_enterprise
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

export async function deleteMenu(
  token:string,
  name: string, 
  day: string) {
  try {
    const { token: newToken, status: status } = await TokenService.refreshToken(token)

    if (status !== 201 || !newToken) {
      return { status: status, message: 'Token inválido ou expirado' }
    }
    
    const id_enterprise = await TokenService.queryEnterpriseId(token)

    const menu = await Menu.findOne({
      where: { id_enterprise, day },
      include: [{ association: 'dishes' }],
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

