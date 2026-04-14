import z from 'zod'

export const createDishSchema = z.object({
  name: z.string(),
  description: z.string()
})

export const updateDishSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string()
})

export const deleteDishSchema = z.object({
  id: z.number()
})