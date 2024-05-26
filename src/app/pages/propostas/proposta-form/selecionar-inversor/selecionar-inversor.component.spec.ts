import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarInversorComponent } from './selecionar-inversor.component';

describe('SelecionarInversorComponent', () => {
  let component: SelecionarInversorComponent;
  let fixture: ComponentFixture<SelecionarInversorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarInversorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionarInversorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
