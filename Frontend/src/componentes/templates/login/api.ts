import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3000'

export type Employee = {
  email: string;
  name: string;
  surname: string; 
  role: string;
}

// Realiza requisição, retorna atributos e um objeto usuário
export const loginUser = async (user: { email: string; password: string; remember: boolean }): 
  Promise<{ success: boolean; message: string; employee: Employee | null }> => {

  try {
    const response = await axios.post(`${API_URL}/api/login`, user);
    const { success, message, email, name, surname, idEnterprise, role, token } = response.data;
   
    if (!success) throw new Error(message)

    const storage =  user.remember ?
      localStorage :
      sessionStorage

    storage.setItem('authToken', JSON.stringify({ token }));

    const employee: Employee = {
      email,
      name,
      surname,
      role,
    }

    return { success: true, message: message, employee: employee}
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao fazer login'
    return { success: false, message, employee: null}
  }
}

// Pega o token do localStorage ou sessionStorage
export const getToken = () => {
  const data = JSON.parse(localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '{}')
  return data.token
}

// Verifica onde está o token e o armazena atualizado
export const setNewToken = (token: string) => {
  const storage = localStorage.getItem('authToken') ? localStorage : sessionStorage
  storage.setItem('authToken', JSON.stringify({ token }))
}

// Pegar informações do usuário com base no token armazenado
export const getUserByToken = async (): Promise<{ success: boolean; message: string; employee: Employee | null }> => {
  
  const token = getToken()

  if (!token) {
    return { success: false, message: 'Token não encontrado.', employee: null };
  }

  try {
    const response = await axios.get(`${API_URL}/api/token-login`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    
    const { success, message, email, name, surname, role } = response.data

    if (!success) throw new Error(message)

    const employee: Employee = {
      email,
      name,
      surname,
      role,
    }

    return { success: true, message: message, employee: employee}
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro inexperado'
    return { success: false, message, employee: null }
  }
}

// Remove todos os dados de autenticação
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};