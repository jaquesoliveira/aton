import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloFotovoltaicoFormComponent } from './modulo-fotovoltaico-form.component';

describe('ModuloFotovoltaicoFormComponent', () => {
  let component: ModuloFotovoltaicoFormComponent;
  let fixture: ComponentFixture<ModuloFotovoltaicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloFotovoltaicoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloFotovoltaicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
