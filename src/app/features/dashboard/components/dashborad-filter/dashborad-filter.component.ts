import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { useLoading } from '~/app/shared/signal-composable/loading';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import {
  IOption,
  SelectComponent,
} from '../../../../shared/components/select/select.component';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { DashboardStoreService } from '../../store/dashboard-store/dashboard-store.service';

type IFilterForm = {
  placa: string | null;
  data: string | null;
};

@Component({
  selector: 'app-dashborad-filter',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    DatePickerComponent,
  ],
  templateUrl: './dashborad-filter.component.html',
  styleUrl: './dashborad-filter.component.scss',
})
export class DashboradFilterComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  private readonly dashboardStore = inject(DashboardStoreService);
  private readonly fb = inject(FormBuilder);

  filtersForm = this.fb.group<IFilterForm>({
    placa: '',
    data: null,
  });

  readonly placas = computed(() =>
    this.buildPlacasOptions(this.dashboardStore.placas())
  );

  readonly loadingSignal = useLoading();

  constructor() {
    effect(() => {
      this.filtersForm.valueChanges.subscribe((filters) => {
        this.dashboardStore.setPlacaFilter(filters.placa ?? null);
        this.dashboardStore.setDateFilter(filters.data ?? null);
      });
    });
  }

  ngOnInit() {
    this.loadingSignal.wrap(this.fetchPlacas());
  }

  private async fetchPlacas() {
    const response = await this.vehicleService.getPlacas();

    if (!response) {
      return;
    }

    this.dashboardStore.setPlacas(response);
  }

  private buildPlacasOptions(placas: string[]): IOption[] {
    return placas.map((placa) => ({
      label: placa,
      value: placa,
    }));
  }
}
