import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

type Option = { label: string; value: string };

@Component({
  selector: 'app-select',
  imports: [IconComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @ViewChild('inputRef') inputRef?: ElementRef;

  @Input() label = '';
  @Input() options: Option[] = [];
  @Input() placeholder = 'Selecione';

  private _value = signal<string>('');
  private _selectedOption = signal<Option | null>(null);
  private _isOpen = signal<boolean>(false);

  value = computed<string>(() => this._value());
  selectedOption = computed<Option | null>(() => this._selectedOption());
  isOpen = computed<boolean>(() => this._isOpen());

  filteredOptions = computed(() => {
    const query = this.value().toLowerCase();

    if (!query) {
      return this.options;
    }

    return this.options.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  });

  ngOnInit(): void {
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  writeValue(value: string): void {
    const option = this.options.find((opt) => opt.value === value) || null;

    this._selectedOption.set(option);
    this._value.set(option?.label || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleClick() {
    this._value.update(() => '');

    this.toggle();
    this.onTouched();
  }

  handleInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    this._value.set(inputValue);
  }

  handleSelectOption(option: Option): void {
    this._value.set(option.label);
    this._selectedOption.set(option);

    this.toggle();

    this.onChange(option.value);
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  private toggle() {
    this._isOpen.update((prev) => !prev);
  }

  private handleOutsideClick(event: MouseEvent): void {
    if (this.inputRef && !this.inputRef.nativeElement.contains(event.target)) {
      this._isOpen.set(false);
    }
  }
}
