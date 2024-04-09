import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversorFormComponent } from './inversor-form.component';

describe('InversorFormComponent', () => {
  let component: InversorFormComponent;
  let fixture: ComponentFixture<InversorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InversorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InversorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
