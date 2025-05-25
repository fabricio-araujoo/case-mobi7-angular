import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { IMapAdapter } from '~/app/core/adapter/map-adapter/map-adapter.interface';
import { MapAdapterService } from '~/app/core/adapter/map-adapter/map-adapter.service';

@Component({
  selector: 'app-dashboard-map',
  imports: [],
  templateUrl: './dashboard-map.component.html',
  styleUrl: './dashboard-map.component.scss',
})
export class DashboardMapComponent {
  @ViewChild('mapContainer', { static: true })
  private mapRef!: ElementRef<HTMLDivElement>;

  private readonly mapAdapter: IMapAdapter = inject(MapAdapterService);

  ngAfterViewInit(): void {
    this.mapAdapter.initMap(this.mapRef.nativeElement, {
      center: [-43.1729, -22.9068], // Rio de Janeiro
      zoom: 10,
    });
  }

  ngOnDestroy(): void {
    this.mapAdapter.destroy();
  }
}
