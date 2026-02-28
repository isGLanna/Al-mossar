import { z } from 'zod'

export const employeeSchema = z.object({
  name: z.string(),
  surname: z.string(),
  enterprise_id: z.number().int()
})

export const editEmployee = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  role: z.enum(['administrador', 'gerente', 'nutricionista', 'cozinheiro', 'auxiliar de cozinha']).optional(),
  salary: z.int().optional()
})