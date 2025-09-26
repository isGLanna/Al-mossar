package clients

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type FoodInflation struct {
	ID        string `json:"id"`
	Name      string `json:"D3N"`
	Month     string `json:"V3"`
	Variation string `json:"V63"`
}

type SidraClient struct {
	BaseURL string
	Client  *http.Client
}

func NewSidraClient() *SidraClient {
	return &SidraClient{
		BaseURL: "https://apisidra.ibge.gov.br/values",
		Client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// Query Food Inflation Data from Sindra API
func (c *SidraClient) FetchFoodInflation() ([]FoodInflation, error) {
	url := fmt.Sprintf("%s/t/1612/n1/all/v/63/p/all?formato=json", c.BaseURL)

	resp, err := c.Client.Get(url)

	if err != nil {
		return nil, fmt.Errorf("Failed to make request to Sidra API: %v", err)
	}

	defer resp.Body.Close()

	var data []FoodInflation
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("Failed to decode response: %v", err)
	}

	// Remove the first element
	if len(data) > 0 {
		data = data[1:]
	}

	return data, nil
}
