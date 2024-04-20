import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientePessoaFisicaService } from 'src/app/services/cliente-pessoa-fisica.service';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-selecionar-cliente',
  templateUrl: './selecionar-cliente.component.html',
  styleUrl: './selecionar-cliente.component.css'
})
export class SelecionarClienteComponent implements OnInit, AfterViewInit{
    
  displayedColumns: string[] = ['cliente'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<ClientePessoaFisica>;
  public selection = new SelectionModel<ClientePessoaFisica>(true, []);

  pageOptions: number[] = [5, 10];
  pageSize: 5;
  pageInit = 0;
  totalPagina: number;
  filtro = ''

  constructor(
    public dialogRef: MatDialogRef<SelecionarClienteComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClientePessoaFisicaService
  ){}

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {

    this.listar()
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<ClientePessoaFisica> (data);        
        this.dataSource.paginator = this.paginator;
        this.totalPagina = data.length
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onConfirm(): void {
    this.dialogRef.close(true)
  }

  onCancel(): void {
    this.dialogRef.close(false)
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    this.filtro = filterValue;
  }

  onRowClicked(row: ClientePessoaFisica){
    this.dialogRef.close(row);
  }

}
