# Dashboard

A ideia a partir do case foi uma dash onde o usuário pudesse cruzar informações e ter seus dados visualizados de maneira rápida e fácil.

## Tabela

A tabela é o principal ponto do case, ela é o primeiro lugar onde o projeto cruza informações para demonstração de dados

### Colunas

1. Nome

   Nome do POI (Ponto de Interesse) fornecido pelo endpoint /pois.

   Identificador do local. Pode ser, por exemplo, um galpão, cliente, posto, zona de carga etc.

2. Placa

   Identificador do veículo.

   Permite distinguir os veículos que visitam o mesmo POI. Isso é crucial para frotas compartilhadas, gestão de entregas e controle logístico.

3. Tempo total

   Tempo somado que o veículo permaneceu dentro do POI.

   Soma dos intervalos entre posições consecutivas dentro do POI (com base na distância haversine).

   Permite saber quanto tempo um veículo ficou parado ou operando em determinada região.

4. Entradas

   Número de vezes que o veículo entrou no POI no dia.

   Variação entre posição fora → posição dentro do POI.

5. Última entrada

   Data e hora da última vez que o veículo entrou no POI.

   Quando uma nova entrada é detectada, a data e hora da posição é salvo.

   Ajuda a entender recência da visita.

6. Ignição

   Status da ignição na última posição registrada dentro do POI.

   Mostra se o veículo estava ligado ou desligado no momento final no POI.

   Indica uma provável parada ou estacionamento.

## Gráfico

Uma representação um pouco mais visual e interativa das informações dispostas no gráfico, separando por POI, a quantidade de tempo que cada veículo permaneceu em cada um.

## Mapa

Visto que temos informações geográficas tanto dos POIs quanto das posições dos veículos, um mapa interativo ser para uma interpretação dessas informações.

Nele estão dispostos as posições dos veículos, com algumas informações em seus tooltips, e também os POIs em forma de poligonos no mapa.
