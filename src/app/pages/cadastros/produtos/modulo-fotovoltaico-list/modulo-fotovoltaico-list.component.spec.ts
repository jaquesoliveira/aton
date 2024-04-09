import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloFotovoltaicoListComponent } from './modulo-fotovoltaico-list.component';

describe('ModuloFotovoltaicoListComponent', () => {
  let component: ModuloFotovoltaicoListComponent;
  let fixture: ComponentFixture<ModuloFotovoltaicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloFotovoltaicoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloFotovoltaicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
