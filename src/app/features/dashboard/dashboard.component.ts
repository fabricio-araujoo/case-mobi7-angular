import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { SelectComponent } from '../../shared/components/select/select.component';

@Component({
  selector: 'app-dashboard',
  imports: [ContainerComponent, SelectComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly fb = inject(FormBuilder);

  genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
  ];

  handleChange(event: any) {
    console.log('changed', event);
  }
}
