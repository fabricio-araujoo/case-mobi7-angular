import { Component, Input } from '@angular/core';

export type TableColumn<T> = {
  label: string;
  field: keyof T;
};

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input() column: TableColumn<T>[] = [];
  @Input() data: T[] = [];
}
