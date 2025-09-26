// kstar.go
package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

// -----------------------------
// Tipos e estruturas
// -----------------------------

type AttrType int

const (
	Numeric AttrType = iota
	Nominal
)

// Descreve um atributo (nome, tipo e valores nominais possíveis)
type Attribute struct {
	Name          string
	Type          AttrType
	NominalValues []string       // lista (se for nominal)
	nominalIndex  map[string]int // mapa para lookup rápido (opcional)
}

func NewNumericAttribute(name string) *Attribute {
	return &Attribute{Name: name, Type: Numeric}
}
func NewNominalAttribute(name string, values []string) *Attribute {
	idx := make(map[string]int)
	for i, v := range values {
		idx[v] = i
	}
	return &Attribute{Name: name, Type: Nominal, NominalValues: values, nominalIndex: idx}
}

// Uma instância de dados (valores como strings para simplificar leitura/serialização)
type Instance struct {
	Values []string // cada valor corresponde a Attribute na mesma ordem
	Label  string   // classe alvo
}

type Dataset struct {
	Attributes []*Attribute
	Instances  []Instance
}

// -----------------------------
// Classificador K*-like
// -----------------------------
type KStar struct {
	X0   float64  // escala para atributos numéricos (x0 > 0)
	S    float64  // parâmetro para atributos simbólicos (0 < s < 1)
	Mix  float64  // mistura/suavização (>=0). 1.0 = usa P tal como está, <1 suaviza influência
	Data *Dataset // referência ao dataset de treino
}

// Construtor com valores defaults (ajustáveis)
func NewKStar(x0, s, mix float64, data *Dataset) *KStar {
	if x0 <= 0 {
		x0 = 1.0
	}
	if s < 0 || s >= 1 {
		s = 0.1
	}
	if mix <= 0 {
		mix = 1.0
	}
	return &KStar{X0: x0, S: s, Mix: mix, Data: data}
}

// -----------------------------
// Funções utilitárias
// -----------------------------

// tenta converter string para float64, devolve (valor, ok)
func parseFloat(s string) (float64, bool) {
	f, err := strconv.ParseFloat(strings.TrimSpace(s), 64)
	if err != nil {
		return 0, false
	}
	return f, true
}

// Estima um valor razoável para X0 (média dos desvios padrão das features numéricas).
// Útil para inicializar automaticamente.
func EstimateDefaultX0(data *Dataset) float64 {
	total := 0.0
	count := 0.0
	for i, attr := range data.Attributes {
		if attr.Type != Numeric {
			continue
		}
		// coletar valores numéricos válidos
		var vals []float64
		sum := 0.0
		for _, inst := range data.Instances {
			if v, ok := parseFloat(inst.Values[i]); ok {
				vals = append(vals, v)
				sum += v
			}
		}
		n := float64(len(vals))
		if n <= 1 {
			continue
		}
		mean := sum / n
		ss := 0.0
		for _, v := range vals {
			ss += (v - mean) * (v - mean)
		}
		sd := math.Sqrt(ss / (n - 1.0))
		total += sd
		count += 1.0
	}
	if count == 0 {
		return 1.0
	}
	return total / count
}

// -----------------------------
// Núcleo: probabilidade de transformação entre duas instâncias
//
// Aqui usamos uma aproximação prática:
// - atributos numéricos: p = exp(-|a-b| / X0)
// - atributos nominais: p = 1 - S  (se igual) ou S/(n-1) (se diferente), onde n é nº de valores
//
// Somamos logs (log-probabilidade) para evitar underflow.
// -----------------------------
func (k *KStar) logTransformProb(a Instance, b Instance) float64 {
	logp := 0.0
	const eps = 1e-300 // evita log(0)
	for i, attr := range k.Data.Attributes {
		va := strings.TrimSpace(a.Values[i])
		vb := strings.TrimSpace(b.Values[i])
		// missing -> prob pequena
		if va == "" || vb == "" {
			logp += math.Log(1e-6)
			continue
		}
		if attr.Type == Numeric {
			fa, ok1 := parseFloat(va)
			fb, ok2 := parseFloat(vb)
			if !ok1 || !ok2 {
				logp += math.Log(1e-6)
				continue
			}
			diff := math.Abs(fa - fb)
			p := math.Exp(-diff / k.X0) // decai exponencialmente com a diferença
			if p < eps {
				p = eps
			}
			logp += math.Log(p)
		} else { // nominal
			if va == vb {
				p := 1.0 - k.S
				if p < eps {
					p = eps
				}
				logp += math.Log(p)
			} else {
				nvals := float64(len(attr.NominalValues))
				denom := math.Max(1.0, nvals-1.0)
				p := k.S / denom
				if p < eps {
					p = eps
				}
				logp += math.Log(p)
			}
		}
	}
	return logp
}

