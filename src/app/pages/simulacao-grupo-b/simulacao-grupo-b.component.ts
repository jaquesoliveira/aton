import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Estado } from 'src/app/libs/estado';
import { Estados } from 'src/app/libs/estados';
import { GrupoB } from 'src/app/libs/grupo-b';

@Component({
  selector: 'app-simulacao-grupo-b',
  templateUrl: './simulacao-grupo-b.component.html',
  styleUrls: ['./simulacao-grupo-b.component.css']
})
export class SimulacaoGrupoBComponent {
  
  showSpinner = true;  
  showFiller = false;
  simultaneidade = '100%';

  data: any;
 
  options: any;

  data1: any;
  data1Content:any = [];
  data1Content2:any = [];
  options1: any;

  data2: any;
  data2Content:any = [];
  data2Content2:any = [];
  options2: any;

  valGeracaoDiaria: number = 0
  geracaoMensal = 0

  energiaInjetadaDiaria = 0.0
  energiaInjetadaMensal = 0.0

  geracaoMediaPreviaMensal = 0.0
  consumoTotalDiario = 0
  consumoTotalMensal = 0

  geracao = [
    0.00, 
    0.00,
    0.00, 
    0.00, 
    0.00, 
    0.00, 
    0.01, 
    0.02, 
    0.03, 
    0.07, 
    0.11, 
    0.15,
    0.15, 
    0.15,
    0.15,
    0.10, 
    0.05, 
    0.01, 
    0.00, 
    0.00, 
    0.00, 
    0.00, 
    0.00, 
    0.00
    ]

  geracaoDiariaList: number[] = []
  energiaInjetadaList: number[] = []
  consumo: number[] = []
  consumoInstataneoDiarioList: number[] = []
  consumoMedioMensal: number[] = []
  consumoRetornadoList: number[] = []

  valConsumoMedioMensal: number = 0
  perfilConsumoSelecionado = ''
  valSimultaneidade = 0
  consumoInstataneoDiario = 0
  consumoInstataneoMenasal = 0
  consumoRetornado = 0
  consumoRetornadoMensal = 0

  canvasName: any
  grafico: any = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  estadosList: Estado[] = []
  //estadosSelecionado = {} as Estado;
  estadosSelecionado = '';

  constructor( private route: Router){}

  ngOnInit() {

    this.canvasName = Math.random().toString();
    this.getEstados();

    for(let i=0; i<24; i++){
        if(i===0 ){
            this.data1Content[i] = 0
            this.data1Content2[i] = 0
        }

        if(i===1 ){
            this.data1Content[i] = 5000
            this.data1Content2[i] = 4000
        }

        if(i>1 ){
            this.data1Content[i] = this.data1Content[i-1] + this.data1Content[i-1]*0.1
            this.data1Content2[i] = this.data1Content2[i-1] + 500
        }
    }

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Linha 15',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [65, 59, 80, 81, 56, 55, 10]
            },
            {
                label: 'Linha 16',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [28, 48, 40, 19, 86, 27, 90]
            }
            ,
            {
                label: 'Linha 17',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--yellow-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [22, 44, 50, 39, 56, 43, 60]
            },
            {
              label: 'Linha 18',
              fill: false,
              borderColor: documentStyle.getPropertyValue('--green-500'),
              yAxisID: 'y1',
              tension: 0.4,
              data: [56, 44, 50, 39, 12, 25, 32]
          }
        ]
    };
    
    this.options = {
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
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
            
        }
    };

    this.data1 = {
        labels: ['2024', '2025', '2026', '2027', '2028', '2029'],
        datasets: [
            {
                label: 'Linha 15',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [5000, 6000, 7200, 8500, 9900, 11400]
            },
            {
                label: 'Linha 16',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [5000, 5300, 5700, 6300, 7100, 8100]
            }            
        ]
    };
    
    this.options1 = {
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
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
            
        }
    };

    this.data2 = {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00','13:00','14:00'
        , '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        datasets: [
            {
                label: 'Linha 15',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: ['0','0','0','0','3','8','18','18','18','18','18','18','18','18','18','8','8','8','3','3','3','3','0','0']
            },
            {
                label: 'Linha 16',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: ['0','0','0','0','5','10','20','20','20','20','20','20','20','20','20','10','10','10','5','5','5','5','0','0']
            }            
        ]
    };
    
    this.options2 = {
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
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }            
        }
    };

    this.showSpinner = false;
}

getEstados(){
    let est = new Estados();
    this.estadosList = est.getEstados();
}

