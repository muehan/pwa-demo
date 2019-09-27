import { TestBed } from '@angular/core/testing';

import { VapidService } from './vapid.service';

describe('VapidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VapidService = TestBed.get(VapidService);
    expect(service).toBeTruthy();
  });
});
