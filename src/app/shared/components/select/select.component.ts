import {
  Component,
  computed,
  ElementRef,
  Input,
  signal,
  ViewChild,
} from '@angular/core';

type Option = { label: string; value: string };

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @ViewChild('inputRef') inputRef?: ElementRef;

  @Input() label = '';
  @Input() options: Option[] = [];
  @Input() placeholder = 'Selecione';

  private _value = signal<string>('');
  private _isOpen = signal<boolean>(false);

  value = computed<string>(() => this._value());

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

  handleClick() {
    this.toggle();
  }

  handleInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    this._value.set(inputValue);
  }

  handleSelectOption(option: Option): void {
    this._value.set(option.label);
    this._isOpen.set(false);
  }

  private toggle() {
    this._isOpen.update((prev) => !prev);
  }

  private handleOutsideClick(event: MouseEvent): void {
    if (!this.inputRef?.nativeElement.contains(event.target)) {
      this._isOpen.set(false);
    }
  }
}
