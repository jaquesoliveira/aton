import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/models/cliente.model';
import { Estados } from 'src/app/libs/estados';
import { Estado } from 'src/app/libs/estado';
import { GurpoBServiceService } from 'src/app/services/gurpo-b-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelecionarClienteComponent } from './selecionar-cliente/selecionar-cliente.component';
import { ModuloFotovoltaico } from 'src/app/models/modulo-fotovoltaico.model';
import { SelecionarModuloComponent } from './selecionar-modulo/selecionar-modulo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { SelecionarInversorComponent } from './selecionar-inversor/selecionar-inversor.component';
import { InversorDto } from 'src/app/models/inversor-dto';
import { PropostaService } from 'src/app/services/proposta.service';
import { IrradiacaoMunicipio } from 'src/app/dto/IrradiacaoMunicipioDto';
import Chart from 'chart.js/auto';
import { Contato } from 'src/app/models/contato.model';
import { Router } from '@angular/router';
import { Proposta } from 'src/app/models/Proposta.model';
import { EstadosService } from 'src/app/services/estados.service';
import { EstadosDto } from 'src/app/models/estados-dto';
import { SelecionarEstadoComponent } from './selecionar-estado/selecionar-estado.component';
import { SelecionarMunicipioComponent } from './selecionar-municipio/selecionar-municipio.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-proposta-form',
  templateUrl: './proposta-form.component.html',
  styleUrl: './proposta-form.component.css'
})
export class PropostaFormComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  idProposta: number
  proposta = {} as Proposta
  cliente = {} as Cliente
  dataSourceClientes: Cliente[] = []
  dataSourceContatos: Contato[] = []
  dataSourceModulo:  ModuloFotovoltaico[] = []
  modulo = {} as ModuloFotovoltaico
  dataSourceInversor: InversorDto[] = []
  inversor = {} as InversorDto

  consumoMedioMensal: number
  irradiacaoMedia = 5.5
  potenciaModulo: any

  custoMedioMensal: number

  kwhDia: number
  kwpNominal: number
  kwpReal: number
  numModulos: number

  //estadosList: Estado[] = []
  estadosList: EstadosDto[] = []
  concessionariaList: EstadosDto[] = []
  estadosSelecionado = {nome:"", uf:""} as EstadosDto;
  //estadosSelecionado = '';
  
  concessionariaSelecionada = ''
  producaoMediaMensal: number
  producaoMediaAnual: number
  
  tituloConfirmDialog = '';
  displayedColumns: string[] = ['codigo', 'fabricante', 'potencia', 'acoes'];
  displayedColumnsClientes: string[] = ['codigo', 'nome', 'cpfCnpj', 'telefone', 'acoes'];
  displayedColumnsContatos: string[] = ['tipo', 'telefone', 'chat', 'email'];

  listaIrradiacaoMunicipios: IrradiacaoMunicipio[] = [];
  municipioSelecionado = {} as IrradiacaoMunicipio

  canvasName: any
  grafico: any = []
  dataGrafico: any;
  optionsGrafico: any

  constructor(
    public service: PropostaService,
    private dialog: MatDialog,
    private router: Router,
    private serviceEstados: EstadosService,
    private message: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.idProposta = JSON.parse(localStorage.getItem('idProposta'))
    this.canvasName = Math.random().toString();
    this.getEstados();
    this.carregarProposta()
  }

  carregarProposta(){
    this.service.findById(this.idProposta).subscribe({
      next:(data) => {
        let proposta: Proposta = data
        //this.proposta.cliente = data.cliente
        //this.estadosList = data
        this.proposta.id = proposta.id
        this.cliente = data.cliente
        let clientes: Cliente[] = []
        clientes.push(this.cliente)
        this.dataSourceContatos = this.cliente.contatos

        this.estadosSelecionado.nome = data.uf
        
        this.municipioSelecionado = data.municipio

        this.consumoMedioMensal = proposta.consumoMedioMensal
        this.custoMedioMensal = proposta.custoMedioMensal
        this.producaoMediaMensal = proposta.producaoMediaMensal

        this.modulo = proposta.modulo
        let modulos: ModuloFotovoltaico[] = []
        modulos.push(this.modulo)
        this.dataSourceModulo = modulos

        this.kwhDia = proposta.kwhDia
        this.kwpNominal = proposta.kwpNominal
        this.kwpReal = proposta.kwpReal
        this.numModulos = proposta.numModulos


        this.inversor = proposta.inversor
        let inversores: InversorDto[] = []
        inversores.push(this.inversor)
        this.dataSourceInversor = inversores

        //this.listarIrradiacaMunicipios()
        this.gerarGrafico();
      },
      error:(error)=> {
        console.log(error.error);
      }
    });
  }
  
  calcular(){
    this.kwhDia = parseFloat((this.producaoMediaMensal / 30).toFixed(2));
    this.kwpNominal = parseFloat((this.kwhDia / this.irradiacaoMedia).toFixed(2));
    this.kwpReal = parseFloat((this.kwpNominal / 0.8).toFixed(2));
    this.numModulos = Math.ceil(parseFloat(((this.kwpReal * 1000) / this.potenciaModulo ).toFixed(2)));
  }


  salvarProposta(){
    this.preencherProposta()
    console.log(this.proposta);
    
    this.service.salvar(this.proposta).subscribe({
      next:(data) => {
        this.message.open("Salvo com sucesso")
      },
      error:(error)=> {        
        console.log(error.error);
        this.message.open("Merda no ventilador")
      }
    });
  }

  getEstados(){
    // let est = new Estados();
    // this.estadosList = est.getEstados();

    this.serviceEstados.listar().subscribe({
      next:(data) => {
        this.estadosList = data
      },
      error:(error)=> {
        console.log(error.error);
      }
    });
  }
  

  selecionarClienteDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SelecionarClienteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.cliente = data
        let clientes: Cliente[] = []
        clientes.push(this.cliente)
        //this.dataSourceClientes = clientes
        this.dataSourceContatos = this.cliente.contatos
      }
    })    
  }

  selecionarModuloDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SelecionarModuloComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.modulo = data
        let modulos: ModuloFotovoltaico[] = []
        modulos.push(this.modulo)
        this.dataSourceModulo = modulos
        this.potenciaModulo = this.modulo.potencia
        this.calcular();
      }
    })    
  }

  selecionarInversorDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SelecionarInversorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.inversor = data

      if(this.inversor.id){
        let inversores: InversorDto[] = []
        inversores.push(this.inversor)
        this.dataSourceInversor = inversores
      }
    })    
  }

  selecionarEstadoDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SelecionarEstadoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if(data){
        this.estadosSelecionado = data
      }
    })    
  }

  selecionarMunicipioDialog(){
    localStorage.setItem('estadoSelecionado', this.estadosSelecionado.nome)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SelecionarMunicipioComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.municipioSelecionado = data
        this.gerarGrafico()
      }
    })    
  }

  excluirCliente(){
    this.dataSourceClientes = null
  }

  excluirModulo(){
    this.dataSourceModulo = null
  }

  excluirInversor(){
    this.dataSourceInversor = null
  }

  listarIrradiacaMunicipios(){
    this.service.consultar(this.estadosSelecionado.nome).subscribe({
      next: (data) => {
        this.listaIrradiacaoMunicipios = data        
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  gerarGrafico(){
    this.calcularIrradiacaoMediaMensal()

    let munic = this.municipioSelecionado
    this.gerarOptions();

    this.dataGrafico = {
      labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun',
       'jul', 'ago', 'set', 'out', 'nov', 'dez'
      ],
      datasets: [
        {
          label: 'Irradiação média mensal',
          fill: false,
          yAxisID: 'y',
          tension: 0.4,
          data: [munic.jan, munic.feb, munic.mar, munic.apr, munic.may, munic.jun, 
            munic.jul, munic.aug, munic.sep, munic.oct, munic.nov, munic.dec]
        }         
      ]
  };

    if(this.grafico instanceof Chart){
        this.grafico.destroy();
        this.grafico = []
    }

    this.grafico = new Chart(this.canvasName, {
        type: 'bar',
        data: this.dataGrafico,
        options: this.optionsGrafico
    })
  }


  public gerarOptions(){

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.optionsGrafico = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          }
          
      }
  };
  }


  calcularIrradiacaoMediaMensal(){    
    this.irradiacaoMedia = parseFloat( parseFloat(this.municipioSelecionado.annual.toLocaleString('pt-BR')).toFixed(2))    
  }


  visualizarProposta(){
    this.proposta.cliente = this.cliente
    this.proposta.inversor = this.inversor
    this.proposta.modulo = this.modulo
    this.proposta.consumoMedioMensal = this.consumoMedioMensal
    this.proposta.consumoAnual = this.consumoMedioMensal * 12
    this.proposta.custoMedioMensal = this.custoMedioMensal
    this.proposta.custoAnual = this.custoMedioMensal * 12
    this.proposta.producaoMediaMensal = this.producaoMediaMensal
    this.proposta.producaoAnual = this.producaoMediaMensal * 12
    this.proposta.kwhDia = this.kwhDia
    this.proposta.kwpNominal = this.kwpNominal
    this.proposta.kwpReal = this.kwpReal
    this.proposta.numModulos = this.numModulos
    this.proposta.municipio = this.municipioSelecionado
    this.proposta.uf = this.estadosSelecionado.uf

    console.log(this.proposta);
    

    // localStorage.setItem('proposta', JSON.stringify(this.proposta))
    // this.router.navigate(['/propostas/proposta-view'])
  }

  preencherProposta(){
    this.proposta.cliente = this.cliente
    this.proposta.inversor = this.inversor
    this.proposta.modulo = this.modulo
    this.proposta.consumoMedioMensal = this.consumoMedioMensal
    this.proposta.consumoAnual = this.consumoMedioMensal * 12
    this.proposta.custoMedioMensal = this.custoMedioMensal
    this.proposta.custoAnual = this.custoMedioMensal * 12
    this.proposta.producaoMediaMensal = this.producaoMediaMensal
    this.proposta.producaoAnual = this.producaoMediaMensal * 12
    this.proposta.kwhDia = this.kwhDia
    this.proposta.kwpNominal = this.kwpNominal
    this.proposta.kwpReal = this.kwpReal
    this.proposta.numModulos = this.numModulos
    this.proposta.municipio = this.municipioSelecionado
    this.proposta.uf = this.estadosSelecionado.nome
    this.proposta.id = this.idProposta
  }

  listaPropostas(){
    this.router.navigate(['/propostas'])  
  }
}
