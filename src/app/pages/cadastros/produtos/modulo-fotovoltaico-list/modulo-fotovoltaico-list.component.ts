import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloFotovoltaico } from 'src/app/models/modulo-fotovoltaico.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { InversorService } from 'src/app/services/inversor.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/commons/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/commons/info-dialog/info-dialog.component';
import { ModuloFotovoltaicoService } from 'src/app/services/modulo-fotovoltaico.service';

@Component({
  selector: 'app-modulo-fotovoltaico-list',
  templateUrl: './modulo-fotovoltaico-list.component.html',
  styleUrl: './modulo-fotovoltaico-list.component.css'
})
export class ModuloFotovoltaicoListComponent {

  inversorList: ModuloFotovoltaico[]  = []
  showSpinner = false;
  filtros = {} as ModuloFotovoltaico

  tituloConfirmDialog = ''

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<ModuloFotovoltaico>;
  public selection = new SelectionModel<ModuloFotovoltaico>;

  public pageOptions: number[] = [5, 10, 15];
  public pageSize = 5;
  public totalPages: number;

  displayedColumns: string[] = ['codigo', 'fabricante', 'potencia', 'garantiaDefeito', 'garantiaEficiencia', 'acoes'];

  constructor(
    private router: Router,
    private service: ModuloFotovoltaicoService,
    private dialog: MatDialog,
  ){}

  ngOnInit(){
    this.showSpinnerManager(true);
    this.listar();
  }

  navegarParaFormularioDeModulo(){
    this.router.navigate(['/cadastro/produtos/modulo-form'])
  }

  navegarParaMenuDeProdutos(){
    this.router.navigate(['/cadastro/produtos'])
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {
        this.showSpinnerManager(false);
        this.dataSource = new MatTableDataSource<ModuloFotovoltaico> (data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.totalPages = data.length;

        this.inversorList = data
      },
      error: (erro) => {
        console.log(erro.erro)
        this.showSpinnerManager(false);
      }
    })
  }

  editar(mod: ModuloFotovoltaico){
    localStorage.setItem('modulo', JSON.stringify(mod));
    this.navegarParaFormularioDeModulo()
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
    this.filtros = {} as ModuloFotovoltaico
  }

  pesquisar(){
    this.service.pesquisar(this.filtros).subscribe({
      next: (data) => {
        this.showSpinnerManager(false);
        this.dataSource = new MatTableDataSource<ModuloFotovoltaico> (data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.totalPages = data.length;

        this.inversorList = data
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
