import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInexistenteComponent } from './pagina-inexistente.component';

describe('PaginaInexistenteComponent', () => {
  let component: PaginaInexistenteComponent;
  let fixture: ComponentFixture<PaginaInexistenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaInexistenteComponent]
    });
    fixture = TestBed.createComponent(PaginaInexistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
