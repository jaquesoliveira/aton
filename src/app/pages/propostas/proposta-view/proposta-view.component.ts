import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proposta } from 'src/app/models/Proposta.model';

@Component({
  selector: 'app-proposta-view',
  templateUrl: './proposta-view.component.html',
  styleUrl: './proposta-view.component.css'
})
export class PropostaViewComponent implements OnInit {
  
  proposta = {} as Proposta

  constructor(){}

  ngOnInit(): void {
    let prop = localStorage.getItem('proposta')
    this.proposta = JSON.parse(prop)
    console.log(this.proposta)
  }

}
