import { z } from 'zod'

export const createEnterpriseSchema = z.object({
  name: z.string().min(3, "Nome deve conter mínimo de 3 caracteres").max(32, "Nome deve conter máximo de 32 caracteres."),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(4).max(32),
  employees: z.array(z.object({
    email: z.string().email("E-mail inválido"),
    role: z.enum(['Administrador', 'Cozinheiro', 'Auxiliar de cozinha'])
  }))
})

export const registerUserSchema = z.object({
  name: z.string().min(1).max(16, "Limite de caracteres excedido: 16"),
  surname: z.string().min(1).max(48, "Limite de caracteres excedido: 48"),
  email: z.string().email(),
  password: z.string().min(4).max(16),
  id_enterprise: z.number().int().positive(),
  start_of_contract: z.coerce.date()
})

export type CreateEnterpriseInput = z.infer<typeof createEnterpriseSchema>
export type RegisterUserInput = z.infer<typeof registerUserSchema>