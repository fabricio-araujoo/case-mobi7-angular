import { IDashboardTableType } from '~/app/features/dashboard/components/dashborad-table/dashborad-table.component';
import { POI } from '~/app/shared/types/POI';
import { Posicao } from '~/app/shared/types/Posicao';

export function generateDataTable(
  posicoes: Posicao[],
  pois: POI[]
): IDashboardTableType[] {
  // Agrupa as posições por placa do veículo.
  const byVehicle = organizeByVehicle(posicoes);

  return Object.entries(byVehicle).flatMap(([placa, lista]) => {
    const sorted = [...lista].sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );

    // Para cada POI, processa a lista de posições do veículo
    return pois
      .map((poi) => generatePOISummary(placa, sorted, poi))
      .filter((linha): linha is IDashboardTableType => linha !== null); // remove POIs onde não houve entrada
  });
}

export function organizeByVehicle(
  posicoes: Posicao[]
): Record<string, Posicao[]> {
  return posicoes.reduce((acc, pos) => {
    acc[pos.placa] = acc[pos.placa] || [];
    acc[pos.placa].push(pos);

    return acc;
  }, {} as Record<string, Posicao[]>);
}

export function generatePOISummary(
  placa: string,
  posicoes: Posicao[],
  poi: POI
): IDashboardTableType | null {
  // Calcula os dados da linha da tabela para um veículo em um único POI.

  let inside = false; // Flag: estava dentro do POI na posição anterior?
  let entries = 0; // Número de entradas no POI
  let lastEntry: string | null = null;
  let totalTime = 0; // Tempo total (em ms) dentro do POI

  // Percorre as posições em pares: atual e próxima
  posicoes.slice(0, -1).forEach((atual, i) => {
    const next = posicoes[i + 1];
    const isInside = isInsidePOI(atual, poi); // Verifica se está dentro do POI

    if (!isInside) {
      inside = isInside;

      return;
    }

    // Entrou agora (mudança de fora para dentro)
    if (!inside) {
      entries++;

      lastEntry = atual.data;
    }

    // Soma o tempo entre posições consecutivas
    const intervalo =
      new Date(next.data).getTime() - new Date(atual.data).getTime();

    totalTime += intervalo;

    inside = isInside;
  });

  // Se não passou por esse POI, retorna null
  if (totalTime === 0) {
    return null;
  }

  return {
    vehicle: placa,
    poi: poi.nome,
    totalTime: formatTime(totalTime),
    entries: entries,
    lastEntry: lastEntry ? new Date(lastEntry).toLocaleString() : '-',
    ignition: inside,
  };
}

function isInsidePOI(
  pos: { latitude: number; longitude: number },
  poi: { latitude: number; longitude: number; raio: number }
): boolean {
  // Calcula a distância entre dois pontos geográficos usando a fórmula de Haversine

  const R = 6371000; // Raio da Terra em metros
  const dLat = toRadians(poi.latitude - pos.latitude);
  const dLon = toRadians(poi.longitude - pos.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(pos.latitude)) *
      Math.cos(toRadians(poi.latitude)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= poi.raio;
}

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

function formatTime(ms: number): string {
  // Converte tempo em milissegundos para string legível: "3h 25min"

  const min = Math.floor(ms / 1000 / 60);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}min`;
}
