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

  constructor( private route: Router){}

  ngOnInit() {
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
}

  sair(){
    this.route.navigate(['/'])
  }

  menu(){
    this.route.navigate(['home'])
  }
}
