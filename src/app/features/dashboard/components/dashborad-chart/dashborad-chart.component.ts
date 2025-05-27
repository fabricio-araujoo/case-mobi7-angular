import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { parseToHours } from '../../helpers/chart';
import { generateDataTable } from '../../helpers/table';
import { DashboardStoreService } from '../../store/dashboard-store/dashboard-store.service';
import { POI } from '../../types/POI';
import { Posicao } from '../../types/Posicao';
import { IDashboardTableType } from '../dashborad-table/dashborad-table.component';

type ChartDataItem = {
  name: string;
  value: number;
  extra: Partial<IDashboardTableType>;
};

type ChartSeries = {
  name: string;
  series: {
    name: string;
    value: number;
    extra: Partial<IDashboardTableType>;
  }[];
};

type AxisOptions = {
  show: boolean;
  label?: string;
  max?: number;
  min?: number;
};

type LegendOptions = {
  show: boolean;
  title?: string;
};

type ChartOptions = {
  xAxis?: AxisOptions;
  yAxis?: AxisOptions;
  legend?: LegendOptions;
  gradient?: boolean;
  colorScheme?: Color;
};

@Component({
  selector: 'app-dashborad-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashborad-chart.component.html',
  styleUrl: './dashborad-chart.component.scss',
})
export class DashboradChartComponent implements AfterViewInit, OnDestroy {
  private readonly dashboardStore = inject(DashboardStoreService);

  @ViewChild('wrapper', { static: true })
  wrapperRef!: ElementRef<HTMLDivElement>;

  private observer!: ResizeObserver;

  private readonly _data = signal<ChartSeries[]>([]);

  readonly data = computed(() => this._data());

  readonly options: ChartOptions = {
    xAxis: {
      show: false,
    },
    yAxis: {
      show: true,
      label: 'POI',
    },
    legend: {
      show: true,
      title: '',
    },
    gradient: false,
    colorScheme: {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#6b8df2', '#a7d3f2', '#8ce0c0'],
    },
  };

  view: [number, number] | null = null;

  constructor() {
    effect(() => {
      const chartData = this.generateChartData(
        this.dashboardStore.posicoes(),
        this.dashboardStore.pois()
      );

      this._data.set(chartData);
    });
  }

  ngAfterViewInit(): void {
    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        this.view = [width, height];
      }
    });

    this.observer.observe(this.wrapperRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private generateChartData(posicoes: Posicao[], pois: POI[]): ChartSeries[] {
    const grouped = new Map<string, ChartSeries>();

    generateDataTable(posicoes, pois).forEach((row) => {
      const hasKey = grouped.has(row.poi);

      if (!hasKey) {
        grouped.set(row.poi, {
          name: row.poi,
          series: [],
        });
      }

      grouped.get(row.poi)!.series.push({
        name: row.vehicle,
        value: parseToHours(row.totalTime),
        extra: { ...row },
      });
    });

    return Array.from(grouped.values());
  }
}
