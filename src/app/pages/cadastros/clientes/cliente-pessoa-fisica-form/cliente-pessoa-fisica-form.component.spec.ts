import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePessoaFisicaFormComponent } from './cliente-pessoa-fisica-form.component';

describe('ClientePessoaFisicaFormComponent', () => {
  let component: ClientePessoaFisicaFormComponent;
  let fixture: ComponentFixture<ClientePessoaFisicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePessoaFisicaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientePessoaFisicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
