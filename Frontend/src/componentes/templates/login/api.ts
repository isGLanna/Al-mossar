import axios from "axios";

const API_URL = 'http://localhost:3001';

type Employee = {
  id: number; 
  idEnterprise: number;
  email: string;
  name: string;
  surname: string; 
  role: string;
  employees: { name: string; surname: string; role: string} [];
  token: string
}

export function getEnterpriseId(){
  return 1
}

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

    const employee: Employee = {
      id,
      idEnterprise,
      email,
      name,
      surname,
      role,
      employees,
      token,
    };

    return { success: true, message, employee: employee};
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