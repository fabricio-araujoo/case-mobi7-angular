import { IOption } from '~/app/shared/components/select/select.component';

export function buildPlacasOptions(placas: string[]): IOption[] {
  return placas.map((placa) => ({
    label: placa,
    value: placa,
  }));
}
