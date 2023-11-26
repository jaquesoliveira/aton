import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showFiller = false;

  constructor( private route: Router){}

  sair(){
    this.route.navigate(['/'])
  }

  abrirSimulacaoB(){
    this.route.navigate(['simulacao-b'])
  }
}
