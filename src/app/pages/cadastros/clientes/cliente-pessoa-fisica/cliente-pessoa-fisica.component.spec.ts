import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePessoaFisicaComponent } from './cliente-pessoa-fisica.component';

describe('ClientePessoaFisicaComponent', () => {
  let component: ClientePessoaFisicaComponent;
  let fixture: ComponentFixture<ClientePessoaFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePessoaFisicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientePessoaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
