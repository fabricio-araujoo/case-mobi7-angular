import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '~/app/shared/components/table/table.component';
import { POI } from '~/app/shared/types/POI';
import { Posicao } from '~/app/shared/types/Posicao';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { generatePOISummary, organizeByVehicle } from '../../helpers/table';
import { DashboardStoreService } from '../../store/dashboard-store/dashboard-store.service';

export type IDashboardTableType = {
  vehicle: string;
  poi: string;
  totalTime: string; // formatado tipo "3h 45min"
  entries: number;
  lastEntry: string;
  ignition: boolean;
};

@Component({
  selector: 'app-dashborad-table',
  imports: [TableComponent, TagComponent],
  templateUrl: './dashborad-table.component.html',
  styleUrl: './dashborad-table.component.scss',
})
export class DashboradTableComponent implements AfterViewInit {
  private readonly dashboardStore = inject(DashboardStoreService);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('ignitionCell') ignitionCell!: TemplateRef<{
    $implicit: IDashboardTableType;
  }>;

  column: TableColumn<IDashboardTableType>[] = [];

  readonly data = computed(() =>
    this.generateDataTable(
      this.dashboardStore.posicoes(),
      this.dashboardStore.pois()
    )
  );

  ngAfterViewInit(): void {
    this.column = [
      { label: 'Nome', field: 'poi' },
      { label: 'Placa', field: 'vehicle' },
      { label: 'Tempo total', field: 'totalTime' },
      { label: 'Entradas', field: 'entries' },
      { label: 'Última entrada', field: 'lastEntry' },
      {
        label: 'Ignição',
        field: 'ignition',
        render: this.ignitionCell,
      },
    ];

    this.cdr.detectChanges();
  }

  handleIgnitionName(ignition: boolean): string {
    return ignition ? 'Em movimento' : 'Desligado';
  }

  private generateDataTable(
    posicoes: Posicao[],
    pois: POI[]
  ): IDashboardTableType[] {
    // Agrupa as posições por placa do veículo.
    const byVehicle = organizeByVehicle(posicoes);

    return Object.entries(byVehicle).flatMap(([placa, lista]) => {
      const sorted = [...lista].sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
      );

      // Para cada POI, processa a lista de posições do veículo
      return pois
        .map((poi) => generatePOISummary(placa, sorted, poi))
        .filter((linha): linha is IDashboardTableType => linha !== null); // remove POIs onde não houve entrada
    });
  }
}
