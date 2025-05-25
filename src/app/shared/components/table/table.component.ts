import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

export type TableColumn<T> = {
  label: string;
  field: keyof T;
  render?: TemplateRef<{ $implicit: T }>;
};

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input() column: TableColumn<T>[] = [];
  @Input() data: T[] = [];
}
