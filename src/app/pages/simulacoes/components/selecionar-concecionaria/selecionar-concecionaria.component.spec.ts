import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarConcecionariaComponent } from './selecionar-concecionaria.component';

describe('SelecionarConcecionariaComponent', () => {
  let component: SelecionarConcecionariaComponent;
  let fixture: ComponentFixture<SelecionarConcecionariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarConcecionariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionarConcecionariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
