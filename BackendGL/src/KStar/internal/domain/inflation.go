package domain

import (
	"strconv"
)

type InflationDataset struct {
	Month      []float64 // mes
	IpcaVar    []float64 // ipca_variacao
	Ipca12m    []float64 // ipca_acumulado_doze_meses
	Ipca15Var  []float64 // ipca15_variacao
	Ipca15_12m []float64 // ipca15_acumulado_doze_meses
	IpaVar     []float64 // ipa_variacao
	Selic      []float64 // selic_ano
	RealRate   []float64 // juros_reais
}

func (d *InflationDataset) CountDistinctVariables(collumn []float64) float64 {
	distinct := make(map[float64]struct{})

	for _, variable := range collumn {
		distinct[variable] = struct{}{}
	}

	return float64(len(distinct))
}

func (d *InflationDataset) ConvertCSVToDataset(records [][]string) *InflationDataset {
	records = records[1:]

	for _, record := range records {

		month, _ := strconv.ParseFloat(record[0], 64)
		d.Month = append(d.Month, month)

		ipcaVar, _ := strconv.ParseFloat(record[1], 64)
		d.IpcaVar = append(d.IpcaVar, ipcaVar)

		ipca12m, _ := strconv.ParseFloat(record[2], 64)
		d.Ipca12m = append(d.Ipca12m, ipca12m)

		ipca15Var, _ := strconv.ParseFloat(record[3], 64)
		d.Ipca15Var = append(d.Ipca15Var, ipca15Var)

		ipca15_12m, _ := strconv.ParseFloat(record[4], 64)
		d.Ipca15_12m = append(d.Ipca15_12m, ipca15_12m)

		ipaVar, _ := strconv.ParseFloat(record[5], 64)
		d.IpaVar = append(d.IpaVar, ipaVar)

		selic, _ := strconv.ParseFloat(record[6], 64)
		d.Selic = append(d.Selic, selic)

		realRate, _ := strconv.ParseFloat(record[7], 64)
		d.RealRate = append(d.RealRate, realRate)
	}

	return d
}
