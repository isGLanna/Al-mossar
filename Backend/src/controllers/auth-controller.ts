import { Request, Response } from 'express'
import { authenticateUser } from '../services/auth-login'
import { authenticateRegister } from '../services/auth-register'
import { Employee } from '../models/employee'


// Adormecer 
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Logar usuários
export const login = async (req: Request, res: Response): Promise<void> => {

  try{
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Preencha todos os campos' })
      return
    }

    const authResult  = await authenticateUser(email, password)

    await sleep(1500)
    
    if (!authResult ) {
      res.status(401).json({ message: 'Credenciais inválidas' })
      return
    }

    const { id, name, surname, idEnterprise, role, token, employees } = authResult

    res.json({ success: true, id, email, name, surname, idEnterprise, role, token, employees})

  } catch (error) {
    console.log('Erro:', error)
    res.status(500).json({ success: false, message: error || 'Falha no servidor.'})
  }
}

// Registrar novos usuários
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, surname, email, password, id_enterprise, start_of_contract } = req.body;

    if (!name || !surname || !email || !password || !id_enterprise) {
      res.status(400).json({ message: 'Preencha todos os campos!' });
      return
    }

    const response = await authenticateRegister(name, surname, email, password, id_enterprise, start_of_contract);

    console.log(response.message)
    // Acesso negado (há credenciais inválidas ou falha na conexão com db)
    if (!response.success) {
      res.status(401).json({ success: response.success, message: response.message });
      return
    }
    res.status(201).json({ success: true });
    return

  } catch (error) {
    res.status(500).json({ success: false, message: 'Falha inesperada' });
    return 
  }
};

// Consulta de usuário via token
export const tokenLogin = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers['authorization']

  try {
    if (!authHeader || typeof authHeader !== 'string'){
      res.status(401).json({ success: false, message: 'Token não fornecido' })
      return
    }

    // Recebe um dicionário com token
    const rawToken = authHeader.split(' ')[1]

    let parsedToken = JSON.parse(rawToken)
    const token = parsedToken.token


    const employee = await Employee.findOne({
      where: { token },
      attributes: ['id', 'name', 'surname', 'role', 'id_enterprise'],
    })

    if (!employee) {
      res.status(401).json({ success: false, message: 'Funcionário não encontrado' })
      return
    }

    const employees = await Employee.findAll({
      where: { id_enterprise: employee.id_enterprise },
      attributes: ['name', 'surname', 'role']
    })

    res.status(200).json({
      success: true,
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      idEnterprise: employee.id_enterprise,
      role: employee.role,
      token,
      employees
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno do servidor' })
    return
  }
}
