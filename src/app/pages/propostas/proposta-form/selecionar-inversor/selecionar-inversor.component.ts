import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InversorDto } from 'src/app/models/inversor-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InversorService } from 'src/app/services/inversor.service';

@Component({
  selector: 'app-selecionar-inversor',
  templateUrl: './selecionar-inversor.component.html',
  styleUrl: './selecionar-inversor.component.css'
})
export class SelecionarInversorComponent {


  displayedColumns: string[] = ['codigo', 'fabricante', 'potencia'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<InversorDto>;
  public selection = new SelectionModel<InversorDto>(true, []);

  pageOptions: number[] = [5, 10];
  pageSize: 5;
  pageInit = 0;
  totalPagina: number;
  filtro = ''

  constructor(
    public dialogRef: MatDialogRef<SelecionarInversorComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InversorService
  ){}

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {

    this.listar()
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<InversorDto> (data);        
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

  onRowClicked(row: InversorDto){
    this.dialogRef.close(row);
  }
}
