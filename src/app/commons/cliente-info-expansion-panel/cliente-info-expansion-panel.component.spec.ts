import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInfoExpansionPanelComponent } from './cliente-info-expansion-panel.component';

describe('ClienteInfoExpansionPanelComponent', () => {
  let component: ClienteInfoExpansionPanelComponent;
  let fixture: ComponentFixture<ClienteInfoExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteInfoExpansionPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteInfoExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
