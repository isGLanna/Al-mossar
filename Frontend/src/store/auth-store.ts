import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Employee = {
  idEnterprise: number
  email: string
  name: string
  surname: string
  role: string
  token: string
}

type AuthState = {
  employee: Employee | null
  setEmployee: (employee: Employee) => void
  clearEmployee: () => void
}

export const useAuthStore = create<AuthState>()(
  /* Persiste o estado do usuário no localStorage para que o usuário
  não precise fazer login novamente a cada atualização de página */
  persist(
    (set) => ({
      employee: null,
      setEmployee: (employee) => set({ employee }),
      clearEmployee: () => set({ employee: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)