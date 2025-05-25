import { TestBed } from '@angular/core/testing';

import { MapAdapterService } from './map-adapter.service';

describe('MapAdapterService', () => {
  let service: MapAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
