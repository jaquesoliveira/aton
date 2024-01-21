import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PaginaInexistenteComponent } from './pages/pagina-inexistente/pagina-inexistente.component';
import { HomeComponent } from './pages/home/home.component';
import { SimulacaoGrupoBComponent } from './pages/simulacao-grupo-b/simulacao-grupo-b.component';
import { SimulacaoGrupoAComponent } from './pages/simulacao-grupo-a/simulacao-grupo-a.component';
import { DimensionamentoBateriaComponent } from './pages/dimensionamento-bateria/dimensionamento-bateria.component';

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
    path:'**',
    component: PaginaInexistenteComponent    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
