import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  IHttpAdapter,
  IHttpServiceBody,
  IHttpServiceOptions,
  IHttpServiceQueryParams,
} from './http-adapter.service.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpAdapterService implements IHttpAdapter {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://challenge-backend.mobi7.io/';

  get<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.get<T>(this.buildUrl(url), {
        ...options,
        params: { ...queryParams },
        observe: 'response' as const,
      })
    );
  }

  post<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.post<T>(this.buildUrl(url), body, {
        ...options,
        observe: 'response' as const,
      })
    );
  }

  put<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.put<T>(this.buildUrl(url), body, {
        ...options,
        observe: 'response' as const,
      })
    );
  }

  delete<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>> {
    return firstValueFrom(
      this.http.delete<T>(this.buildUrl(url), {
        ...options,
        params: { ...queryParams },
        observe: 'response' as const,
      })
    );
  }

  hasError<T>(request: HttpResponse<T>): boolean {
    if (!request.body) {
      return true;
    }

    const SUCCESS_CODE = [
      HttpStatusCode.Ok,
      HttpStatusCode.Created,
      HttpStatusCode.NoContent,
    ];

    const error = request.status && !SUCCESS_CODE.includes(request.status);

    if (error) {
      return true;
    }

    return false;
  }

  private buildUrl(url: string) {
    return this.baseUrl + url;
  }
}
