import { TestBed } from '@angular/core/testing';

import { ClientePessoaFisicaService } from './cliente-pessoa-fisica.service';

describe('ClientePessoaFisicaService', () => {
  let service: ClientePessoaFisicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientePessoaFisicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
