import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteExpansionPanelComponent } from './cliente-expansion-panel.component';

describe('ClienteExpansionPanelComponent', () => {
  let component: ClienteExpansionPanelComponent;
  let fixture: ComponentFixture<ClienteExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteExpansionPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
