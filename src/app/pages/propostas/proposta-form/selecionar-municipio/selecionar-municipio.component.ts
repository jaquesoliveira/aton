import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadosService } from 'src/app/services/estados.service';
import { EstadosDto } from 'src/app/models/estados-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IrradiacaoMunicipio } from 'src/app/dto/IrradiacaoMunicipioDto';
import { PropostaService } from 'src/app/services/proposta.service';

@Component({
  selector: 'app-selecionar-municipio',
  templateUrl: './selecionar-municipio.component.html',
  styleUrl: './selecionar-municipio.component.css'
})
export class SelecionarMunicipioComponent  implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<SelecionarMunicipioComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,
    public serviceMunicipio: PropostaService,
    private serviceEstados: EstadosService
  ){}
  
  displayedColumns: string[] = ['nome'];
  municipiosList: IrradiacaoMunicipio[] = []
  pageOptions: number[] = [4];
  pageSize: 5;
  pageInit = 0;
  totalPagina: number;
  filtro = ''


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<IrradiacaoMunicipio>;
  public selection = new SelectionModel<IrradiacaoMunicipio>(true, []);

  ngOnInit(): void {
    this.listar()
  }

  listar(){    
    this.serviceMunicipio.consultar(
      localStorage.getItem('estadoSelecionado')).subscribe({

      next: (data) => {        
        this.dataSource = new MatTableDataSource<IrradiacaoMunicipio> (data);        
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
