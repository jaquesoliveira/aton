import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarModuloComponent } from './selecionar-modulo.component';

describe('SelecionarModuloComponent', () => {
  let component: SelecionarModuloComponent;
  let fixture: ComponentFixture<SelecionarModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarModuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionarModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
