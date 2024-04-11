import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  constructor(private router: Router){}

  cadastrarInversor(){
    this.router.navigate(['/cadastro/produtos/inversor-list'])
  }

  cadastrarModulo(){
    this.router.navigate(['cadastro/produtos/modulo-list'])
  }
}
