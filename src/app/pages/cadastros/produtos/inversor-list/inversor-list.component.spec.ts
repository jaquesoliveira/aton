import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversorListComponent } from './inversor-list.component';

describe('InversorListComponent', () => {
  let component: InversorListComponent;
  let fixture: ComponentFixture<InversorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InversorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InversorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
