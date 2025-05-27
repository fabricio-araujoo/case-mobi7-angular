import { Posicao } from './Posicao';

export type POI = {
  id: number;
  nome: string;
  raio: number; // em metros
  latitude: number;
  longitude: number;
};

export type POIData = {
  tempoTotal: number; // em milissegundos
  entradas: number;
  ultimaEntrada: string | null;
  dentro: boolean;
  anterior: Posicao | null;
};
