import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaListComponent } from './proposta-list.component';

describe('PropostaListComponent', () => {
  let component: PropostaListComponent;
  let fixture: ComponentFixture<PropostaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropostaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropostaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
