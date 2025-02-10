import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadosService } from 'src/app/services/estados.service';
import { EstadosDto } from 'src/app/models/estados-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-estado',
  templateUrl: './selecionar-estado.component.html',
  styleUrl: './selecionar-estado.component.css'
})
export class SelecionarEstadoComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<SelecionarEstadoComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceEstados: EstadosService
  ){}
  
  displayedColumns: string[] = ['nome', 'uf'];
  estadosList: EstadosDto[] = []
  pageOptions: number[] = [4];
  pageSize: 5;
  pageInit = 0;
  totalPagina: number;
  filtro = ''


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<EstadosDto>;
  public selection = new SelectionModel<EstadosDto>(true, []);

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.serviceEstados.listar().subscribe({
      next:(data) => {        
        this.dataSource = new MatTableDataSource<EstadosDto> (data);        
        this.dataSource.paginator = this.paginator;
        this.totalPagina = data.length
      },
      error:(error)=> {
        console.log(error.error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false)
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    this.filtro = filterValue;
  }

  onRowClicked(row: EstadosDto){
    this.dialogRef.close(row);
  }
}
