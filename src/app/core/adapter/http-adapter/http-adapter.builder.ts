import { HttpParams } from '@angular/common/http';
import { IHttpServiceQueryParams } from './http-adapter.interface';

export const buildQueryParams = (
  queryParams: IHttpServiceQueryParams = {}
): HttpParams => {
  let params = new HttpParams();

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];

    params = params.set(key, String(value));
  });

  return params;
};
