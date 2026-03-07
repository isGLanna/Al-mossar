import z from 'zod'

export const createMenuSchema = z.object({
  enterpriseId: z.number(),
  day: z.string(),
  dishes: z.array(
    z.object({
      dishId: z.number(),
      mealType: z.enum(['cafe_manha', 'almoco', 'cafe_tarde', 'janta'])
    })
  )
})

export const queryMenuSchema = z.object({
  enterpriseId: z.number(),
  day: z.string()
})

export const modifyMenuSchema = z.object({
  menuId: z.number(),
  dishes: z.object({
    dishId: z.number(),
    mealType: z.enum(['cafe_manha', 'almoco', 'cafe_tarde', 'janta'])
  }).array()
})

export const deleteMenuSchema = z.object({
  enterpriseId: z.number(),
  day: z.string(),
  dishesId: z.array(z.number())
})