preencherInformacoesDeGeracaoEconsumo(){
    this.valGeracaoDiaria = 0
    let tempValGeracaoDiaria: number = 0
    for(let i of this.geracao){
        this.geracaoDiariaList.push(i*this.geracaoMediaPreviaMensal/30);
        tempValGeracaoDiaria+=i*this.geracaoMediaPreviaMensal/30
    }
    this.valGeracaoDiaria = parseFloat(tempValGeracaoDiaria.toFixed(2));
    this.geracaoMensal = parseFloat((this.valGeracaoDiaria * 30).toFixed(2))

    this.calcularConsumo()
    this.calcularConsumoMedioMensal()
    this.calcularEnergiaInjetadaList()
    this.calcularEnergiaInjetadaDiario()
    this.calcularEnergiaInjetadaMensal()
    this.calcularValSimultaneidade()
    this.calcularConsumoInstataneoDiario()
    this.calcularConsumoRetornado()
    this.calcularConsumoTotal()
    this.gerarGrafico();
  }

  calcularConsumo(){
    this.consumo = []
    if(this.perfilConsumoSelecionado === 'residencial_1' ){
        
        const consumo = new GrupoB;       
        
        for(let cons of consumo.residencial_1){
            this.consumo.push(cons);
        }
    }

    if(this.perfilConsumoSelecionado === 'residencial_2' ){
        const consumo = new GrupoB;
        
        for(let cons of consumo.residencial_2){
            this.consumo.push(cons);
        }
    }

    if(this.perfilConsumoSelecionado === 'consumoRemoto' ){
        const consumo = new GrupoB;
        
        for(let cons of consumo.consumoRemoto){
            this.consumo.push(cons);
        }
    }

    if(this.perfilConsumoSelecionado === 'consumoNoturno' ){
        const consumo = new GrupoB;
        
        for(let cons of consumo.consumoNoturno){
            this.consumo.push(cons);
        }
    }

    if(this.perfilConsumoSelecionado === 'comercial_1' ){
        const consumo = new GrupoB;
        
        for(let cons of consumo.comercial_1){
            this.consumo.push(cons);
        }
    }

    if(this.perfilConsumoSelecionado === 'padarias_mercados' ){
        const consumo = new GrupoB;
        
        for(let cons of consumo.padarias_mercados){
            this.consumo.push(cons);
        }
    }

    if(this.perfilConsumoSelecionado === 'vinteEQuatroHoras' ){
        const consumo = new GrupoB;
        
        for(let cons of consumo.vinteEQuatroHoras){
            this.consumo.push(cons);
        }
    }

    if(this.perfilConsumoSelecionado === 'personalizado' ){
        const consumo = new GrupoB;
        
        for(let cons of consumo.personalizado){
            this.consumo.push(cons);
        }
    }
  }

  calcularConsumoMedioMensal(){    
    this.consumoMedioMensal = []
    for(let cons of this.consumo){        
        this.consumoMedioMensal.push(parseFloat(((this.valConsumoMedioMensal/30)*cons).toFixed(2)));
    }
  }

  calcularEnergiaInjetadaList(){
    
    this.energiaInjetadaList = []
    for(let i=0; i<24;i++){
        let geracaoDiariaList = this.geracaoDiariaList[i]
        let consumoMedioMensal = this.consumoMedioMensal[i]

        let temp = geracaoDiariaList - consumoMedioMensal
        
        if(temp <= 0){
            temp = 0
        }else{
            temp = this.geracaoDiariaList[i]-this.consumoMedioMensal[i]
        }

        this.energiaInjetadaList.push(temp)
        temp = 0
    }    
  }

  calcularEnergiaInjetadaDiario(){
    this.energiaInjetadaDiaria = 0
    for(let item of this.energiaInjetadaList){
        this.energiaInjetadaDiaria+=parseFloat(item.toFixed(2))
    }
  }

  calcularEnergiaInjetadaMensal(){
    this.energiaInjetadaMensal = this.energiaInjetadaDiaria*30
  }

  sair(){
    this.route.navigate(['/'])
  }

  menu(){
    this.route.navigate(['home'])
  }

  calcularValSimultaneidade(){   
    this.valSimultaneidade = parseFloat(Math.abs(((this.energiaInjetadaDiaria/this.valGeracaoDiaria) - 1) * 100).toFixed(2));    
  }

  calcularConsumoInstataneoDiario(){
    let tempResult = 0;
    this.consumoInstataneoDiario = 0
    this.consumoInstataneoMenasal = 0
    this.consumoInstataneoDiarioList = []

    for(let i=0;i<24;i++){
        tempResult = this.geracaoDiariaList[i] - this.energiaInjetadaList[i];
        this.consumoInstataneoDiarioList[i] = this.geracaoDiariaList[i] - this.energiaInjetadaList[i]; 
        this.consumoInstataneoDiario += parseFloat(tempResult.toFixed(2))

        tempResult = 0
    }
    this.consumoInstataneoMenasal = parseFloat((this.consumoInstataneoDiario * 30).toFixed(2))
  }

  calcularConsumoRetornado(){
    let valTemp = 0;
    this.consumoRetornado = 0;
    this.consumoRetornadoMensal = 0
    for(let i=0;i<24;i++){
        if(this.consumoMedioMensal[i] > this.geracaoDiariaList[i]){
            valTemp = this.consumoMedioMensal[i] - this.geracaoDiariaList[i];
        }else{
            valTemp = 0;
        }
        this.consumoRetornado+=valTemp;
    }
    this.consumoRetornadoMensal = parseFloat((this.consumoRetornado * 30).toFixed(2))
  }

  calcularConsumoTotal(){
    this.consumoTotalDiario = 0
    this.consumoTotalMensal = 0

    this.consumoTotalDiario = this.consumoInstataneoDiario + this.consumoRetornado
    this.consumoTotalMensal = parseFloat((this.consumoTotalDiario * 30).toFixed(2))
  }

  getGeracaoDiariaValorHora(posicao: number){
    if(this.geracao[posicao] === 0.00){
        return 0.00
    }
    let r = (this.geracao[posicao]*this.geracaoMediaPreviaMensal)/30 
    return r
  }

  gerarGrafico(){
    if(this.grafico instanceof Chart){
        this.grafico.destroy();
        this.grafico = []
    }

    this.grafico = new Chart(this.canvasName, {
        type: 'line',
        data: this.data2,
        options: this.options2
    })
  }

  getEstadoPerfilConsumo(){
    if(this.valConsumoMedioMensal === 0 
        && this.geracaoMediaPreviaMensal === 0){
            return true;
    }
    return false;
  }
  
  buscarConcessionaria(){
    console.log(this.estadosSelecionado)
  }
}
