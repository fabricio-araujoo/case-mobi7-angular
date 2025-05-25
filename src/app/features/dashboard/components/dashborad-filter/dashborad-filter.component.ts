import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { useLoading } from '~/app/shared/signal-composable/loading';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-dashborad-filter',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    DatePickerComponent,
  ],
  templateUrl: './dashborad-filter.component.html',
  styleUrl: './dashborad-filter.component.scss',
})
export class DashboradFilterComponent {
  private readonly fb = inject(FormBuilder);

  readonly loadingSignal = useLoading();

  filtersForm = this.fb.group({
    placa: [''],
    data: [null],
  });

  genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
  ];

  constructor() {
    effect(() => {
      this.filtersForm.valueChanges.subscribe((filters) => {
        console.log(filters);
      });
    });
  }
}
