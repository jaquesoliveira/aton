import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulacao-grupo-b',
  templateUrl: './simulacao-grupo-b.component.html',
  styleUrls: ['./simulacao-grupo-b.component.css']
})
export class SimulacaoGrupoBComponent {
  showFiller = false;
  simultaneidade = '100%';

  constructor( private route: Router){}

  sair(){
    this.route.navigate(['/'])
  }

  menu(){
    this.route.navigate(['home'])
  }
}
