import axios from "axios";
import { createEmployee } from '../../../models/EmployeeFactory';
import { Employee } from "../../../models/Employee";

const API_URL = 'http://localhost:3001';

// Realiza requisição, retorna atributos e um objeto usuário
export const loginUser = async (user: { email: string; password: string; remember: boolean }): 
  Promise<{ success: boolean; message: string; employee: Employee | null }> => {

  try {
    const response = await axios.post(`${API_URL}/api/login`, user);
    const { success, message, id, email, name, surname, idEnterprise, role, token, employees } = response.data;
   
    if (!success) throw new Error(message)

    const storage =  user.remember ?
      localStorage :
      sessionStorage

    storage.setItem('authToken', JSON.stringify({ token }));

    const employee = createEmployee(id, idEnterprise, email, name, surname, role, employees, token)

    return { success: true, message, employee};
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao fazer login'
    return { success: false, message, employee: null}
  }
}

// Pega o token do localStorage ou sessionStorage
export const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || null
}

// Remove todos os dados de autenticação
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};