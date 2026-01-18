package kstar

import (
	"math"
)

func (k *KStar) calculateNumericalWeights(observed []float64, input float64) []float64 {
	weights := make([]float64, len(observed))

	for i := range observed {
		weights[i] = 1 / (1 + math.Abs(observed[i]-input))
	}

	return weights
}
