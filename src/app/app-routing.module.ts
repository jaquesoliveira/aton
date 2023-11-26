import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PaginaInexistenteComponent } from './pages/pagina-inexistente/pagina-inexistente.component';
import { HomeComponent } from './pages/home/home.component';
import { SimulacaoGrupoBComponent } from './pages/simulacao-grupo-b/simulacao-grupo-b.component';

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
    path:'simulacao-b',
    component: SimulacaoGrupoBComponent,
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
