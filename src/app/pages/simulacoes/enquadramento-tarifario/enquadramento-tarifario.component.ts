import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GurpoBServiceService } from 'src/app/services/gurpo-b-service.service';
import { Estado } from 'src/app/libs/estado';
import { Estados } from 'src/app/libs/estados';
import { TarifasGrupoAService } from 'src/app/services/tarifas-grupo-a.service';
import { Concessionaria } from 'src/app/libs/concessionaria';
import { TarifaGrupoAModel } from 'src/app/models/tarifa-grupo-a.model';
import { TaAplicacaoService } from 'src/app/services/ta-aplicacao.service';
import { TaAplicacaoFiltrosDTO } from '../../../dto/taAplicacaoFiltrosDto';
import { TaAplicacaoResponseDto } from 'src/app/dto/taAplicacaoResponseDto';
import { TaAplicacaoDto } from 'src/app/dto/taAplicacaoDto';

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

  tipo = ''

  consumoMedioMensalChecked = false;
  estadosSelecionado = '';
  concessionariaSelecionada: number
  concessionariaList: Concessionaria[] = []
  estadosList: Estado[] = []
  dasabilitarConcecionnaria = true;

  tarifaGrupoAModelList: TarifaGrupoAModel[] = []
  subgrupoSelecionado = '';
  ano: number
  filtros = {} as TaAplicacaoFiltrosDTO
  response = {} as TaAplicacaoResponseDto

  qtdConsumidaPonta = 0
  qtdConsumidaForaPonta = 0

  constructor(private _formBuilder: FormBuilder,
    private serviceConcessionaria: GurpoBServiceService,
    private tarifasGrupoAService: TarifasGrupoAService,
    private service: TaAplicacaoService
  ) {}

  ngOnInit(){ 
    this.getEstados();

    this.response.foraPontaAzulDemanda = {} as TaAplicacaoDto
    this.response.pontaAzulDemanda = {} as TaAplicacaoDto

    this.response.foraPontaAzulTarifa = {} as TaAplicacaoDto
    this.response.pontaAzulTarifa = {} as TaAplicacaoDto

    this.response.foraPontaVerdeDemanda = {} as TaAplicacaoDto
    this.response.pontaVerdeDemanda = {} as TaAplicacaoDto

    this.response.foraPontaVerdeTarifa = {} as TaAplicacaoDto
    this.response.pontaVerdeTarifa = {} as TaAplicacaoDto
    


    this.response.foraPontaAzulDemanda.valorTarifa = 0
    this.response.foraPontaAzulDemanda.totalTe = 0
    this.response.foraPontaAzulDemanda.totalTusd = 0

    this.response.pontaAzulDemanda.valorTarifa = 0
    this.response.pontaAzulDemanda.totalTe = 0
    this.response.pontaAzulDemanda.totalTusd = 0



    this.response.foraPontaAzulTarifa.valorTarifa = 0
    this.response.foraPontaAzulTarifa.totalTe = 0
    this.response.foraPontaAzulTarifa.totalTusd = 0

    this.response.pontaAzulTarifa.valorTarifa = 0
    this.response.pontaAzulTarifa.totalTe = 0
    this.response.pontaAzulTarifa.totalTusd = 0


    this.response.pontaVerdeDemanda.valorTarifa = 0
    this.response.pontaVerdeDemanda.totalTe = 0
    this.response.pontaVerdeDemanda.totalTusd = 0

    this.response.foraPontaVerdeDemanda.valorTarifa = 0
    this.response.foraPontaVerdeDemanda.totalTe = 0
    this.response.foraPontaVerdeDemanda.totalTusd = 0
  }

  getEstados(){
    let est = new Estados();
    this.estadosList = est.getEstados();
  }


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

  buscarConcessionaria(){
    this.dasabilitarConcecionnaria = false;
    this.serviceConcessionaria.consultar(this.estadosSelecionado).subscribe({
        next: (data) => {
            this.concessionariaList = data
        }
    })
  }

  consultar(){
    
    this.service.consultar(this.filtros).subscribe({
      next: (data) => {
          console.log(data)
          this.response = data;
      }, 
      error: (erro) => {
        console.log(erro)
      }
    })
  }
}
