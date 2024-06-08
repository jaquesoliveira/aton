import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';
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



@Component({
  selector: 'app-proposta-form',
  templateUrl: './proposta-form.component.html',
  styleUrl: './proposta-form.component.css'
})
export class PropostaFormComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cliente = {} as ClientePessoaFisica
  dataSourceClientes: ClientePessoaFisica[] = []
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

  estadosList: Estado[] = []
  concessionariaList: Estado[] = []
  //estadosSelecionado = {} as Estado;
  estadosSelecionado = '';
  
  concessionariaSelecionada = ''
  producaoMediaMensal: number
  producaoMediaAnual: number
  
  tituloConfirmDialog = '';
  displayedColumns: string[] = ['codigo', 'fabricante', 'potencia', 'acoes'];
  displayedColumnsClientes: string[] = ['codigo', 'nome', 'cpfCnpj', 'telefone', 'acoes'];
    
  listaIrradiacaoMunicipios: IrradiacaoMunicipio[] = [];
  municipioSelecionado: IrradiacaoMunicipio

  canvasName: any
  grafico: any = []
  dataGrafico: any;
  optionsGrafico: any

  constructor(
    public service: PropostaService,
    private dialog: MatDialog
  ){ }

  ngOnInit(): void {
    this.canvasName = Math.random().toString();
    this.cliente.nome = 'Francisco Jaques Morais de Oliveira'
    this.getEstados();
    // this.gerarOptions();    

  }
  
  calcular(){
    // this.kwhDia = parseFloat((this.consumoMedioMensal / 30).toFixed(2));
    this.kwhDia = parseFloat((this.producaoMediaMensal / 30).toFixed(2));
    this.kwpNominal = parseFloat((this.kwhDia / this.irradiacaoMedia).toFixed(2));
    this.kwpReal = parseFloat((this.kwpNominal / 0.8).toFixed(2));
    this.numModulos = Math.ceil(parseFloat(((this.kwpReal * 1000) / this.potenciaModulo ).toFixed(2)));
  }

  getEstados(){
    let est = new Estados();
    this.estadosList = est.getEstados();
  }
  

  selecionarClienteDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SelecionarClienteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data)
      this.cliente = data
      let clientes: ClientePessoaFisica[] = []
      clientes.push(this.cliente)
      this.dataSourceClientes = clientes
    })    
  }

  selecionarModuloDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(SelecionarModuloComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.modulo = data
      let modulos: ModuloFotovoltaico[] = []
      modulos.push(this.modulo)
      this.dataSourceModulo = modulos
      this.potenciaModulo = this.modulo.potencia
      this.calcular();
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
        console.log(data)

        let inversores: InversorDto[] = []
        inversores.push(this.inversor)
        this.dataSourceInversor = inversores
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
    this.service.consultar(this.estadosSelecionado).subscribe({
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
}
