import { Menu } from './menu'
import { Dish } from './dish'
import { Enterprise } from '../enterprise'
import { MenuDish } from './menu-dish'

Menu.belongsToMany(Dish, {
  through: MenuDish,
  foreignKey: 'id_menu',
  otherKey: 'id_dish',
  as: 'dishes',
})

Dish.belongsToMany(Menu, {
  through: MenuDish,
  foreignKey: 'id_dish',
  otherKey: 'id_menu',
  as: 'menus'
})

Menu.belongsTo(Enterprise, {
  foreignKey: 'id_enterprise',
  targetKey: 'id',
  as: 'enterprise',
})