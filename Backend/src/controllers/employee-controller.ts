import { Request, Response } from 'express'
import {EmployeeService} from '../services/employee-service'

// Adiciona funcionário
export async function addEmployee(req: Request, res: Response): Promise<void> {
  const { email, role, token } = req.body

  try {
    if (!email || !role || !token) {
      res.status(400).json({ error: 'Email, cargo e token são obrigatórios.' })
      return
    }
      
    await EmployeeService.addEmployee(email, role, token)
    res.status(201).json({ success: true })
  } catch (error: any) {
    const status = error.status || 500
    const message = error.message || "Falha inexperada ao adicionar novo empregado."

    res.status(status).json({ error: message })
  }
}

// Busca todos os funcionários de uma empresa
export async function getEmployees(req: Request, res: Response): Promise<void> {
  const authHeader  = req.headers.authorization
  const token = authHeader?.substring(7)
  let result

  try {
    result = await EmployeeService.getEmployees(token as string)

    if (!result.success) 
      throw { status: result.status || 400, message: result.message || 'Falha na requisição.' }

    res.status(200).json(result)
  } catch (error: any) {
    const status = error.status || 500
    const message = error.message || "Falha inexperada ao consultar empregados."
    res.status(status).json({ message: message })
  }
}

// Exclui funcionário
export async function deleteEmployee(req: Request, res: Response): Promise<void> {
  const { email, token} = req.query

  try {
    if (!email || !token)
      res.status(400).json({ success: false, message: 'Email e token são obrigatórios.' })

    await EmployeeService.deleteEmployee(email as string, token as string)
    res.status(204).json({ success: true, message: ''})

    return 
  } catch (error: any) {
    const status = error.status || 500
    const message = error.message || 'Erro interno ao remover empregado.'
    res.status(status).json({ success: false, message: message })
    return
  }
}

// Edita funcionário
export async function editEmployee(req: Request, res: Response): Promise<void> {
  const { token, email, name, surname, role } = req.body

  if (!email || !email.trim())  
    throw res.status(400).json({ message: 'O email é obrigatório.' })

  if (!token)
    throw res.status(400).json({ message: 'Token é obrigatório' })

  try {
    await EmployeeService.editEmployee(String(email), token, { name, surname, role })
    res.status(200).json({ success: true, message: '' })

  } catch (error: any) {
    const status = error.status || 500
    const message = error.message || 'Erro interno ao editar funcionário.'

    res.status(status).json({ success: false, message })
  }
}