import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

interface ChartDataItem {
  name: string;
  value: number;
}

interface AxisOptions {
  show: boolean;
  label: string;
}

interface LegendOptions {
  show: boolean;
  title: string;
}

interface ChartOptions {
  xAxis: AxisOptions;
  yAxis: AxisOptions;
  legend: LegendOptions;
  gradient: boolean;
  colorScheme: Color;
}

@Component({
  selector: 'app-dashborad-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashborad-chart.component.html',
  styleUrl: './dashborad-chart.component.scss',
})
export class DashboradChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapper', { static: true })
  wrapperRef!: ElementRef<HTMLDivElement>;

  view: [number, number] | null = null;
  private observer!: ResizeObserver;

  readonly data: ChartDataItem[] = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
    { name: 'Mar', value: 300 },
  ];

  readonly options: ChartOptions = {
    xAxis: {
      show: true,
      label: 'Mês',
    },
    yAxis: {
      show: true,
      label: 'Vendas',
    },
    legend: {
      show: true,
      title: 'Vendas por mês',
    },
    gradient: false,
    colorScheme: {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#6b8df2', '#a7d3f2', '#8ce0c0'],
    },
  };

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
}
