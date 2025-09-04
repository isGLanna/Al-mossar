import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  hasUser: boolean
  hasLogged: boolean
  logoutUser: boolean
}

type AuthState = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  /* Persiste o estado do usuário no localStorage para que o usuário
  não precise fazer login novamente a cada atualização de página */
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)