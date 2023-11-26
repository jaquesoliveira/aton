import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionamentoBateriaComponent } from './dimensionamento-bateria.component';

describe('DimensionamentoBateriaComponent', () => {
  let component: DimensionamentoBateriaComponent;
  let fixture: ComponentFixture<DimensionamentoBateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DimensionamentoBateriaComponent]
    });
    fixture = TestBed.createComponent(DimensionamentoBateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
