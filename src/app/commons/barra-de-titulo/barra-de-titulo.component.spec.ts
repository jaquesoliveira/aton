import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDeTituloComponent } from './barra-de-titulo.component';

describe('BarraDeTituloComponent', () => {
  let component: BarraDeTituloComponent;
  let fixture: ComponentFixture<BarraDeTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraDeTituloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraDeTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
