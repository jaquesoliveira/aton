import { Component } from '@angular/core';

@Component({
  selector: 'app-simulacao-grupo-a',
  templateUrl: './simulacao-grupo-a.component.html',
  styleUrls: ['./simulacao-grupo-a.component.css']
})
export class SimulacaoGrupoAComponent {

  nomeCliente = ''
  emailCliente = ''
  foneCliente1 = '' 
  foneCliente2 = ''

  nomeVendedor = ''
  emailVendedor = ''
  foneVendedor1 = ''
  foneVendedor2 = ''

  consumoForaPonta = ''
  demandaForaPontaUnica = ''
  consumoPonta = ''
  demandaPonta = ''
  geracaoDoSistemaSolar = ''
  demandaGeracao = ''
  classificacaoDeConsumo = ''
  acrescimoDeDemandaForaPonta = ''
  tarifaHoroSazonal = ''
  demandaEspecialSemICMS = ''
  valorDoInvestimento = ''
  simultaneidadeDoConsumoDeEnergia = ''
  taxaDeIluminacaoPublicaCIP = ''
  aumentoAnualDaContaCeEnergia = ''

  concessionaria = '' 

  icms = ''
  pis = ''
  cofins = ''

  sair(){}
  menu(){}
  
  
  tusdForaPonta(){
      if(this.getBandeira() === 'verde'){

      }  
  }

  getBandeira(){
    return 'verde';
  }
}
