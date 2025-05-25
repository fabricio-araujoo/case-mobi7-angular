import { HttpResponse } from '@angular/common/http';

export interface IHttpAdapter {
  get<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
  post<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
  put<T>(
    url: string,
    body?: IHttpServiceBody,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
  delete<T>(
    url: string,
    queryParams?: IHttpServiceQueryParams,
    options?: IHttpServiceOptions
  ): Promise<HttpResponse<T>>;
}

export type IHttpServiceQueryParams = Record<string, any>;

export type IHttpServiceBody = Record<string, any>;

export type IHttpServiceOptions = Record<string, any>;
