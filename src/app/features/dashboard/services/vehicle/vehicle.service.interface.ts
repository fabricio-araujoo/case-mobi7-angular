import { POI } from '~/app/features/dashboard/types/POI';
import { Posicao } from '~/app/features/dashboard/types/Posicao';

export type IGetPlacasResponse = string[] | null;

export type IGetPosicaoParams = {
  placa?: string | null;
  data?: string | null;
};

export type IGetPosicaoResponse = Posicao[] | null;

export type IGetPoisResponse = POI[] | null;
