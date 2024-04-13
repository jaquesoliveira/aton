import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  constructor(private router: Router){}

  navegarParaContaClientes(){
    this.router.navigate(['cadastro/clientes/pessoa-fisica-list'])
  }

  cadastrarModulo(){
    this.router.navigate(['cadastro/produtos/modulo-list'])
  }
}
