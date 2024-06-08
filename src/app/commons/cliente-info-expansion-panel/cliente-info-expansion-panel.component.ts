import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-cliente-info-expansion-panel',
  templateUrl: './cliente-info-expansion-panel.component.html',
  styleUrl: './cliente-info-expansion-panel.component.css'
})
export class ClienteInfoExpansionPanelComponent {

  @Input() cliente: Cliente
  @Input() tipoPessoa: string
  email ='jaques.oliveira@gmail.com'
}
