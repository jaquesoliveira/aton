import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquadramentoTarifarioComponent } from './enquadramento-tarifario.component';

describe('EnquadramentoTarifarioComponent', () => {
  let component: EnquadramentoTarifarioComponent;
  let fixture: ComponentFixture<EnquadramentoTarifarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquadramentoTarifarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnquadramentoTarifarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
