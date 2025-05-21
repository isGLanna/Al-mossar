/* import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DailyMenu } from './daily-menu'
import { createDailyMenu } from '../../../../models/DailyMenuFactory'

describe('DailyMenu renders correctly', () => {
  const idEnterprise = 1
  const menu = createDailyMenu(idEnterprise, 1, '2023-10-01', '2023-10-31', 1, 1, 1, 1)
  
  render(<DailyMenu idEnterprise={ } />)

  // Verifica se o título do mês está presente
  expect(screen.getByText('Outubro')).toBeInTheDocument()

  // Verifica se os dias da semana estão presentes
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  weekDays.forEach(day => {
    expect(screen.getByText(day)).toBeInTheDocument()
  })

  // Verifica se os dias do mês estão presentes
  for (let i = 1; i <= 31; i++) {
    expect(screen.getByText(i.toString())).toBeInTheDocument()
  }
})
*/

/*         {newDish && (
          // Criar novo prato ativa estilo para expansão suave
          <div className="dish new-dish">
            <div className='flex flex-col gap-2'>
              <input
                name='name'
                placeholder="Nome do prato"
                value={newDish.name}
                onChange={handleNewDishChange}
              />
              <textarea
                name="description"
                placeholder="Modo de preparo"
                value={newDish.description}
                onChange={handleNewDishChange}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'center' }}>
              <button onClick={handleSaveNewDish}>Salvar</button>
              <button onClick={() => setNewDish(null)}>Cancelar</button>
            </div>
          </div>
        )}
*/
