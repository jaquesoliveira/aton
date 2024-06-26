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
import { AdicionarContatoComponent } from '../dialogs/adicionar-contato/adicionar-contato.component';
import { Contato } from 'src/app/models/contato.model';
import { MatTableDataSource } from '@angular/material/table';
import { Endereco } from 'src/app/models/endereco.model';

@Component({
  selector: 'app-cliente-pessoa-fisica-form',
  templateUrl: './cliente-pessoa-fisica-form.component.html',
  styleUrl: './cliente-pessoa-fisica-form.component.css'
})
export class ClientePessoaFisicaFormComponent {
  cliente = {} as Cliente
  contato = {} as Contato

  tituloConfirmDialog = ''
  showSpinner = false;

  estadosSelecionado = ''
  municipioSelecionado: IrradiacaoMunicipio
  estadosList: Estado[] = []
  listaIrradiacaoMunicipios: IrradiacaoMunicipio[] = [];
  
  displayedColumnsContatos: string[] = ['tipo', 'telefone', 'chat', 'email', 'acoes'];
  
  //dataSourceContatos: Contato[] = []
  //public dataSourceContatos: MatTableDataSource<Contato>;
  contatos: Contato[] = []
  

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
    this.cliente.contatos = [] as Contato[];
    this.cliente.endereco = {} as Endereco;

    if(temp){
      const cli: Cliente = JSON.parse(temp);

      if(cli.id){
        this.cliente.id = cli.id
        this.cliente.nome = cli.nome
        this.cliente.tipo = cli.tipo
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

  consultarCep(){
    this.serviceCep.consultar(this.cliente.endereco.cep).subscribe({
      next: (data) => {
        this.cliente.endereco.bairro = data.bairro
        this.cliente.endereco.endereco = data.logradouro
        this.cliente.endereco.cidade = data.localidade
        this.cliente.endereco.estado = data.uf
      },
      error: (erro) => {
        console.log(erro.erro)
      }
    })
  }


  adicionaContatoDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AdicionarContatoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {      
      this.contato = data
      if(this.contato.descricao){
        this.cliente.contatos.push(this.contato)
      }
    })    
  }

  exluirContato(item: Contato){
    const index = this.cliente.contatos.indexOf(item);
    this.cliente.contatos.splice(index,1);
  }
}
