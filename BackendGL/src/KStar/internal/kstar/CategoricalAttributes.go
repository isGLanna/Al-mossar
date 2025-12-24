package kstar

func (k *KStar) calculateCategoricalWeights(observed []float64, input float64) []float64 {
	weights := make([]float64, 0, len(observed))
	distinctVariables := k.dataset.CountDistinctVariables(observed)

	for i := range observed {
		if observed[i] == input {
			weights = append(weights, 1.0)
		} else {
			weights = append(weights, 1.0/distinctVariables)
		}
	}

	return weights
}
