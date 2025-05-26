import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
export class DashboardComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  private readonly dashboardStore = inject(DashboardStoreService);
  private readonly fb = inject(FormBuilder);

  readonly loadingSignal = useLoading();

  filtersForm = this.fb.group({
    placa: [''],
    data: [null],
  });

  genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
  ];

  constructor() {
    effect(() => {
      this.filtersForm.valueChanges.subscribe((filters) => {
        console.log(filters);
      });
    });
  }

  ngOnInit() {
    Promise.all([this.fetchPositions(), this.fetchPois()]);
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
    const response = await this.vehicleService.getPosicao();

    if (!response) {
      return;
    }

    this.dashboardStore.setPosicoes(response);
  }
}
