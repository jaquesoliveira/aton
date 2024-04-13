import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/commons/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/commons/info-dialog/info-dialog.component';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';
import { ClientePessoaFisicaService } from 'src/app/services/cliente-pessoa-fisica.service';

@Component({
  selector: 'app-cliente-pessoa-fisica',
  templateUrl: './cliente-pessoa-fisica.component.html',
  styleUrl: './cliente-pessoa-fisica.component.css'
})
export class ClientePessoaFisicaComponent {
  clienteList: ClientePessoaFisica[]  = []
  showSpinner = false;
  filtros = {} as ClientePessoaFisica

  tituloConfirmDialog = ''

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<ClientePessoaFisica>;
  public selection = new SelectionModel<ClientePessoaFisica>;

  public pageOptions: number[] = [5, 10, 15];
  public pageSize = 5;
  public totalPages: number;

  displayedColumns: string[] = ['codigo', 'nome', 'cpf', 'rg', 'telefone', 'email', 'acoes'];

  constructor(
    private router: Router,
    private service: ClientePessoaFisicaService,
    private dialog: MatDialog,
  ){}

  ngOnInit(){
    this.showSpinnerManager(true);
    this.listar();
  }

  navegarParaFormularioDeCliente(){
    this.router.navigate(['/cadastro/clientes/pessoa-fisica-form'])
  }

  navegarParaMenuDeClientes(){
    this.router.navigate(['/cadastro/clientes'])
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {
        this.showSpinnerManager(false);
        this.dataSource = new MatTableDataSource<ClientePessoaFisica> (data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.totalPages = data.length;

        this.clienteList = data
      },
      error: (erro) => {
        console.log(erro.erro)
        this.showSpinnerManager(false);
      }
    })
  }

  editar(mod: ClientePessoaFisica){
    localStorage.setItem('pessoaFisica', JSON.stringify(mod));
    this.navegarParaFormularioDeCliente()
  }

  excluir(id: number){
    const dialogRef = this.confirmDialog("Deseja continuar?")
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.showSpinnerManager(true);
        this.service.excluir(id).subscribe({
          next: () => {
            const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              if(data){
                this.listar();
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

  showSpinnerManager(status: boolean){
    this.showSpinner = status
  }

  limpar(){
    this.filtros = {} as ClientePessoaFisica
  }

  pesquisar(){
    this.service.pesquisar(this.filtros).subscribe({
      next: (data) => {
        this.showSpinnerManager(false);
        this.dataSource = new MatTableDataSource<ClientePessoaFisica> (data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.totalPages = data.length;

        this.clienteList = data
      },
      error: (erro) => {
        console.log(erro.erro)
        this.showSpinnerManager(false);
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

  onEnter(){
    this.pesquisar();
  }
}
