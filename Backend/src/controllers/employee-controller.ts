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
  const { email, role, idEnterprise } = req.body

  console.log('Tá aqui: ', idEnterprise)

  if (!email || !role || !idEnterprise) {
    res.status(400).json({ error: 'Email, cargo e ID da empresa são obrigatórios.' })
    return 
  }

  try {
    await addEmployeeService(email, role, idEnterprise)
    res.status(201).json({ success: true })
    return 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar funcionário.' })
  }
}

// Busca todos os funcionários de uma empresa
export async function getEmployees(req: Request, res: Response): Promise<void> {
  const { idEnterprise } = req.query

  if (!idEnterprise) {
    res.status(400).json({ message: 'ID da empresa não encontrado.' })
    return 
  }

  try {
    const result = await getEmployeesService(Number(idEnterprise))
    res.json(result)
    return 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar funcionários.' })
    return 
  }
}

// Exclui funcionário
export async function deleteEmployee(req: Request, res: Response): Promise<void> {
  const { email, idEnterprise} = req.query

  if (!email || !idEnterprise) {
    res.status(400).json({ success: false, message: 'Email e ID da empresa são obrigatórios.' })
    return 
  }

  try {
    await deleteEmployeeService(email as string, Number(idEnterprise))
    res.status(204).json({ success: true, message: ''})

    return 
  } catch (error) {
    res.status(500).json({ success: false, message: error })
    return
  }
}

// Edita funcionário
export async function editEmployee(req: Request, res: Response): Promise<void> {
  const { email, name, surname, role, idEnterprise } = req.body

  if (!email || !email.trim()) {
    res.status(400).json({ message: 'O email é obrigatório.' })
    return
  }

  if (!idEnterprise) {
    res.status(400).json({ message: 'ID da empresa é obrigatório.' })
    return 
  }

  try {
    const updated = await editEmployeeService(String(email), Number(idEnterprise), { name, surname, role })
    res.status(200).json({ success: true, message: '' })

    return 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao editar funcionário.' })
    return 
  }
}