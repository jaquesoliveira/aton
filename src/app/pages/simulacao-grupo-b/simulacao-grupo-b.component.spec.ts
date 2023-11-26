import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoGrupoBComponent } from './simulacao-grupo-b.component';

describe('SimulacaoGrupoBComponent', () => {
  let component: SimulacaoGrupoBComponent;
  let fixture: ComponentFixture<SimulacaoGrupoBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulacaoGrupoBComponent]
    });
    fixture = TestBed.createComponent(SimulacaoGrupoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
