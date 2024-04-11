import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InversorDto } from 'src/app/models/inversor-dto';
import { InversorService } from 'src/app/services/inversor.service';

@Component({
  selector: 'app-inversor-form',
  templateUrl: './inversor-form.component.html',
  styleUrl: './inversor-form.component.css'
})
export class InversorFormComponent implements OnInit{

  inversor = {} as InversorDto
  monitoramentos = [
    'WIFI',
    'BLUETOOTH'
  ]
  
  constructor(
    private router: Router,
    private service: InversorService

  ){}

  ngOnInit(): void {
    const temp = localStorage.getItem('inversor');

    if(temp){
      const inv = JSON.parse(temp);

      if(inv.id){
        this.inversor.id = inv.id
        this.inversor.fabricante = inv.fabricante
        this.inversor.garantiaDefeito = inv.garantiaDefeito
        this.inversor.modelo = inv.modelo
        this.inversor.monitoramento = inv.monitoramento
        this.inversor.potencia = inv.potencia

        localStorage.removeItem('inversor');
      }
    }
  }

  navegarParaListaDeInversores(){
    this.router.navigate(['/cadastro/produtos/inversor-list'])
  }

  salvar(){
    this.service.salvar(this.inversor).subscribe({
      next: () => {
        console.log("deu certo")
      },
      error: (erro) => {
        console.log(erro.erro)
      }
    })
  }
}
