import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MapAdapterService } from '~/app/core/adapter/map-adapter/map-adapter.service';
import { IMapAdapter } from '~/app/core/adapter/map-adapter/map-adapter.service.interface';
import { createGeoCircle } from '../../helpers/map';
import { DashboardStoreService } from '../../store/dashboard-store/dashboard-store.service';
import { Posicao } from '../../types/Posicao';

@Component({
  selector: 'app-dashboard-map',
  imports: [],
  templateUrl: './dashboard-map.component.html',
  styleUrl: './dashboard-map.component.scss',
})
export class DashboardMapComponent {
  private readonly mapAdapter: IMapAdapter = inject(MapAdapterService);
  private readonly dashboardStore = inject(DashboardStoreService);

  @ViewChild('mapContainer', { static: true })
  private mapRef!: ElementRef<HTMLDivElement>;

  private readonly isLoadMap = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.isLoadMap()) {
        this.handleLoadPosicaoLayer();
      }
    });
  }

  ngAfterViewInit(): void {
    this.mapAdapter.initMap(this.mapRef.nativeElement, {
      center: [-46.62529, -23.533773], // Rio de Janeiro
      zoom: 5,
    });

    this.mapAdapter.map.on('load', () => {
      this.handleLoadMap();
      this.handleLoadPoisArea();
    });

    this.mapAdapter.map.on('click', 'Layer__PosicaoLayer', (e) => {
      const feature = e.features?.[0];
      if (!feature) return;

      const coordinates = (feature.geometry as any).coordinates.slice();
      const nome = feature.properties || 'Sem nome';
    });
  }

  ngOnDestroy(): void {
    this.mapAdapter.destroy();
  }

  private handleLoadMap(): void {
    this.isLoadMap.set(true);
  }

  private handleLoadPosicaoLayer(): void {
    const id = 'PosicaoLayer';

    this.removeLayer(id);

    const blueMarker = 'assets/images/marker-blue.png';

    const posicoes = this.dashboardStore.posicoes();

    this.mapAdapter.addImage(id, blueMarker);

    this.mapAdapter.addSource<Posicao>(
      id,
      posicoes.map((posicao) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [posicao.longitude, posicao.latitude],
        },
        properties: { ...posicao },
      }))
    );

    this.mapAdapter.addPointLayer(id);
  }

  private handleLoadPoisArea(): void {
    const id = 'PoisAreaLayer';

    const pois = this.dashboardStore.pois();

    const circleFeatures = pois.map((poi) =>
      createGeoCircle([poi.longitude, poi.latitude], poi.raio)
    );

    this.mapAdapter.addSource(id, circleFeatures);
    this.mapAdapter.addPolygonLayer(id, {});
  }

  private removeLayer(id: string): void {
    if (this.mapAdapter.isAlreadyExistLayer(id)) {
      this.mapAdapter.removeLayer(id);
      this.mapAdapter.removeSource(id);
      this.mapAdapter.removeImage(id);
    }
  }
}
