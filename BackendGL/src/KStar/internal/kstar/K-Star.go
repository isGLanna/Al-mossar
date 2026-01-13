package kstar

import (
	"BackendGL/src/kstar/src/internal/domain"
)

type KStar struct {
	dataset      *domain.InflationDataset
	predictValue float64
}

func New(data *domain.InflationDataset) *KStar {
	return &KStar{
		dataset:      data,
		predictValue: 0.0,
	}
}

func product(p domain.ProbabilityOfTransformation, i int) float64 {
	return p.Month[i] * p.Ipca12m[i] * p.Ipca15Var[i] * p.Ipca15_12m[i] * p.IpaVar[i] * p.Selic[i] * p.RealRate[i]
}

func sum(p domain.ProbabilityOfTransformation, i int) float64 {
	return p.Month[i] + p.Ipca12m[i] + p.Ipca15Var[i] + p.Ipca15_12m[i] + p.IpaVar[i] + p.Selic[i] + p.RealRate[i]
}

func (k *KStar) Predict(x []float64) float64 {
	weights := domain.ProbabilityOfTransformation{}

	weights.Month = k.calculateCategoricalWeights(k.dataset.Month, x[0])
	weights.Ipca12m = k.calculateNumericalWeights(k.dataset.Ipca12m, x[1])
	weights.Ipca15Var = k.calculateNumericalWeights(k.dataset.Ipca15Var, x[2])
	weights.Ipca15_12m = k.calculateNumericalWeights(k.dataset.Ipca15_12m, x[3])
	weights.IpaVar = k.calculateNumericalWeights(k.dataset.IpaVar, x[4])
	weights.Selic = k.calculateNumericalWeights(k.dataset.Selic, x[5])
	weights.RealRate = k.calculateNumericalWeights(k.dataset.RealRate, x[6])

	var size = len(k.dataset.Month)
	var numerator float64 = 0.0
	var denominator float64 = 0.0

	for i := range size {
		w := product(weights, i)
		numerator += w * k.dataset.IpcaVar[i]
		denominator += w
	}

	return numerator / denominator
}
