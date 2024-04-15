import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PaginaInexistenteComponent } from './pages/pagina-inexistente/pagina-inexistente.component';
import { HomeComponent } from './pages/home/home.component';
import { SimulacaoGrupoBComponent } from './pages/simulacao-grupo-b/simulacao-grupo-b.component';
import { SimulacaoGrupoAComponent } from './pages/simulacao-grupo-a/simulacao-grupo-a.component';
import { DimensionamentoBateriaComponent } from './pages/dimensionamento-bateria/dimensionamento-bateria.component';
import { InversorListComponent } from './pages/cadastros/produtos/inversor-list/inversor-list.component';
import { InversorFormComponent } from './pages/cadastros/produtos/inversor-form/inversor-form.component';
import { ProdutosComponent } from './pages/cadastros/produtos/produtos/produtos.component';
import { ClientesComponent } from './pages/cadastros/clientes/clientes/clientes.component';
import { PropostasComponent } from './pages/propostas/propostas/propostas.component';
import { ModuloFotovoltaicoListComponent } from './pages/cadastros/produtos/modulo-fotovoltaico-list/modulo-fotovoltaico-list.component';
import { ModuloFotovoltaicoFormComponent } from './pages/cadastros/produtos/modulo-fotovoltaico-form/modulo-fotovoltaico-form.component';
import { ClientePessoaFisicaComponent } from './pages/cadastros/clientes/cliente-pessoa-fisica/cliente-pessoa-fisica.component';
import { ClientePessoaFisicaFormComponent } from './pages/cadastros/clientes/cliente-pessoa-fisica-form/cliente-pessoa-fisica-form.component';
import { SimulacoesComponent } from './pages/simulacoes/simulacoes.component';
import { PropostaFormComponent } from './pages/propostas/proposta-form/proposta-form.component';
import { PropostaListComponent } from './pages/propostas/proposta-list/proposta-list.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'simulacao-a',
    component: SimulacaoGrupoAComponent,
    pathMatch: 'full'
  },
  {
    path:'simulacao-b',
    component: SimulacaoGrupoBComponent,
    pathMatch: 'full'
  },
  {
    path:'dimensionamento-bateria',
    component: DimensionamentoBateriaComponent,
    pathMatch: 'full'
  },
  {
    path:'cadastro/produtos',
    component: ProdutosComponent,
    pathMatch: 'full'
  },
  {
    path:'cadastro/produtos/inversor-list',
    component: InversorListComponent,
    pathMatch: 'full'
  },
  {
    path:'cadastro/produtos/inversor-form',
    component: InversorFormComponent,
    pathMatch: 'full'
  },
  {
    path:'cadastro/produtos/modulo-list',
    component: ModuloFotovoltaicoListComponent,
    pathMatch: 'full'
  },
  {
    path:'cadastro/produtos/modulo-form',
    component: ModuloFotovoltaicoFormComponent,
    pathMatch: 'full'
  }, 
  {
    path:'cadastro/clientes',
    component: ClientesComponent,
    pathMatch: 'full'
  },
  {
    path:'cadastro/clientes/pessoa-fisica-list',
    component: ClientePessoaFisicaComponent,
    pathMatch: 'full'
  },
  {
    path:'cadastro/clientes/pessoa-fisica-form',
    component: ClientePessoaFisicaFormComponent,
    pathMatch: 'full'
  },
  {
    path:'propostas',
    component: PropostasComponent,
    pathMatch: 'full'
  },
  {
    path:'propostas/proposta-form',
    component: PropostaFormComponent,
    pathMatch: 'full'
  },
  {
    path:'propostas/proposta-list',
    component: PropostaListComponent,
    pathMatch: 'full'
  },
  {
    path:'simulacoes',
    component: SimulacoesComponent,
    pathMatch: 'full'
  },
  {
    path:'**',
    component: PaginaInexistenteComponent    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
