import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/models/cliente.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/commons/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/commons/info-dialog/info-dialog.component';
import { ClientePessoaFisicaService } from 'src/app/services/cliente-pessoa-fisica.service';
import { IrradiacaoMunicipio } from 'src/app/dto/IrradiacaoMunicipioDto';
import { Estado } from 'src/app/libs/estado';
import { PropostaService } from 'src/app/services/proposta.service';
import { Estados } from 'src/app/libs/estados';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-cliente-pessoa-fisica-form',
  templateUrl: './cliente-pessoa-fisica-form.component.html',
  styleUrl: './cliente-pessoa-fisica-form.component.css'
})
export class ClientePessoaFisicaFormComponent {
  cliente = {} as Cliente

  tituloConfirmDialog = ''
  showSpinner = false;

  estadosSelecionado = ''
  municipioSelecionado: IrradiacaoMunicipio
  estadosList: Estado[] = []
  listaIrradiacaoMunicipios: IrradiacaoMunicipio[] = [];
  tipoPessoa = 'F'
  cep = ''

  municipio = ''
  uf = ''
  logradouro =''
  numero=''
  bairro=''

  fone1:number
  fone2:number
  fone1whatsApp: boolean
  fone1whatsAppTelegram: boolean
  fone2whatsApp: boolean
  fone2whatsAppTelegram: boolean
  tipoTelefone1 = ''
  tipoTelefone2 = ''

  email=''
  displayedColumnsClientes: string[] = ['codigo', 'tipo', 'telefone', 'chat', 'email', 'acoes'];
  
  constructor(
    private router: Router,
    private service: ClientePessoaFisicaService,
    private dialog: MatDialog,
    public serviceCidade: PropostaService,
    private serviceCep: CepService,
  ){}

  ngOnInit(): void {
    const temp = localStorage.getItem('pessoaFisica');
    this.getEstados();

    if(temp){
      const cli: Cliente = JSON.parse(temp);

      if(cli.id){
        this.cliente.id = cli.id
        this.cliente.nome = cli.nome
        this.cliente.cpfCnpj = cli.cpfCnpj
        this.cliente.rg = cli.rg
        this.cliente.contatos = cli.contatos
        this.cliente.endereco = cli.endereco

        localStorage.removeItem('pessoaFisica');
      }
    }
  }

  getEstados(){
    let est = new Estados();
    this.estadosList = est.getEstados();
  }

  navegarParaListaDeClientes(){
    this.router.navigate(['/cadastro/clientes/pessoa-fisica-list'])
  }

  salvar(){
    const dialogRef = this.confirmDialog("Deseja continuar?")
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.showSpinnerManager(true);
        this.service.salvar(this.cliente).subscribe({
          next: () => {
            const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              if(data){
                this.navegarParaListaDeClientes();
              }  
            })                      
          },
          error: (erro) => {
            console.log(erro.erro)
          }
        })
      }
    })    
  }

  confirmDialog(msg: string){
    this.tituloConfirmDialog = msg;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};

    return this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  infoDialog(){
    this.tituloConfirmDialog = "Operação realizada com sucesso!";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};
    
    this.showSpinnerManager(false);
    return this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  showSpinnerManager(status: boolean){
    this.showSpinner = status
  }

  limpar(){
    this.cliente = {} as Cliente
  }

  listarIrradiacaMunicipios(){
    this.serviceCidade.consultar(this.estadosSelecionado).subscribe({
      next: (data) => {
        this.listaIrradiacaoMunicipios = data        
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  teste(){
    console.log(this.tipoPessoa)
  }

  consultarCep(){
    this.serviceCep.consultar(this.cep).subscribe({
      next: (data) => {
        console.log(data)
        this.bairro = data.bairro
        this.logradouro = data.logradouro
        this.municipio = data.localidade
        this.uf = data.uf
      },
      error: (erro) => {
        console.log(erro.erro)
      }
    })
  }
}
