import { Menu, Dish } from '../repositories/menu'
import sequelize  from '../repositories'
import { QueryTypes } from 'sequelize'

// Query ao menu
export async function getMenuByDate (token: string, day:string ): Promise<(Menu & { dishes: Dish[] })> {
  try {
    // Consulta id da empresa do funcionário logado
    const id_enterprise_arr = await sequelize.query<{ id_enterprise: number }>(
      `SELECT id_enterprise FROM Employee WHERE token = :token`,
      {
        replacements: { token },
        type: QueryTypes.SELECT
      }
    )

    const id_enterprise = id_enterprise_arr[0].id_enterprise;

    const menu = await Menu.findOne({
      where: { id_enterprise, day},
      include: {
        model: Dish,
        as: 'dishes',
      }
    })

    // Se não encontrou o menu
    if (!menu) {
      throw ('Nenhuma refeição encontrada.');
    }

    // Retorna os pratos encontrados
    return menu as Menu & { dishes: Dish[] };

  } catch (error) {
    console.log(error)
    throw error
  }
}

// Criar cardápio
export async function createMenu (
  day:string,
  id_enterprise: number, 
  dishes: { name: string; description: string}[]) {
  
  try {
    // Verifica se já existe um menu para o dia e empresa para evitar duplicidade
    let menu = await Menu.findOne({
      where: { id_enterprise, day },
      include: [{ association: 'dishes' }],
    })


    if (!menu) {
      menu = await Menu.create({ id_enterprise, day });
    } else {
      updateMenu(day, id_enterprise, dishes)
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

    return { success: true}
  } catch (error) {
    console.error('Erro ao criar menu:', error)
    return { error, success: false}
  }
}

export async function updateMenu (
  day: string,
  id_enterprise: number,  
  dishes: { name: string, description: string}[]) {

  try {
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
      
    return { success: true}
  } catch (error) {
    console.error('Erro ao atualizar menu:', error)
    throw error
  }
}

export async function deleteMenu(id_enterprise: number, name: string, day: string) {
  try {
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

    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
}

