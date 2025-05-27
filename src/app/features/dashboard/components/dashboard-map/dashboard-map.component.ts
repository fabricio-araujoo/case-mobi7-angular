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
import { createGeoCircle, formatDate } from '../../helpers/map';
import { DashboardStoreService } from '../../store/dashboard-store/dashboard-store.service';

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
        const posicao = this.dashboardStore.posicoes();

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
  }

  ngOnDestroy(): void {
    this.mapAdapter.destroy();
  }

  private handleLoadMap(): void {
    this.isLoadMap.set(true);
  }

  private async handleLoadPosicaoLayer(): Promise<void> {
    const id = 'Posicao';

    this.mapAdapter.removeAllForId(id);
    await this.addLayer(id); // lembre-se de colocar `await` se `addLayer` usa `addImage` que é assíncrono
  }

  private handleLoadPoisArea(): void {
    const id = 'PoisArea';

    const pois = this.dashboardStore.pois();

    const circleFeatures = pois.map((poi) =>
      createGeoCircle([poi.longitude, poi.latitude], poi.raio)
    );

    this.mapAdapter.addSource(id, circleFeatures);
    this.mapAdapter.addPolygonLayer(id, {});
  }

  private addLayer(id: string): void {
    const blueMarker = 'assets/images/marker-blue.png';

    const posicoes = this.dashboardStore.posicoes();

    this.mapAdapter.addImage(id, blueMarker);

    this.mapAdapter.addSource<{}>(
      id,
      posicoes.map((posicao) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [posicao.longitude, posicao.latitude],
        },
        properties: {
          Id: posicao.id,
          Placa: posicao.placa,
          Data: formatDate(new Date(posicao.data)),
          Ignição: posicao.ignicao ? 'Ligado' : 'Desligado',
          LatLng: `${posicao.latitude}, ${posicao.longitude}`,
        },
      }))
    );

    this.mapAdapter.addPointLayer(id);
  }

  private async removeLayer(id: string): Promise<void> {
    const layerExists = this.mapAdapter.getLayer(id);
    const sourceExists = this.mapAdapter.getSource(id);

    if (layerExists) {
      this.mapAdapter.removeLayer(id);
      this.mapAdapter.removeImage(id);
    }

    if (sourceExists) {
      this.mapAdapter.removeSource(id);
    }
  }
}
