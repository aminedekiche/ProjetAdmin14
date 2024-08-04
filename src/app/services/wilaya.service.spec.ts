import { TestBed } from '@angular/core/testing';

import { WilayaService } from './wilaya.service';

describe('WilayaService', () => {
  let service: WilayaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WilayaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
