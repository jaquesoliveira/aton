import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-mes',
  templateUrl: './detalhes-mes.component.html',
  styleUrl: './detalhes-mes.component.css'
})
export class DetalhesMesComponent implements OnInit, AfterContentInit{

  @Input() mes = '';
  @Input() valor = '';
  urlImagem = '';

  ngOnInit(): void {
    this.urlImagem = `assets/images/${this.mes}.png`;
  }

  ngAfterContentInit(): void {
    this.urlImagem = `assets/images/${this.mes}.png`;
  }
}
