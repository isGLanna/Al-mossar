import { useState, useEffect} from "react"
import { NavActions } from '../../organismos/topbar/nav-actions'
import { createEmployee } from '../../../models/EmployeeFactory'
import { useAuthStore } from '../../../store/auth-store.ts'
import * as Icons from './icons.ts'
import "./Dashboard.scss"

export function Dashboard () {
    const employee = useAuthStore((state) => state.employee)
  
    if (!employee) return <p>Usuário não encontrado</p>
  
    const user = createEmployee(
      employee.id,
      employee.idEnterprise,
      employee.email,
      employee.name,
      employee.surname,
      employee.role,
      employee.token
    )

  // Se a largura da tela reduzir, o mês será abreviado
  const [ nameMonths, setNameMonths ] = useState<string[]> ([])

  useEffect(() => {
    const updateMonthNames = () => {
      setNameMonths(window.innerWidth > 820 ? 
        ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] :
        ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'] 
    )
    }
    updateMonthNames()

    window.addEventListener('resize', updateMonthNames)

    return () => window.removeEventListener('resize', updateMonthNames)
  }, [])

  const receiveTotal = 1376000

  const salary = 710000
  const rent = 69000
  const tax = parseFloat((receiveTotal * 0.07).toFixed(2))
  const food = 293000

  const expenseTotal = salary + rent + tax + food
  const balance = receiveTotal - expenseTotal

  const receives = Array.from({ length: 12 }, (_, i) => receiveTotal * (i + 1) / 12)
  const expenses = Array.from({ length: 12 }, (_, i) => expenseTotal * (i + 1) / 12)

  const maxValue = Math.max(receiveTotal, expenseTotal)

  // Periodo que a empresa possui para ser observado
  const months = [ 'março', 'abril', 'maio' ]
  const years = [ '2025' ]

  return (
    <div className="dashboard-container">
      <div className="dashboard">

        <NavActions employee={user} />

        <aside>
          <article>
            <h3>Dashboard Financeiro </h3>
          </article>

          <button className="card">
            <div className="title">
              <Icons.AiOutlineRise size={25} /> Receita
            </div>
            <label className="value" style={{color: 'green'}}>R${receiveTotal}</label>
          </button>

          <button className="card">
            <div className="title">
              <Icons.FaUsers size={25} /> Salário
            </div>
            <label className="value" style={{color: '#da0000'}}>R${salary}</label>
          </button>

          <button className="card">
            <div className="title">
              <Icons.LuSalad size={23} /> Alimento
            </div>
            <label className="value" style={{color: '#da0000'}}>R${food}</label>
          </button>

          <button className="card">
            <div className="title">
              <Icons.FaHouseUser size={20} /> Aluguel
            </div>
            <label className="value" style={{color: '#da0000'}}>R${rent}</label>
          </button>

          <button className="card">
            <div className="title">
              <Icons.FaFileInvoiceDollar size={20} /> Imposto
            </div>
            <label className="value" style={{color: '#da0000'}}>R${tax}</label>
          </button>

          <button className="card row-grid-8">
            <div className="title">
              <Icons.FaFilePdf  size={20} /> Gerar PDF
            </div>
          </button>
        </aside>

        <main>
          
          <header>
            <div className="box receive">
              <h3>Receita Total</h3>
              <p>{`R$ ${receiveTotal.toFixed(2)}`}</p>
            </div>
            <div className="box expense">
              <h3>Despesas Totais</h3>
              <p>{`R$ ${expenseTotal.toFixed(2)}`}</p>
            </div>
            <div className="box netIncome">
              <h3>Saldo</h3>
              <p>{`R$ ${balance.toFixed(2)}`}</p>
            </div>
            <div className="box" style={{background: 'transparent', boxShadow: 'none'}}>
              <select>
                {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
                ))}
              </select>
              <select>
                {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </header>

          <div className="dashboard__histogram">

            <div className="histogram-block">
              <label className="title"> Receita / Despesa </label>

              <div className="chart_container">

                <div className="eixoy" style={{height: '50px'}}>
                  <div>0</div>
                  <div>{maxValue * 0.5}</div>
                  <div>{maxValue}</div>
                </div>

                {nameMonths.map((name, i) => (
                  <div className="chart_column" key={i}>
                    <div className="month">
                      <div
                        className="chart receive"
                        style={{ height: `${(receives[i] / maxValue) * 100}%` }}
                      />
                      <div
                        className="chart expense"
                        style={{ height: `${(expenses[i] / maxValue) * 100}%` }}
                      />
                    </div>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="histogram-block">
              <label className="title"> Renda Líquida</label>

              <div className="chart_container" style={{gap: '0.4rem'}}>

                <div className="eixoy" style={{height: '50px'}}>
                  <div>0</div>
                  <div>{maxValue * 0.5}</div>
                  <div>{maxValue}</div>
                </div>

                {nameMonths.map((name, i) => (
                  <div className="chart_column" key={i}>
                    <div className="month">
                      <div
                        className="chart netIncome"
                        style={{ 
                          height: `${(Math.abs(receives[i] - expenses[i]) / maxValue) * 100}%`,
                          backgroundColor: receives[i] > expenses[i] ? '' : '#e02020'}}
                      />
                    </div>
                    <span className="label">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Dashboard;
