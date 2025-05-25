import { CommonModule } from '@angular/common';
import { Component, Input, computed, forwardRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-date-picker',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    IconComponent,
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label: string = 'Data';
  @Input() placeholder: string = 'Selecionar data';
  @Input() disabled = false;

  value: Date | null = null;

  private _isOpen = signal<boolean>(false);

  isOpen = computed(() => this._isOpen());

  onChange = (value: Date | null) => {};
  onTouched = () => {};

  writeValue(value: Date | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleInput(event: MatDatepickerInputEvent<any, any>) {
    const input = event.value;
    const parsedDate = input ? new Date(input) : null;

    this.value = parsedDate;
    this.onChange(parsedDate);
    this.onTouched();
  }

  handleOpened() {
    this._isOpen.set(true);
  }

  handleClosed() {
    this._isOpen.set(false);
  }
}
