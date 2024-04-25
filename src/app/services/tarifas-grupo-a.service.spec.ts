import { TestBed } from '@angular/core/testing';

import { TarifasGrupoAService } from './tarifas-grupo-a.service';

describe('TarifasGrupoAService', () => {
  let service: TarifasGrupoAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifasGrupoAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
