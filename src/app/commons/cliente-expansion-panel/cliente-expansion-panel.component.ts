import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-expansion-panel',
  templateUrl: './cliente-expansion-panel.component.html',
  styleUrl: './cliente-expansion-panel.component.css'
})
export class ClienteExpansionPanelComponent {
  @Input() titulo: string;
  @Input() cadastros: string;
  @Input() propostas_aprovadas: string;
  @Input() vendas: string;
  @Input() valorVendas: string;
  @Input() imagem: string;
  @Input() tipoPessoa: string;
}
