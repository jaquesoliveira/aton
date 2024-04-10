import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InversorService } from 'src/app/services/inversor.service';
import { InversorDto } from 'src/app/models/inversor-dto';

@Component({
  selector: 'app-inversor-list',
  templateUrl: './inversor-list.component.html',
  styleUrl: './inversor-list.component.css'
})
export class InversorListComponent implements OnInit{

  inversorList: InversorDto[]  = []

  constructor(
    private router: Router,
    private service: InversorService
  ){}

  ngOnInit(){
    this.listar();
  }

  navegarParaFormularioDeInversor(){
    this.router.navigate(['/cadastro/produtos/inversor-form'])
  }

  navegarParaMenuDeProdutos(){
    this.router.navigate(['/cadastro/produtos'])
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {
        this.inversorList = data
      },
      error: (erro) => {
        console.log(erro.erro)
      }
    })
  }

  selacionarInversor(inv: InversorDto){
    localStorage.setItem('inversor', JSON.stringify(inv));
  }
}
