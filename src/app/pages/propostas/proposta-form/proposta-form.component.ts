import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';
import { Estados } from 'src/app/libs/estados';
import { Estado } from 'src/app/libs/estado';
import { GurpoBServiceService } from 'src/app/services/gurpo-b-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelecionarClienteComponent } from './selecionar-cliente/selecionar-cliente.component';

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

  estadosList: Estado[] = []
  concessionariaList: Estado[] = []
  //estadosSelecionado = {} as Estado;
  estadosSelecionado = '';
  municipioSelecionado = ''
  concessionariaSelecionada = ''

  
  tituloConfirmDialog = '';
  private dialog: MatDialog;

  constructor(public service: GurpoBServiceService){

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
    const dialogRef = this.selecionarClienteDialog("Deseja continuar?")
  }

  selecionarClienteDialog(msg: string){
    this.tituloConfirmDialog = msg;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};

    return this.dialog.open(SelecionarClienteComponent, dialogConfig);
  }

}
