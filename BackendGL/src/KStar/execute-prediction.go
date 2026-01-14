package main

import (
	"encoding/csv"
	"fmt"
	"os"

	"BackendGL/src/kstar/internal/domain"
	"BackendGL/src/kstar/internal/kstar"
)

func executePrediction() {
	file, err := os.Open("./data/inflation_data.csv")
	if err != nil {
		panic(err)
	}

	defer file.Close()

	records, err := csv.NewReader(file).ReadAll()
	if err != nil {
		panic(err)
	}

	df := &domain.InflationDataset{}

	// Converter os dados do CSV para a tipagem da struct
	df = df.ConvertCSVToDataset(records)

	/* Treinamento e teste do modelo */

	model := kstar.New(df)

	// Valores de referência devem ser considerar dados mais recentes da inflação
	var x_input = make([]float64, 7)
	/*
		Sequência dos inputs:
		0 → Mês (Month)
		1 → IPCA acumulado 12 meses (Ipca12m)
		2 → IPCA-15 variação do mês (Ipca15Var)
		3 → IPCA-15 acumulado 12 meses (Ipca15_12m)
		4 → IPA variação (IpaVar)
		5 → Selic anual (Selic)
		6 → Juros reais (RealRate)
	*/
	fmt.Println("Valores de entrada para predição:")
	/*
		fmt.Scanln("%f", &x_input[0])
		fmt.Scanln("%f", &x_input[1])
		fmt.Scanln("%f", &x_input[2])
		fmt.Scanln("%f", &x_input[3])
		fmt.Scanln("%f", &x_input[4])
		fmt.Scanln("%f", &x_input[5])
		fmt.Scanln("%f", &x_input[6])
	*/
	x_input[0] = 12.0  // Mês
	x_input[1] = 4.33  // IPCA acumulado 12 meses
	x_input[2] = 0.18  // IPCA-15 variação do mês
	x_input[3] = 0.20  // IPCA-15 acumulado 12 meses
	x_input[4] = -0.11 // IPA variação
	x_input[5] = 15.0  // Selic anual
	x_input[6] = 9.44  // Juros reais

	value := model.Predict(x_input)

	fmt.Printf("Inflação prevista ao mês: %.4f%% \n\n", value)
	fmt.Println("Pressione ENTER para sair")
	fmt.Scanln()
}
