import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';
import { Estados } from 'src/app/libs/estados';
import { Estado } from 'src/app/libs/estado';
import { GurpoBServiceService } from 'src/app/services/gurpo-b-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelecionarClienteComponent } from './selecionar-cliente/selecionar-cliente.component';
import { ModuloFotovoltaico } from 'src/app/models/modulo-fotovoltaico.model';
import { SelecionarModuloComponent } from './selecionar-modulo/selecionar-modulo.component';

export interface Modulo {
  potencia: string;
  fabricante: string;  
}

const ELEMENT_DATA: ModuloFotovoltaico[] = [
  { 
    id: 1,
    fabricante: 'leapton',
    potencia: '590',
    garantiaDefeito: '',
    garantiaEficiencia:''
  },

  // { 
  //   id: 2,
  //   fabricante: 'Tsun',
  //   potencia: '570',
  //   garantiaDefeito: '',
  //   garantiaEficiencia:''
  // },

  // { 
  //   id: 3,
  //   fabricante: 'Astroenergy',
  //   potencia: '555',
  //   garantiaDefeito: '',
  //   garantiaEficiencia:''
  // },
];

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

  custoMedioMensal: number

  kwhDia: number
  kwpNominal: number
  kwpReal: number
  numModulos: number

  estadosList: Estado[] = []
  concessionariaList: Estado[] = []
  //estadosSelecionado = {} as Estado;
  estadosSelecionado = '';
  municipioSelecionado = ''
  concessionariaSelecionada = ''
  
  tituloConfirmDialog = '';
  displayedColumns: string[] = ['codigo', 'fabricante', 'potencia', 'acoes'];
  dataSourceModulo = ELEMENT_DATA;

  

  constructor(
    public service: GurpoBServiceService,
    private dialog: MatDialog
  ){

  }

  ngOnInit(): void {
    this.cliente.nome = 'Francisco Jaques Morais de Oliveira'
    this.getEstados();
  }
  
  calcular(){
    this.kwhDia = parseFloat((this.consumoMedioMensal / 30).toFixed(2));
    this.kwpNominal = parseFloat((this.kwhDia / this.irradiacaoMedia).toFixed(2));
    this.kwpReal = parseFloat((this.kwpNominal / 0.8).toFixed(2));
    this.numModulos = Math.ceil(parseFloat(((this.kwpReal * 1000) / this.potenciaModulo ).toFixed(2)));
  }

  getEstados(){
    let est = new Estados();
    this.estadosList = est.getEstados();
  }
  
  teste(){
    
  }

  selecionarClienteDialog(){
    //this.tituloConfirmDialog = msg;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};

    const dialogRef = this.dialog.open(SelecionarClienteComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
      this.cliente = data
    })    
  }

  selecionarModuloDialog(){
    //this.tituloConfirmDialog = msg;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};

    const dialogRef = this.dialog.open(SelecionarModuloComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
      this.cliente = data
    })    
  }
}
