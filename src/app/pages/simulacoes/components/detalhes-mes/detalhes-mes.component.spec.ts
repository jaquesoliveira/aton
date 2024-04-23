import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesMesComponent } from './detalhes-mes.component';

describe('DetalhesMesComponent', () => {
  let component: DetalhesMesComponent;
  let fixture: ComponentFixture<DetalhesMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesMesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
