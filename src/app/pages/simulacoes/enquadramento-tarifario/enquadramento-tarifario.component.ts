import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-enquadramento-tarifario',
  templateUrl: './enquadramento-tarifario.component.html',
  styleUrl: './enquadramento-tarifario.component.css'
})
export class EnquadramentoTarifarioComponent implements OnInit{
  mes = ''
  consumoMensal = [];
  tarifa = 0;
  consumoMedioMensal = 0;
  total = 0;

  demandaConvencional = ['Única','Ultrapassagem'];
  consumoConvencional = ['Único'];

  demandaAzul = ['Ponta','Fora Ponta', 'Ultrap.Ponta', 'Ultrap.F.Ponta'];
  consumoAzul = ['Ponta','Bandeira Tarifária', 'Fora Ponta', 'F.Ponta-Bandeira'];

  demandaVerde = ['Fora Ponta', 'Ultrap.F.Ponta'];
  consumoVerde = ['Ponta','Ponta-Bandeira', 'Fora Ponta', 'F.Ponta-Bandeira'];

  consumoBaixaTensao = ['Único'];

  modalidadeTarifariaSelecionada = ''
  modalidadeTarifariaList = ['Convencional', 'Azul', 'Verde', 'Baixa Tensão'];

  descricaoSelecionada ='';
  descricaoList = [];

  // demandaSelecionada ='';
  // demandaList = [];

  // consumoSelecionado =''
  // consumoList = [];

  tipo = ''

  janeiro = 0
  fevereiro = 0
  marco = 0
  abril = 0
  maio = 0
  junho = 0
  julho = 0
  agosto = 0
  setembro = 0
  outubro = 0
  novembro = 0
  dezembro = 0

  consumoMedioMensalChecked = false

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){ }

  preencherDescricao(){
    if(this.tipo === 'demanda'){
      this.selecionarDemanda();
    }

    if(this.tipo === 'consumo'){
      this.selecionarConsumo();
    }
  }

  selecionarDemanda(){
    this.descricaoSelecionada = '';
    
    if(this.modalidadeTarifariaSelecionada === 'Convencional'){
      this.descricaoList = this.demandaConvencional;
    }

    if(this.modalidadeTarifariaSelecionada === 'Azul'){
      this.descricaoList = this.demandaAzul;
    }

    if(this.modalidadeTarifariaSelecionada === 'Verde'){
      this.descricaoList = this.demandaVerde;
    }

    if(this.modalidadeTarifariaSelecionada === 'Baixa Tensão'){
      this.descricaoList = this.consumoBaixaTensao;
    }
  }

  selecionarConsumo() {
    this.descricaoSelecionada = '';
    
    if(this.modalidadeTarifariaSelecionada === 'Convencional'){
      this.descricaoList = this.consumoConvencional;
    }

    if(this.modalidadeTarifariaSelecionada === 'Azul'){
      this.descricaoList = this.consumoAzul;
    }

    if(this.modalidadeTarifariaSelecionada === 'Verde'){
      this.descricaoList = this.consumoVerde;
    }

    if(this.modalidadeTarifariaSelecionada === 'Baixa Tensão'){
      this.descricaoList = this.consumoBaixaTensao;
    }
  }

  selecionarConcecionaria() {

  }

  calcular() {

    let total = 0;

    for(let mes=0; mes<12; mes++) {
      this.consumoMensal[mes] = this.tarifa * this.getValorMes(mes);
      total += this.consumoMensal[mes];
    }

    this.total = total
    console.log(total);
    console.log(this.consumoMensal);
  }

  private getValorMes(mes): number {
    if(mes === 0 ){
      this.mes = 'Janeiro'
      return this.janeiro
    }

    if(mes === 1 ){
      this.mes = 'Fevereiro'
      return this.fevereiro
    }

    if(mes === 2 ){
      this.mes = 'Março'
      return this.marco
    }

    if(mes === 3 ){
      return this.abril
    }

    if(mes === 4 ){
      return this.maio
    }

    if(mes === 5 ){
      return this.junho
    }

    if(mes === 6 ){
      return this.julho
    }

    if(mes === 7 ){
      return this.agosto
    }

    if(mes === 8 ){
      return this.setembro
    }

    if(mes === 9 ){
      return this.outubro
    }

    if(mes === 10 ){
      return this.novembro
    }

    if(mes === 11 ){
      return this.dezembro
    }

    return null
  }
}
