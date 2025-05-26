import { Component, effect, inject } from '@angular/core';
import { useLoading } from '~/app/shared/signal-composable/loading';
import { DashboardMapComponent } from './components/dashboard-map/dashboard-map.component';
import { DashboradChartComponent } from './components/dashborad-chart/dashborad-chart.component';
import { DashboradFilterComponent } from './components/dashborad-filter/dashborad-filter.component';
import { DashboradTableComponent } from './components/dashborad-table/dashborad-table.component';
import { VehicleService } from './services/vehicle/vehicle.service';
import { DashboardStoreService } from './store/dashboard-store/dashboard-store.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboradFilterComponent,
    DashboradTableComponent,
    DashboradChartComponent,
    DashboardMapComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly vehicleService = inject(VehicleService);
  private readonly dashboardStore = inject(DashboardStoreService);

  readonly loadingSignal = useLoading();

  constructor() {
    effect(() => {
      console.log('DashboardComponent initialized');

      this.dashboardStore.filter();

      Promise.all([this.fetchPositions(), this.fetchPois()]);
    });
  }

  handleChange(event: any) {
    console.log('changed', event);
  }

  private async fetchPois() {
    const response = await this.vehicleService.getPois();

    if (!response) {
      return;
    }

    this.dashboardStore.setPois(response);
  }

  private async fetchPositions() {
    const filter = this.dashboardStore.filter();

    const params = {
      ...(filter.placa ? { placa: filter.placa } : {}),
      ...(filter.date ? { data: filter.date } : {}),
    };

    const response = await this.vehicleService.getPosicao({ ...params });

    if (!response) {
      return;
    }

    this.dashboardStore.setPosicoes(response);
  }
}
