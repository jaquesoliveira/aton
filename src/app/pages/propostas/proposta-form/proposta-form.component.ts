import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';

@Component({
  selector: 'app-proposta-form',
  templateUrl: './proposta-form.component.html',
  styleUrl: './proposta-form.component.css'
})
export class PropostaFormComponent implements OnInit{

  cliente = {} as ClientePessoaFisica
  consumoMedioMensal: number
  irradiacaoMedia = 5.5
  potenciaModulo: any

  kwhDia: number
  kwpNominal: number
  kwpReal: number
  numModulos: number

  ngOnInit(): void {
    this.cliente.nome = 'Francisco Jaques Morais de Oliveira'
  }
  
  calcular(){
    this.kwhDia = parseFloat((this.consumoMedioMensal / 30).toFixed(2));
    this.kwpNominal = parseFloat((this.kwhDia / this.irradiacaoMedia).toFixed(2));
    this.kwpReal = parseFloat((this.kwpNominal / 0.8).toFixed(2));
    this.numModulos = parseFloat(((this.kwpReal * 1000) / this.potenciaModulo ).toFixed(2));
  }

}
