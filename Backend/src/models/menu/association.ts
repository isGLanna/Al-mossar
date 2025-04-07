import { Menu } from './menu'
import { Dish } from './dish'
import { Enterprise } from '../enterprise'
import { MenuDish } from './menu-dish'

Menu.belongsToMany(Dish, {
  through: MenuDish,
  foreignKey: 'id_menu',
  as: 'dishes',
})

Dish.belongsToMany(Menu, {
  through: MenuDish,
  foreignKey: 'id_dish',
  as: 'menus'
})

Menu.belongsTo(Enterprise, {
  foreignKey: 'id_enterprises',
  as: 'enterprise',
})