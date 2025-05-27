import { Injectable } from '@angular/core';
import {
  LngLatLike,
  Map,
  MapLayerMouseEvent,
  Popup,
  Source,
  TypedStyleLayer,
} from 'maplibre-gl';
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
        features: geoJsonFeatures as any,
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
        'icon-image': this.imageId(id),
        'text-field': ['get', 'year'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1.25],
        'text-anchor': 'top',
      },
    });

    this.addPopup(id);
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

  getLayer(id: string): TypedStyleLayer | undefined {
    return this.mapInstance.getLayer(this.layerId(id)) as
      | TypedStyleLayer
      | undefined;
  }

  getSource(id: string): Source | undefined {
    return this.mapInstance.getSource(this.sourceId(id));
  }

  removeImage(id: string): void {
    if (this.mapInstance.hasImage(this.imageId(id))) {
      this.mapInstance.removeImage(this.imageId(id));
    }
  }

  removeLayer(id: string): void {
    const layerId = this.layerId(id);
    if (this.mapInstance.getLayer(layerId)) {
      this.mapInstance.removeLayer(layerId);
    }
  }

  removeSource(id: string): void {
    const sourceId = this.sourceId(id);
    if (this.mapInstance.getSource(sourceId)) {
      this.mapInstance.removeSource(sourceId);
    }
  }

  removeAllForId(id: string): void {
    this.removeLayer(id);
    this.removeSource(id);
    this.removeImage(id);
  }

  private addPopup(id: string) {
    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'map__popup',
      offset: [0, -16],
    });

    this.mapInstance.on(
      'mouseenter',
      this.layerId(id),
      (e: MapLayerMouseEvent) => {
        this.mapInstance.getCanvas().style.cursor = 'pointer';

        const feature = e.features?.[0];
        if (!feature || !feature.geometry) return;

        const coordinates = (feature.geometry as any).coordinates.slice();
        const properties = feature.properties as Record<string, any>;

        const html = `
          <div style="max-width: 240px;">
            ${Object.entries(properties)
              .map(
                ([key, value]) => `<div><strong>${key}</strong>: ${value}</div>`
              )
              .join('')}
          </div>
        `;

        popup.setLngLat(coordinates).setHTML(html).addTo(this.mapInstance);
      }
    );

    this.mapInstance.on('mouseleave', this.layerId(id), () => {
      this.mapInstance.getCanvas().style.cursor = '';
      popup.remove();
    });
  }

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
