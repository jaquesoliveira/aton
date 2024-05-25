import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModuloFotovoltaico } from 'src/app/models/modulo-fotovoltaico.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientePessoaFisicaService } from 'src/app/services/cliente-pessoa-fisica.service';
import { ModuloFotovoltaicoService } from 'src/app/services/modulo-fotovoltaico.service';

@Component({
  selector: 'app-selecionar-modulo',
  templateUrl: './selecionar-modulo.component.html',
  styleUrl: './selecionar-modulo.component.css'
})
export class SelecionarModuloComponent {
 
  displayedColumns: string[] = ['cliente'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<ModuloFotovoltaico>;
  public selection = new SelectionModel<ModuloFotovoltaico>(true, []);

  pageOptions: number[] = [3, 10];
  pageSize: 5;
  pageInit = 0;
  totalPagina: number;
  filtro = ''

  constructor(
    public dialogRef: MatDialogRef<SelecionarModuloComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ModuloFotovoltaicoService
  ){}

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {

    this.listar()
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<ModuloFotovoltaico> (data);        
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

  onRowClicked(row: ModuloFotovoltaico){
    this.dialogRef.close(row);
  }

}
