import { TestBed } from '@angular/core/testing';

import { GurpoBServiceService } from './gurpo-b-service.service';

describe('GurpoBServiceService', () => {
  let service: GurpoBServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GurpoBServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
