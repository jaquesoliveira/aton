import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-de-titulo',
  templateUrl: './barra-de-titulo.component.html',
  styleUrl: './barra-de-titulo.component.css'
})
export class BarraDeTituloComponent {

  @Input() titulo: string
}
