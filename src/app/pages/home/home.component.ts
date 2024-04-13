import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart }  from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  showFiller = false;
  canvasName: any
  grafico: any = []
  data2: any;
  options2: any;

  data: any;
 
  options: any;


  data1: any;
  data1Content:any = [];
  data1Content2:any = [];
  options1: any;
  constructor( private route: Router){
    
  }

  ngOnInit(): void {
    const ctx = document.getElementById('canvasName');

    this.canvasName = Math.random().toString();
    
    this.gerarGrafico()
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
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
  //this.gerarGrafico();
  }

  gerarGrafico(){
    if(this.grafico instanceof Chart){
        this.grafico.destroy();
        this.grafico = []
    }

    this.grafico = new Chart(this.canvasName, {
        type: 'doughnut',
        data: this.data1,
        options: this.options1
    })
  }

  sair(){
    this.route.navigate(['/'])
  }

  abrirSimulacaoB(){
    this.route.navigate(['simulacao-b'])
  }
}
