import { TestBed } from '@angular/core/testing';

import { ModuloFotovoltaicoService } from './modulo-fotovoltaico.service';

describe('ModuloFotovoltaicoService', () => {
  let service: ModuloFotovoltaicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuloFotovoltaicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
