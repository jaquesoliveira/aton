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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { PropostasComponent } from './pages/propostas/propostas/propostas.component';
import { SimulacoesComponent } from './pages/simulacoes/simulacoes.component';
import { ClienteExpansionPanelComponent } from './commons/cliente-expansion-panel/cliente-expansion-panel.component';
import { PropostaFormComponent } from './pages/propostas/proposta-form/proposta-form.component';
import { BarraDeTituloComponent } from './commons/barra-de-titulo/barra-de-titulo.component';
import { ClienteInfoExpansionPanelComponent } from './commons/cliente-info-expansion-panel/cliente-info-expansion-panel.component';
import { SelecionarClienteComponent } from './pages/propostas/proposta-form/selecionar-cliente/selecionar-cliente.component';
import { PropostaViewComponent } from './pages/propostas/proposta-view/proposta-view.component';
import { EnquadramentoTarifarioComponent } from './pages/simulacoes/enquadramento-tarifario/enquadramento-tarifario.component';
import { DetalhesMesComponent } from './pages/simulacoes/components/detalhes-mes/detalhes-mes.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import { SelecionarModuloComponent } from './pages/propostas/proposta-form/selecionar-modulo/selecionar-modulo.component';
import { SelecionarInversorComponent } from './pages/propostas/proposta-form/selecionar-inversor/selecionar-inversor.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
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
    ClientePessoaFisicaFormComponent,
    PropostasComponent,
    SimulacoesComponent,
    ClienteExpansionPanelComponent,
    PropostaFormComponent,
    BarraDeTituloComponent,
    ClienteInfoExpansionPanelComponent,
    SelecionarClienteComponent,
    PropostaViewComponent,
    EnquadramentoTarifarioComponent,
    DetalhesMesComponent,
    SelecionarModuloComponent,
    SelecionarInversorComponent
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
    MatSlideToggleModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask(),
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
