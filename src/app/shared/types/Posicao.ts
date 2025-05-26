export type Posicao = {
  id: number;
  placa: string;
  data: string; // ISO date string
  velocidade: number; // km/h
  latitude: number;
  longitude: number;
  ignicao: boolean;
};
