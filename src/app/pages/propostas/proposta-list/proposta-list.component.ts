import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/models/cliente.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PropostaService } from 'src/app/services/proposta.service';
import { Proposta } from 'src/app/models/Proposta.model';
import { PropostaDto } from 'src/app/models/proposta-dto';

@Component({
  selector: 'app-proposta-list',
  templateUrl: './proposta-list.component.html',
  styleUrl: './proposta-list.component.css'
})
export class PropostaListComponent implements OnInit{
  filtro: string

  propostasList: PropostaDto[]  = []
  showSpinner = false;

  tituloConfirmDialog = ''

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<PropostaDto>;
  public selection = new SelectionModel<PropostaDto>;

  public pageOptions: number[] = [5, 10, 15];
  public pageSize = 5;
  public totalPages: number;

  displayedColumns: string[] = ['codigo', 'nome', 'tipo', 'cpfCnpj', 'dataCadastro', 'dataValidade', 'acoes'];


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: PropostaService
  ){}

  ngOnInit(): void{
    this.listar()
    localStorage.removeItem('idProposta')
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {        
        
        console.log(data);

        this.showSpinnerManager(false);
        this.dataSource = new MatTableDataSource<PropostaDto> (data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.totalPages = data.length;

        this.propostasList = data
      },
      error: (erro) => {
        console.log(erro.erro)
        this.showSpinnerManager(false);
      }
    })
  }


  limpar(){
    this.filtro = null
  }

  showSpinnerManager(status: boolean){
    this.showSpinner = status
  }

  navegarParaNovaProposta(){
    this.router.navigate(['/propostas/proposta-form'])
  }

  // navegarParaMenuDeClientes(){
  //   this.router.navigate(['/propostas/proposta-form'])
  // }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    this.filtro = filterValue;
  }
  

  editar(id){
    localStorage.setItem('idProposta', id);
    this.navegarParaNovaProposta()
  }

  excluir(id: number){
    // const dialogRef = this.confirmDialog("Deseja continuar?")
    // dialogRef.afterClosed().subscribe((data) => {
    //   if(data){
    //     this.showSpinnerManager(true);
    //     this.service.excluir(id).subscribe({
    //       next: () => {
    //         const ret = this.infoDialog();
    //         ret.afterClosed().subscribe((data)=>{
    //           if(data){
    //             this.listar();
    //           }  
    //         })
    //       },
    //       error: (erro) => {
    //         console.log(erro.erro)
    //       }
    //     })
    //   }
    // })
  }

  getStyle(data): string{
    let dt = new Date(data)
    if(dt < new Date()){
      return 'color: red;'
    }
    return 'color: green;'
  }

  menuPropostas(){
    this.router.navigate(['propostas'])
  }

}
