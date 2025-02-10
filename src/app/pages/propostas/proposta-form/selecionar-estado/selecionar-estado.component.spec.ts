import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarEstadoComponent } from './selecionar-estado.component';

describe('SelecionarEstadoComponent', () => {
  let component: SelecionarEstadoComponent;
  let fixture: ComponentFixture<SelecionarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
