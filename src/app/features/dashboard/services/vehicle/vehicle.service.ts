import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpAdapterService } from '~/app/core/adapter/http-adapter/http-adapter.service';
import { IHttpAdapter } from '~/app/core/adapter/http-adapter/http-adapter.service.interface';
import {
  IGetPlacasResponse,
  IGetPoisResponse,
  IGetPosicaoResponse,
} from './vehicle.service.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private http: IHttpAdapter = inject(HttpAdapterService);

  async getPlacas(): Promise<IGetPlacasResponse | undefined> {
    try {
      const response = await this.http.get<IGetPlacasResponse>(
        '/posicao/placas'
      );

      if (this.http.hasError(response)) {
        return;
      }

      return response.body;
    } catch (err) {
      const _err = err as HttpErrorResponse;

      throw new Error(
        `Erro ao buscar placas: ${_err.message} - ${_err.statusText}`
      );
    }
  }

  async getPosicao(): Promise<IGetPosicaoResponse | undefined> {
    try {
      const response = await this.http.get<IGetPosicaoResponse>('/posicao');

      if (this.http.hasError(response)) {
        return;
      }

      return response.body;
    } catch (err) {
      const _err = err as HttpErrorResponse;

      throw new Error(
        `Erro ao buscar posições: ${_err.message} - ${_err.statusText}`
      );
    }
  }

  async getPois(): Promise<IGetPoisResponse | undefined> {
    try {
      const response = await this.http.get<IGetPoisResponse>('/pois');

      if (this.http.hasError(response)) {
        return;
      }

      return response.body;
    } catch (err) {
      const _err = err as HttpErrorResponse;

      throw new Error(
        `Erro ao buscar POIs: ${_err.message} - ${_err.statusText}`
      );
    }
  }
}
