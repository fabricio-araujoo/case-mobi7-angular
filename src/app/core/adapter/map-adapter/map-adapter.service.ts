import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'maplibre-gl';
import { IMapAdapter, IMapInitOptions } from './map-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class MapAdapterService implements IMapAdapter {
  private mapInstance!: Map;

  private readonly key: string = 'nny032iKN6rA7I0BqENm';

  initMap(container: HTMLElement, options: IMapInitOptions): void {
    // style: 'https://demotiles.maplibre.org/style.json',

    this.mapInstance = new Map({
      container,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${this.key}`,
      center: options.center as LngLatLike,
      zoom: options.zoom,
    });
  }

  destroy(): void {
    this.mapInstance?.remove();
  }
}
