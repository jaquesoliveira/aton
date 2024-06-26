import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloFotovoltaico } from 'src/app/models/modulo-fotovoltaico.model';
import { Router } from '@angular/router';
import { ModuloFotovoltaicoService } from 'src/app/services/modulo-fotovoltaico.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/commons/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/commons/info-dialog/info-dialog.component';

@Component({
  selector: 'app-modulo-fotovoltaico-form',
  templateUrl: './modulo-fotovoltaico-form.component.html',
  styleUrl: './modulo-fotovoltaico-form.component.css'
})
export class ModuloFotovoltaicoFormComponent {

  modulo = {} as ModuloFotovoltaico
  tituloConfirmDialog = ''
  showSpinner = false;
  
  constructor(
    private router: Router,
    private service: ModuloFotovoltaicoService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    const temp = localStorage.getItem('modulo');

    if(temp){
      const mod = JSON.parse(temp);

      if(mod.id){
        this.modulo.id = mod.id
        this.modulo.fabricante = mod.fabricante
        this.modulo.potencia = mod.potencia
        this.modulo.garantiaDefeito = mod.garantiaDefeito
        this.modulo.garantiaEficiencia = mod.garantiaEficiencia

        localStorage.removeItem('modulo');
      }
    }
  }

  navegarParaListaDeModulos(){
    this.router.navigate(['/cadastro/produtos/modulo-list'])
  }

  salvar(){
    const dialogRef = this.confirmDialog("Deseja continuar?")
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.showSpinnerManager(true);
        this.service.salvar(this.modulo).subscribe({
          next: () => {
            const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              if(data){
                this.navegarParaListaDeModulos();
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
    this.modulo = {} as ModuloFotovoltaico
  }
}
