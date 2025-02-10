import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarMunicipioComponent } from './selecionar-municipio.component';

describe('SelecionarMunicipioComponent', () => {
  let component: SelecionarMunicipioComponent;
  let fixture: ComponentFixture<SelecionarMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarMunicipioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionarMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
