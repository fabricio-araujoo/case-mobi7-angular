export interface IMapAdapter {
  initMap(container: HTMLElement, options: IMapInitOptions): void;
  destroy(): void;
}

export type IMapInitOptions = {
  center: [number, number]; // [lng, lat]
  zoom: number;
};
