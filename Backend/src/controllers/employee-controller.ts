import { Request, Response } from 'express'
import {
  addEmployee as addEmployeeService,
  getEmployees as getEmployeesService,
  deleteEmployee as deleteEmployeeService,
  editEmployee as editEmployeeService
} from '../services/employee-service'

// Adiciona funcionário
export async function addEmployee(req: Request, res: Response): Promise<void> {
  const { email, role, token } = req.body

  if (!email || !role || !token) {
    res.status(400).json({ error: 'Email, cargo e token são obrigatórios.' })
    return 
  }

  try {
    await addEmployeeService(email, role, token)
    res.status(201).json({ success: true })
    return 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar funcionário.' })
  }
}

// Busca todos os funcionários de uma empresa
export async function getEmployees(req: Request, res: Response): Promise<void> {
  const { token } = req.query
  let result

  try {
    result = await getEmployeesService(token as string)

    res.status(200).json(result)
  } catch (error) {
    if(result && result.status === 401){
      res.status(401).json({ message: 'Token expirou.' })
    } else {
      res.status(500).json({ message: 'Erro ao buscar funcionários.' })
    }

  }
}

// Exclui funcionário
export async function deleteEmployee(req: Request, res: Response): Promise<void> {
  const { email, token} = req.query

  if (!email || !token) {
    res.status(400).json({ success: false, message: 'Email e token são obrigatórios.' })
    return 
  }

  try {
    await deleteEmployeeService(email as string, token as string)
    res.status(204).json({ success: true, message: ''})

    return 
  } catch (error) {
    res.status(500).json({ success: false, message: error })
    return
  }
}

// Edita funcionário
export async function editEmployee(req: Request, res: Response): Promise<void> {
  const { token, email, name, surname, role } = req.body

  if (!email || !email.trim()) {
    res.status(400).json({ message: 'O email é obrigatório.' })
    return
  }

  if (!token) {
    res.status(400).json({ message: 'Token é obrigatório' })
    return 
  }

  try {
    const updated = await editEmployeeService(String(email), token, { name, surname, role })
    res.status(200).json({ success: true, message: '' })

    return 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao editar funcionário.' })
    return 
  }
}