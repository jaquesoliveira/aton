import { TestBed } from '@angular/core/testing';

import { TaAplicacaoService } from './ta-aplicacao.service';

describe('TaAplicacaoService', () => {
  let service: TaAplicacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaAplicacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
