import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { useLoading } from '~/app/shared/signal-composable/loading';
import { DashboardMapComponent } from './components/dashboard-map/dashboard-map.component';
import { DashboradChartComponent } from './components/dashborad-chart/dashborad-chart.component';
import { DashboradFilterComponent } from './components/dashborad-filter/dashborad-filter.component';
import { DashboradTableComponent } from './components/dashborad-table/dashborad-table.component';

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
    this.loadingSignal.wrap(this.fetchDataFilter());
  }

  handleChange(event: any) {
    console.log('changed', event);
  }

  private async fetchDataFilter() {
    try {
      setTimeout(() => {
        console.log('oiii');
      }, 2000);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
