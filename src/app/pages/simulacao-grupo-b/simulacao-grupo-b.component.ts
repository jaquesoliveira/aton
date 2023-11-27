import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor( private route: Router){}

  ngOnInit() {

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

        console.log(this.data1Content[i])
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

  sair(){
    this.route.navigate(['/'])
  }

  menu(){
    this.route.navigate(['home'])
  }
}
