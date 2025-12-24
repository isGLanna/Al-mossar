# K-Star-Algorithm
Aplicação prática do algoritmo K-Star como modelo preditivo de taxa de inflação mensal. Nessa ocasião, o conjunto de dados utilizadoprovém de distribuição pública no Kaggle, logo, será anexado abaixo o link de acesso ao mesmo.

Este algoritmo, proposto em 1995 por John G. Cleary e Leonard E. Trigg é uma abordagem aprimorada de algoritmos de Raciocínio Baseado em Casos (RBC) e segue principios semelhantes. Entretanto, este se diferencia ao aplicar lidar com registros da seguinte maneira: qual a probabilidade de transformar uma variável de entrada A em B, tal que B está contido no histórico de casos anteriores?
Essa proposição segue a representação por lógica por *P(A -> B)*. Logo, o modelo analisa a parcela de influencia de cada caso anterior atribuindo peos, seguido do cálculo do produto da *"probabilidade condicional"* de transformação de cada atributo com a variável dependente e os divide pela soma dos pesos.

Embora seja eficiente à maioria dos casos entre algoritmos de RBC, este dataset lida com séries temporais, cuja a dependência de casos anteriores para estimar impede do modelo interpretar informações de progressões futuras, principalmente quando o tipo de atributo analisado tende a extrapolar o conhecimento atual do modelo. Outro adendo, o conjunto de dados contém pouca informação de fato relevante para verificar impactos sobre índices mensais de inflação. Portanto, deve ser considerado apenas uma proposta e um protótipo de código para aplicações reais em outras ocasiões favoráveis para algoritmos RBC.

Ref.:
dataset -> https://www.kaggle.com/code/fidelissauro/infla-o-brasil-sele-o-de-modelos-de-forecast
