import {
  Feature,
  Map,
  Source,
  SourceSpecification,
  TypedStyleLayer,
} from 'maplibre-gl';

export interface IMapAdapter {
  map: Map;
  initMap(container: HTMLElement, options: IMapInitOptions): void;
  destroy(): void;

  addImage(id: string, image: string): Promise<void>;
  addSource<T>(id: string, features: IMapSourceFeature<T>[]): void;
  addPointLayer(id: string): void;
  addPolygonLayer(
    id: string,
    style: { fill?: string; opacity?: number; outline?: string }
  ): void;

  getLayer(id: string): TypedStyleLayer | undefined;
  getSource(id: string): Source | undefined;

  removeAllForId(id: string): void;
  removeImage(id: string): void;
  removeLayer(id: string): void;
  removeSource(id: string): void;
}

export type IMapInitOptions = {
  center: [number, number]; // [lng, lat]
  zoom: number;
};

export type IMapSource<T> = SourceSpecification & {
  data: { type: string; features: IMapSourceFeature<T>[] };
};

export type IMapSourceFeature<T> = {
  type: string;
  geometry: {
    type: Feature['type'];
    coordinates: number[] | number[][] | number[][][];
  };
  properties: T;
};
