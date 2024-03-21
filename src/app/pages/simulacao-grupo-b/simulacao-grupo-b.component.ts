import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GrupoB } from 'src/app/libs/grupo-b';

@Component({
  selector: 'app-simulacao-grupo-b',
  templateUrl: './simulacao-grupo-b.component.html',
  styleUrls: ['./simulacao-grupo-b.component.css']
})
export class SimulacaoGrupoBComponent {
    
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
  consumoMedioMensal: number[] = []


  valConsumoMedioMensal = 0
  perfilConsumoSelecionado = ''
  valSimultaneidade = 0

  constructor( private route: Router){}

  ngOnInit() {
    console.log(1.5-0.33)

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

        //console.log(this.data1Content[i])
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

    this.preencherConsumo()
    this.preencherConsumoMedioMensal()
    this.preencherenergiaInjetadaList()
    this.preencherenergiaInjetadaDiario()
    this.preencherEnergiaInjetadaMensal()
    this.preencherValSimultaneidade()
  }

  preencherConsumo(){
    if(this.perfilConsumoSelecionado === 'residencial_1' ){
        this.consumo = []
        const consumo = new GrupoB;       
        
        for(let cons of consumo.residencial_1){
            this.consumo.push(cons);
        }
    }
  }

  preencherConsumoMedioMensal(){    
    this.consumoMedioMensal = []
    for(let cons of this.consumo){        
        this.consumoMedioMensal.push(parseFloat(((this.valConsumoMedioMensal/30)*cons).toFixed(2)));
    }
  }

  preencherenergiaInjetadaList(){
    console.log('>>>>> consumoMedioMensal')
    console.log(this.consumoMedioMensal)
    
    this.energiaInjetadaList = []
    for(let i=0; i<24;i++){
        let geracaoDiariaList = this.geracaoDiariaList[i]
        let consumoMedioMensal = this.consumoMedioMensal[i]

        let temp = geracaoDiariaList - consumoMedioMensal
        // console.log('>>>>> temp')
        // console.log(temp)

         //console.log('>>>>> geracaoDiariaList')
         //console.log(geracaoDiariaList + '-' + consumoMedioMensal)
        if(temp <= 0){
            temp = 0
        }else{
            temp = this.geracaoDiariaList[i]-this.consumoMedioMensal[i]
        }

        this.energiaInjetadaList.push(temp)
        temp = 0
    }    
  }

  preencherenergiaInjetadaDiario(){
    this.energiaInjetadaDiaria = 0
    for(let item of this.energiaInjetadaList){
        this.energiaInjetadaDiaria+=item        
    }
   
    console.log(this.energiaInjetadaDiaria)
  }

  preencherEnergiaInjetadaMensal(){
    this.energiaInjetadaMensal = this.energiaInjetadaDiaria*30
  }

  sair(){
    this.route.navigate(['/'])
  }

  menu(){
    this.route.navigate(['home'])
  }

  preencherValSimultaneidade(){   
    this.valSimultaneidade = Math.abs(((this.energiaInjetadaDiaria/this.valGeracaoDiaria) - 1) * 100);
    // if(s === Infinity){
    //     return 0
    // }
    // return s.toFixed(2)//Math.round(s);
  }

//   private getSomaGeracaoDiaria(){
//     let total = 0;   

//     for(var n of this.getGeracaoDiaria()){
//         total += n;
//     }
//     return total
//   }

//   private getGeracaoMensal(){  this.geracaoMensal = this.getSomaGeracaoDiaria() * 30
//   }

  private getGeracaoDiaria(){
    let geracaoDiaria = [
        (this.geracao[0]*this.getGeracaoDiariaValorHora(0)) /30, 
        (this.geracao[1]*this.getGeracaoDiariaValorHora(1)) /30, 
        (this.geracao[2]*this.getGeracaoDiariaValorHora(2)) /30, 
        (this.geracao[3]*this.getGeracaoDiariaValorHora(3)) /30, 
        (this.geracao[4]*this.getGeracaoDiariaValorHora(4)) /30, 
        (this.geracao[5]*this.getGeracaoDiariaValorHora(5)) /30, 
        (this.geracao[6]*this.getGeracaoDiariaValorHora(6)) /30, 
        (this.geracao[7]*this.getGeracaoDiariaValorHora(7)) /30,
        (this.geracao[8]*this.getGeracaoDiariaValorHora(8)) /30,
        (this.geracao[9]*this.getGeracaoDiariaValorHora(9)) /30,
        (this.geracao[10]*this.getGeracaoDiariaValorHora(10)) /30,
        (this.geracao[11]*this.getGeracaoDiariaValorHora(11)) /30,
        (this.geracao[12]*this.getGeracaoDiariaValorHora(12))/30,
        (this.geracao[13]*this.getGeracaoDiariaValorHora(13)) /30,
        (this.geracao[14]*this.getGeracaoDiariaValorHora(14)) /30,
        (this.geracao[15]*this.getGeracaoDiariaValorHora(15)) /30,
        (this.geracao[16]*this.getGeracaoDiariaValorHora(16)) /30,
        (this.geracao[17]*this.getGeracaoDiariaValorHora(17)) /30,
        (this.geracao[18]*this.getGeracaoDiariaValorHora(18)) /30,
        (this.geracao[19]*this.getGeracaoDiariaValorHora(19)) /30,
        (this.geracao[20]*this.getGeracaoDiariaValorHora(20)) /30,
        (this.geracao[21]*this.getGeracaoDiariaValorHora(21)) /30,
        (this.geracao[22]*this.getGeracaoDiariaValorHora(22)) /30,
        (this.geracao[23]*this.getGeracaoDiariaValorHora(23)) /30,
    ]

    return geracaoDiaria
  }
  getGeracaoDiariaValorHora(posicao: number){
    if(this.geracao[posicao] === 0.00){
        return 0.00
    }
    let r = (this.geracao[posicao]*this.geracaoMediaPreviaMensal)/30 
    return r
  }

//   calcular(){
//     let t = this.valGeracaoDiaria = this.getSomaGeracaoDiaria();
//     console.log(this.getSomaGeracaoDiaria())
//   }
}
