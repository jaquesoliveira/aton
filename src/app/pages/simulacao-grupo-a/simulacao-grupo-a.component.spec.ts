import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoGrupoAComponent } from './simulacao-grupo-a.component';

describe('SimulacaoGrupoAComponent', () => {
  let component: SimulacaoGrupoAComponent;
  let fixture: ComponentFixture<SimulacaoGrupoAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulacaoGrupoAComponent]
    });
    fixture = TestBed.createComponent(SimulacaoGrupoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
