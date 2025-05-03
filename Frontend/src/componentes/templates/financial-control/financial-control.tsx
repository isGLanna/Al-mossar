import React from "react"
import "./Dashboard.scss"

export function Dashboard () {
  // Dados fictícios para exemplo
  const receitaTotal = 120000;
  const despesasTotais = 80000;
  const saldo = receitaTotal - despesasTotais;
  const receitaMeses = Array(12).fill(0).map((_, index) => receitaTotal * (index + 1) / 12);
  const despesasMeses = Array(12).fill(0).map((_, index) => despesasTotais * (index + 1) / 12);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__box">
          <h3>Receita Total</h3>
          <p>{`R$ ${receitaTotal.toFixed(2)}`}</p>
        </div>
        <div className="dashboard__box">
          <h3>Despesas Totais</h3>
          <p>{`R$ ${despesasTotais.toFixed(2)}`}</p>
        </div>
        <div className="dashboard__box">
          <h3>Saldo</h3>
          <p>{`R$ ${saldo.toFixed(2)}`}</p>
        </div>
      </div>

      <div className="dashboard__charts">
        <div className="dashboard__histogram">
          <h4>Histograma de Receita</h4>
          <div className="chart">
            {receitaMeses.map((valor, index) => (
              <div key={index} className="chart__bar" style={{ height: `${(valor / receitaTotal) * 100}%` }}></div>
            ))}
          </div>
        </div>

        <div className="dashboard__histogram">
          <h4>Histograma de Despesas</h4>
          <div className="chart">
            {despesasMeses.map((valor, index) => (
              <div key={index} className="chart__bar" style={{ height: `${(valor / despesasTotais) * 100}%` }}></div>
            ))}
          </div>
        </div>

        <div className="dashboard__pie">
          <h4>Distribuição das Despesas</h4>
          <div className="pie">
            {/* Circulo representando a distribuição das despesas */}
            <div className="pie__circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
