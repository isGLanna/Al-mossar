package domain

type ProbabilityOfTransformation struct {
	Month      []float64 // mes
	Ipca12m    []float64 // ipca_acumulado_doze_meses
	Ipca15Var  []float64 // ipca15_variacao
	Ipca15_12m []float64 // ipca15_acumulado_doze_meses
	IpaVar     []float64 // ipa_variacao
	Selic      []float64 // selic_ano
	RealRate   []float64 // juros_reais
}
