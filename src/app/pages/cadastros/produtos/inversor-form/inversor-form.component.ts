import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InversorDto } from 'src/app/models/inversor-dto';
import { InversorService } from 'src/app/services/inversor.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/commons/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/commons/info-dialog/info-dialog.component';

@Component({
  selector: 'app-inversor-form',
  templateUrl: './inversor-form.component.html',
  styleUrl: './inversor-form.component.css'
})
export class InversorFormComponent implements OnInit{

  inversor = {} as InversorDto
  monitoramentos = [
    'WIFI',
    'BLUETOOTH'
  ]

  tituloConfirmDialog = ''
  showSpinner = false;
  
  constructor(
    private router: Router,
    private service: InversorService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    const temp = localStorage.getItem('inversor');

    if(temp){
      const inv = JSON.parse(temp);

      if(inv.id){
        this.inversor.id = inv.id
        this.inversor.fabricante = inv.fabricante
        this.inversor.garantiaDefeito = inv.garantiaDefeito
        this.inversor.modelo = inv.modelo
        this.inversor.monitoramento = inv.monitoramento
        this.inversor.potencia = inv.potencia

        localStorage.removeItem('inversor');
      }
    }
  }

  navegarParaListaDeInversores(){
    this.router.navigate(['/cadastro/produtos/inversor-list'])
  }

  salvar(){
    const dialogRef = this.confirmDialog("Deseja continuar?")
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.showSpinnerManager(true);
        this.service.salvar(this.inversor).subscribe({
          next: () => {
            const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              if(data){
                this.navegarParaListaDeInversores();
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
    this.inversor = {} as InversorDto
  }
}
