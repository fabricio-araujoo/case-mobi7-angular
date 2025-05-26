import { Injectable } from '@angular/core';
import { LngLatLike, Map, MapLayerMouseEvent, Popup } from 'maplibre-gl';
import {
  IMapAdapter,
  IMapInitOptions,
  IMapSource,
  IMapSourceFeature,
} from './map-adapter.service.interface';

@Injectable({ providedIn: 'root' })
export class MapAdapterService implements IMapAdapter {
  private mapInstance!: Map;
  private readonly key = 'nny032iKN6rA7I0BqENm';

  get map(): Map {
    return this.mapInstance;
  }

  initMap(container: HTMLElement, options: IMapInitOptions): void {
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

  isAlreadyExistLayer(id: string): boolean {
    return this.mapInstance.getLayer(`Layer__${id}`) !== undefined;
  }

  async addImage(id: string, image: string): Promise<void> {
    const _image = await this.mapInstance.loadImage(image);

    this.mapInstance.addImage(this.imageId(id), _image.data);
  }

  addSource<T>(id: string, features: IMapSourceFeature<T>[]): void {
    const geoJsonFeatures = features.map((f) => ({
      ...f,
      type: 'Feature',
    }));

    const source: IMapSource<T> = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: geoJsonFeatures as any, // ensure type compatibility
      },
    };

    this.map.addSource(this.sourceId(id), source);
  }

  addPointLayer(id: string): void {
    this.mapInstance.addLayer({
      id: this.layerId(id),
      type: 'symbol',
      source: this.sourceId(id),
      layout: {
        'icon-image': `Image__${id}`,
        // get the year from the source's "year" property
        'text-field': ['get', 'year'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1.25],
        'text-anchor': 'top',
      },
    });

    this.mapInstance.on('click', this.layerId(id), (e: MapLayerMouseEvent) => {
      const feature = e.features?.[0];
      if (!feature) return;

      new Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${feature.properties}</strong>`)
        .addTo(this.mapInstance);
    });
  }

  addPolygonLayer(
    id: string,
    style: { fill?: string; opacity?: number; outline?: string } = {}
  ): void {
    this.mapInstance.addLayer({
      id: this.layerId(id),
      type: 'fill',
      source: this.sourceId(id),
      paint: {
        'fill-color': style.fill ?? '#6b8df2',
        'fill-opacity': style.opacity ?? 0.4,
        'fill-outline-color': style.outline ?? '#2c3e50',
      },
    });
  }

  removeImage(id: string): void {
    if (this.mapInstance.hasImage(this.imageId(id))) {
      this.mapInstance.removeImage(this.imageId(id));
    }
  }

  removeLayer(id: string): void {
    if (this.mapInstance.getLayer(this.layerId(id))) {
      this.mapInstance.removeLayer(this.layerId(id));
    }
  }

  removeSource(id: string): void {
    if (this.mapInstance.getSource(this.sourceId(id))) {
      this.mapInstance.removeSource(this.sourceId(id));
    }
  }

  // Helpers for consistent IDs
  private layerId(id: string): string {
    return `Layer__${id}`;
  }

  private sourceId(id: string): string {
    return `Source__${id}`;
  }

  private imageId(id: string): string {
    return `Image__${id}`;
  }
}
