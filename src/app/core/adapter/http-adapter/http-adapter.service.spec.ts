import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NotificationAdapterService } from '../notification-adapter/notification-adapter.service';
import { HttpAdapterService } from './http-adapter.service';

describe('HttpAdapterService', () => {
  let httpService: HttpAdapterService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationAdapterService,
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpService = TestBed.inject(HttpAdapterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should perform GET request', async () => {
    const mockData = { name: 'John' };

    httpService.get('/users').then((response) => {
      expect(response.body).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users`);

    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should perform POST request', async () => {
    const body = { name: 'Jane' };
    const mockResponse = { id: 1, name: 'Jane' };

    httpService.post('/users', body).then((response) => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/users`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);
  });

  it('should perform PUT request', async () => {
    const body = { name: 'Updated' };
    const mockResponse = { id: 1, name: 'Updated' };

    httpService.put('/users/1', body).then((response) => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/1`);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);
  });

  it('should perform DELETE request with query params', async () => {
    const queryParams = { soft: 'true' };
    const mockResponse = { success: true };

    httpService.delete('/users/1', queryParams).then((response) => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      (r) =>
        r.method === 'DELETE' &&
        r.url === `${baseUrl}/users/1` &&
        r.params.get('soft') === 'true'
    );

    req.flush(mockResponse);
  });
});