// -----------------------------
// Predição: para um exemplo x, calcula uma "probabilidade" por classe
// - calcula logP(x -> train_i) para cada instância de treino
// - transforma em pesos via exp(log - maxlog) (trick numérico)
// - soma pesos por classe e normaliza
// -----------------------------
func (k *KStar) Predict(x Instance) (pred string, classProbs map[string]float64) {
	n := len(k.Data.Instances)
	if n == 0 {
		return "", nil
	}
	logs := make([]float64, n)
	maxLog := math.Inf(-1)
	for i, tr := range k.Data.Instances {
		logs[i] = k.logTransformProb(x, tr)
		if logs[i] > maxLog {
			maxLog = logs[i]
		}
	}
	weights := make([]float64, n)
	sumW := 0.0
	for i, l := range logs {
		// aplicamos Mix como um expoente para modular influência do termo de prob.
		// Mix == 1 : comportamento padrão; Mix < 1 : suaviza diferenças
		w := math.Exp(k.Mix * (l - maxLog))
		weights[i] = w
		sumW += w
	}
	classSums := make(map[string]float64)
	for i, tr := range k.Data.Instances {
		classSums[tr.Label] += weights[i]
	}
	classProbs = make(map[string]float64)
	for c, s := range classSums {
		classProbs[c] = s / sumW
	}
	// escolhe a classe com maior probabilidade
	best := ""
	bestp := -1.0
	for c, p := range classProbs {
		if p > bestp {
			bestp = p
			best = c
		}
	}
	return best, classProbs
}

// -----------------------------
// Exemplo de uso (toy dataset)
// -----------------------------
func main() {
	// Definição de atributos (exemplo misto)
	attrs := []*Attribute{
		NewNumericAttribute("LOC"),                                         // lines of code (numérico)
		NewNumericAttribute("TeamSize"),                                    // tamanho do time (numérico)
		NewNominalAttribute("Methodology", []string{"Agile", "Waterfall"}), // nominal
	}

	// Dataset de treino (valores como strings, ordem deve bater com attrs)
	train := []Instance{
		{Values: []string{"1000", "3", "Agile"}, Label: "Small"},
		{Values: []string{"1200", "4", "Agile"}, Label: "Small"},
		{Values: []string{"8000", "8", "Waterfall"}, Label: "Large"},
		{Values: []string{"9500", "10", "Waterfall"}, Label: "Large"},
		{Values: []string{"3000", "5", "Agile"}, Label: "Medium"},
	}

	ds := &Dataset{Attributes: attrs, Instances: train}

	// Estima X0 automaticamente (opcional)
	x0 := EstimateDefaultX0(ds)
	fmt.Printf("Estimated X0 (scale for numeric attributes) = %.4f\n", x0)

	// cria classificador K*
	k := NewKStar(x0, 0.15, 1.0, ds) // S=0.15, Mix=1.0

	// exemplo de teste
	test := Instance{Values: []string{"2000", "4", "Agile"}, Label: ""}

	pred, probs := k.Predict(test)
	fmt.Printf("Predicted: %s\n", pred)
	fmt.Printf("Class probabilities:\n")
	for c, p := range probs {
		fmt.Printf("  %s: %.4f\n", c, p)
	}
}
