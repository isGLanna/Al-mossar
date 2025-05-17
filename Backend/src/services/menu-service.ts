import { Menu, Dish } from '../models/menu'

// Query ao menu
export async function getMenuByDate (day:string, id_enterprise: number): Promise<(Menu & { dishes: Dish[] })> {
  try {
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
    const menu = await Menu.create({ id_enterprise, day })

    const createdDishes = await Dish.bulkCreate(
      dishes.map(dish => ({
        ...dish, id_enterprise
      })),
      { returning: true }
    )

    // Criar associação entre ids
    await menu.setDishes(createdDishes.map(d => d.id))

    return { success: true}
  } catch (error) {
    console.error('Erro ao criar menu:', error)
    return { error, success: false}
  }
}

export async function updateMenu (
  id_enterprise: number, 
  day: string, 
  dishes: { name: string, description: string}[]) {

  try {
    // Consulta menu igual
    const menu = await Menu.findOne({
      where: { id_enterprise, day}
    })

    if (!menu) throw new Error('Menu não encontrado.')

    await menu.setDishes([])

    const newDishes = await Dish.bulkCreate(
      dishes.map(dishes => ({
        ...dishes, id_enterprise
      })),
      { returning: true}
    )

    await menu.setDishes(newDishes)
      
    return { success: true}
  } catch (error) {
    throw error
  }
}

export async function deleteMenu (day:string, id_enterprise: number) {
  try {
    const menu = await Menu.findOne({
      where: { id_enterprise, day }
    })

    if (!menu) throw new Error ('Menu não encontrado')

    // Remove vínculo com pratos e deleta menu
    await menu.setDishes([])
    await menu.destroy()

    return { success: true }
  } catch (error) {
    return { error, success: false}
  }
}
