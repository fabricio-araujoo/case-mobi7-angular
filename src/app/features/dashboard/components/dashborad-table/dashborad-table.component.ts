import { Component } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '~/app/shared/components/table/table.component';

type Type = {
  name: string;
  totalTime: number;
  entries: number;
  lastEntry: number;
  ignition: number;
};

@Component({
  selector: 'app-dashborad-table',
  imports: [TableComponent],
  templateUrl: './dashborad-table.component.html',
  styleUrl: './dashborad-table.component.scss',
})
export class DashboradTableComponent {
  column: TableColumn<Type>[] = [
    { label: 'Nome', field: 'name' },
    { label: 'Tempo total', field: 'totalTime' },
    { label: 'Entradas', field: 'entries' },
    { label: 'Ultima entrada', field: 'lastEntry' },
    { label: 'Ignição', field: 'ignition' },
  ];

  data = [
    {
      name: 'Eclair',
      totalTime: 262,
      entries: 16,
      lastEntry: 23,
      ignition: 23,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 159,
      entries: 6,
      lastEntry: 24,
      ignition: 24,
    },
    {
      name: 'Ice cream sandwich',
      totalTime: 237,
      entries: 9,
      lastEntry: 37,
      ignition: 37,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 356,
      entries: 16,
      lastEntry: 49,
      ignition: 49,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
    {
      name: 'Frozen Yogurt',
      totalTime: 452,
      entries: 25,
      lastEntry: 51,
      ignition: 51,
    },
  ];
}
