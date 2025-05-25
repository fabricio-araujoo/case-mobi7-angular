import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '~/app/shared/components/table/table.component';
import { TagComponent } from '../../../../shared/components/tag/tag.component';

type IDashboardTableType = {
  poi: string;
  totalTime: number;
  entries: number;
  lastEntry: number;
  ignition: boolean;
};

@Component({
  selector: 'app-dashborad-table',
  imports: [TableComponent, TagComponent],
  templateUrl: './dashborad-table.component.html',
  styleUrl: './dashborad-table.component.scss',
})
export class DashboradTableComponent implements AfterViewInit {
  @ViewChild('ignitionCell') ignitionCell!: TemplateRef<{
    $implicit: IDashboardTableType;
  }>;

  private readonly cdr = inject(ChangeDetectorRef);

  column: TableColumn<IDashboardTableType>[] = [];

  data: IDashboardTableType[] = [
    {
      poi: 'Eclair',
      totalTime: 262,
      entries: 16,
      lastEntry: 23,
      ignition: true,
    },
    {
      poi: 'Frozen Yogurt',
      totalTime: 159,
      entries: 6,
      lastEntry: 24,
      ignition: false,
    },
    {
      poi: 'Ice cream sandwich',
      totalTime: 237,
      entries: 9,
      lastEntry: 37,
      ignition: true,
    },
    {
      poi: 'Frozen Yogurt',
      totalTime: 356,
      entries: 16,
      lastEntry: 49,
      ignition: false,
    },
  ];

  ngAfterViewInit(): void {
    this.column = [
      { label: 'Nome', field: 'poi' },
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
}
