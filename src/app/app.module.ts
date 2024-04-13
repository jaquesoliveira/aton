import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { ConfigsComponent } from './pages/configs/configs.component';
import { LoginComponent } from './pages/login/login.component';
import { PaginaInexistenteComponent } from './pages/pagina-inexistente/pagina-inexistente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { DimensionamentoBateriaComponent } from './pages/dimensionamento-bateria/dimensionamento-bateria.component';
import { SimulacaoGrupoAComponent } from './pages/simulacao-grupo-a/simulacao-grupo-a.component';
import { SimulacaoGrupoBComponent } from './pages/simulacao-grupo-b/simulacao-grupo-b.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { TopBarComponent } from './commons/top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';

import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { InversorListComponent } from './pages/cadastros/produtos/inversor-list/inversor-list.component';
import { InversorFormComponent } from './pages/cadastros/produtos/inversor-form/inversor-form.component';
import { InfoDialogComponent } from './commons/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from './commons/confirm-dialog/confirm-dialog.component';
import { ModuloFotovoltaicoListComponent } from './pages/cadastros/produtos/modulo-fotovoltaico-list/modulo-fotovoltaico-list.component';
import { ModuloFotovoltaicoFormComponent } from './pages/cadastros/produtos/modulo-fotovoltaico-form/modulo-fotovoltaico-form.component';
import { ClientePessoaFisicaComponent } from './pages/cadastros/clientes/cliente-pessoa-fisica/cliente-pessoa-fisica.component';
import { ClientePessoaFisicaFormComponent } from './pages/cadastros/clientes/cliente-pessoa-fisica-form/cliente-pessoa-fisica-form.component';
import {MatExpansionModule} from '@angular/material/expansion';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    ConfigsComponent,
    LoginComponent,
    PaginaInexistenteComponent,
    DimensionamentoBateriaComponent,
    SimulacaoGrupoAComponent,
    SimulacaoGrupoBComponent,
    TopBarComponent,
    InversorListComponent,
    InversorFormComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    ModuloFotovoltaicoListComponent,
    ModuloFotovoltaicoFormComponent,
    ClientePessoaFisicaComponent,
    ClientePessoaFisicaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    MatExpansionModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
