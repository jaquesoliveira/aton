import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';

@Component({
  selector: 'app-cliente-info-expansion-panel',
  templateUrl: './cliente-info-expansion-panel.component.html',
  styleUrl: './cliente-info-expansion-panel.component.css'
})
export class ClienteInfoExpansionPanelComponent {

  @Input() cliente: ClientePessoaFisica
  @Input() tipoPessoa: string
  email ='jaques.oliveira@gmail.com'
}
