import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaViewComponent } from './proposta-view.component';

describe('PropostaViewComponent', () => {
  let component: PropostaViewComponent;
  let fixture: ComponentFixture<PropostaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropostaViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropostaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
