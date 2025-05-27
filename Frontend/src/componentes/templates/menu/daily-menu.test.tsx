import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { DailyMenu } from './daily-menu'


type Dish = { id: number; name: string; description: string }
var dishesMock: Dish[] = []

const mockFetchMenu = vi.fn().mockResolvedValue({
  success: true,
  message: 'Cardápio carregado com sucesso',
  dishes: dishesMock,
})

const mockUpdateMenu = vi.fn().mockResolvedValue({
  success: true,
  message: 'Cardápio atualizado',
})

const mockCreateMenu = vi.fn().mockResolvedValue({
  success: true,
  message: 'Cardápio atualizado',
})

const mockAddDishByName = vi.fn((name: string, description: string) => {
  dishesMock.push({ id: 5, name, description })
})

const mockGetDishes = vi.fn(() => dishesMock)

vi.mock('../../../models/Menu', () => ({
  MenuDish: vi.fn().mockImplementation(() => ({
    fetchMenu: mockFetchMenu,
    updateMenu: mockUpdateMenu,
    createMenu: mockCreateMenu,
    getDishes: mockGetDishes,
    addDishByName: mockAddDishByName,
    getDay: vi.fn().mockReturnValue('2025-05-22'),
    setDishes: vi.fn(),
    setDay: vi.fn(),
    setEnterpriseId: vi.fn(),
  })),
}))


it('adiciona prato e oculta formulário após salvar', async () => {
  render(<DailyMenu idEnterprise={31}/>)

  fireEvent.click(screen.getByLabelText('Adicionar prato'))

  // 3. Preenche os campos
  fireEvent.change(screen.getByPlaceholderText('Nome do prato'), {
    target: { value: 'Arroz' }
  })
  fireEvent.change(screen.getByPlaceholderText('Modo de preparo'), {
    target: { value: 'Cozinhar com alho e óleo' }
  })

  // 4. Clica em salvar
  fireEvent.click(screen.getByText('Salvar'))


  // 5. Verifica se prato foi adicionado e a função de inserir prato foi removida
  await screen.findByText('Arroz')
  expect(screen.queryByText('Nome do prato')).not.toBeInTheDocument()
  expect(screen.queryByText('Modo de preparo')).not.toBeInTheDocument()
  expect(screen.queryByText('Salvar')).not.toBeInTheDocument()
})
