import { Request, Response } from 'express'
import {
  addEmployee as addEmployeeService,
  getEmployees as getEmployeesService,
  deleteEmployee as deleteEmployeeService,
  editEmployee as editEmployeeService
} from '../services/employee-service'

// Adiciona funcionário
export async function addEmployee(req: Request, res: Response): Promise<void> {
  console.log('aqui tá chegando')
  const { email, role, enterpriseId } = req.body

  console.log('Tá aqui: ', enterpriseId)

  if (!email || !role || !enterpriseId) {
    res.status(400).json({ error: 'Email, cargo e ID da empresa são obrigatórios.' })
    return 
  }

  try {
    await addEmployeeService(email, role, enterpriseId)
    res.status(201).json({ success: true })
    return 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar funcionário.' })
  }
}

// Busca todos os funcionários de uma empresa
export async function getEmployees(req: Request, res: Response): Promise<void> {
  const { enterpriseId } = req.query

  if (!enterpriseId) {
    res.status(400).json({ message: 'ID da empresa não encontrado.' })
    return 
  }

  try {
    const result = await getEmployeesService(Number(enterpriseId))
    res.json(result)
    return 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar funcionários.' })
    return 
  }
}

// Exclui funcionário
export async function deleteEmployee(req: Request, res: Response): Promise<void> {
  console.log('aqui tá chegando')
  const { email } = req.params
  const { enterpriseId } = req.query

  if (!email || !enterpriseId) {
    res.status(400).json({ message: 'Email e ID da empresa são obrigatórios.' })
    return 
  }

  try {
    await deleteEmployeeService(email, Number(enterpriseId))
    res.status(204).send()
    return 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir funcionário.' })
    return
  }
}

// Edita funcionário
export async function editEmployee(req: Request, res: Response): Promise<void> {
  console.log('aqui tá chegando')
  const { email } = req.params
  const { name, surname, role, enterpriseId } = req.body

  if (!enterpriseId) {
    res.status(400).json({ message: 'ID da empresa é obrigatório.' })
    return 
  }

  try {
    const updated = await editEmployeeService(email, Number(enterpriseId), { name, surname, role })
    res.json(updated)
    return 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar funcionário.' })
    return 
  }
}