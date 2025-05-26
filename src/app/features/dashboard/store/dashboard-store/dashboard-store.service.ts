import { computed, Injectable, signal } from '@angular/core';
import { POI } from '~/app/features/dashboard/types/POI';
import { Posicao } from '~/app/features/dashboard/types/Posicao';

@Injectable({
  providedIn: 'root',
})
export class DashboardStoreService {
  private readonly _placa = signal<string | null>(null);
  private readonly _date = signal<string | null>(null);

  private readonly _pois = signal<POI[]>([]);
  private readonly _placas = signal<string[]>([]);
  private readonly _posicoes = signal<Posicao[]>([]);

  readonly filter = computed(() => ({
    placa: this._placa(),
    date: this._date(),
  }));

  readonly pois = computed(() => this._pois());
  readonly placas = computed(() => this._placas());
  readonly posicoes = computed(() => this._posicoes());

  setPlacaFilter(placa: string | null) {
    this._placa.set(placa);
  }

  setDateFilter(data: string | null) {
    this._date.set(data);
  }

  setPois(pois: POI[]) {
    this._pois.set(pois);
  }

  setPlacas(placas: string[]) {
    this._placas.set(placas);
  }

  setPosicoes(posicoes: Posicao[]) {
    this._posicoes.set(posicoes);
  }
}
