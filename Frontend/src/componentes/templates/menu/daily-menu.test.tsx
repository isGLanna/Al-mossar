import { render, screen, fireEvent } from '@testing-library/react'
import {it, expect, vi, describe  } from 'vitest'
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

const mockAddDishByName = vi.fn((id: number, name: string, description: string) => {
  const newId = dishesMock.length + 1
  const newDish = { id: newId, name, description }
  dishesMock.push(newDish)
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


describe('Adição de pratos', () => {

  const positiveTestCases = [
    { name: 'Arroz', description: 'Cozinhar com alho e óleo'},
    { name: 'Feijão', description: 'Deixar de molho e temperar com sazon'},
    { name: 'Macarrão', description: 'Cozinhar na água e sal, adicionar molho'},
    { name: 'Salada Caesar', description: 'Alface, croutons, parmesão e molho Caesar'},
    { name: 'Bife à Parmegiana', description: 'Bife empanado, molho de tomate e queijo'},
    { name: 'Sopa de Legumes', description: 'Cozinhar cenoura, batata, chuchu e macarrãozinho em caldo de galinha.'},
    { name: 'Lasanha Bolonhesa', description: 'Camadas de massa, molho bolonhesa, presunto, queijo e molho branco.'},
    { name: 'Frango Grelhado', description: 'Peito de frango temperado com ervas finas e grelhado.'},
    { name: 'Purê de Batata', description: 'Batatas cozidas e amassadas com manteiga e leite.'},
    { name: 'Peixe Assado', description: 'Peixe temperado com limão, azeite e alecrim, assado no forno com batatas.'}
  ]

  const negativeTestCases = [
    { name: '', description: 'Cozinhar com alho e óleo'},
    { name: 'Feijão', description: 'Deixar de molho e temperar com sazon'},
    { name: 'Macarrão', description: 0},
    { name: 15, description: 65},
    { name: null, description: 'Bife empanado, molho de tomate e queijo'},
    { name: 'Sopa de Legumes', description: null},
    { name: undefined, description: 'Camadas de massa, molho bolonhesa, presunto, queijo e molho branco.'},
    { name: 0.5, description: 'Peito de frango temperado com ervas finas e grelhado.'},
    { name: '', description: 2},
    { name: ['array', 'arrays'], description: 'Peixe temperado com limão, azeite e alecrim, assado no forno com batatas.'}
  ]
  
  it.each(positiveTestCases)('Adicionar prato e oculta formulário após salvar', async ({ name, description }) => {
    render(<DailyMenu idEnterprise={1}/>)

    fireEvent.click(screen.getByLabelText('Adicionar prato'))

    // Escreve nos campos
    fireEvent.change(screen.getByPlaceholderText('Nome do prato'), { target: { value: name } })
    fireEvent.change(screen.getByPlaceholderText('Modo de preparo'), { target: { value: description } })

    // Salva conteúdo
    fireEvent.click(screen.getByText('Salvar'))


    // Verifica se o prato foi inserido de fato
    const dishbtn = await screen.findByText(name)
    expect(screen.queryByText('Salvar')).not.toBeInTheDocument()

    // Verifica se a descrição foi inserida
    fireEvent.click(dishbtn)
    const descriptionExpectation = await screen.findByText(description)
    expect(descriptionExpectation).toBeVisible()
  })

  it.each(negativeTestCases)('Adicionar prato e oculta formulário após salvar', async ({ name, description }) => {
    render(<DailyMenu idEnterprise={1}/>)

    fireEvent.click(screen.getByLabelText('Adicionar prato'))

    // Escreve nos campos
    fireEvent.change(screen.getByPlaceholderText('Nome do prato'), { target: { value: name } })
    fireEvent.change(screen.getByPlaceholderText('Modo de preparo'), { target: { value: description } })

    // Salva conteúdo
    fireEvent.click(screen.getByText('Salvar'))

    // Verifica se a opção salvar ainda está na tela (pratos não foram salvos)
    expect(screen.getByText('Salvar')).toBeInTheDocument()
  })

})