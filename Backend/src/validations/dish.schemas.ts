import z from 'zod'

export const createDishSchema = z.object({
  enterpriseId: z.number(),
  name: z.string(),
  description: z.string()
})

export const updateDishSchema = z.object({
  enterpriseId: z.number(),
  id: z.number(),
  name: z.string(),
  description: z.string()
})

export const deleteDishSchema = z.object({
  enterpriseId: z.number(),
  id: z.number()
})