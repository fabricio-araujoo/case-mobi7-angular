import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { POI } from '~/app/features/dashboard/types/POI';
import { Posicao } from '~/app/features/dashboard/types/Posicao';
import {
  TableColumn,
  TableComponent,
} from '~/app/shared/components/table/table.component';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { generateDataTable } from '../../helpers/table';
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

  constructor() {
    effect(() => {
      this.cdr.detectChanges();
    });
  }

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
    return ignition ? 'Ligado' : 'Desligado';
  }

  private generateDataTable(
    posicoes: Posicao[],
    pois: POI[]
  ): IDashboardTableType[] {
    return generateDataTable(posicoes, pois);
  }
}
