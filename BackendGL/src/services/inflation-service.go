package services

import (
	"BackendGL/src/clients"
	"fmt"
)

type InflationService struct {
	sidraClient *clients.SidraClient
}

func NewInflationService(c *clients.SidraClient) *InflationService {
	return &InflationService{sidraClient: c}
}

func (s *InflationService) GetFoodInflation() ([]clients.FoodInflation, error) {
	return s.sidraClient.FetchFoodInflation()
}

func (s *InflationService) CheckFoodInflation() error {
	data, err := s.sidraClient.FetchFoodInflation()
	if err != nil {
		return err
	}

	if len(data) == 0 {
		return fmt.Errorf("Empty")
	}

	fmt.Println("Dataset: ", data)

	return nil
}
