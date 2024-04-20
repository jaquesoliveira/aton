import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePessoaFisica } from 'src/app/models/cliente-pessoa-fisica.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/commons/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/commons/info-dialog/info-dialog.component';
import { ClientePessoaFisicaService } from 'src/app/services/cliente-pessoa-fisica.service';

@Component({
  selector: 'app-cliente-pessoa-fisica-form',
  templateUrl: './cliente-pessoa-fisica-form.component.html',
  styleUrl: './cliente-pessoa-fisica-form.component.css'
})
export class ClientePessoaFisicaFormComponent {
  clientePessoaFisica = {} as ClientePessoaFisica

  tituloConfirmDialog = ''
  showSpinner = false;
  
  constructor(
    private router: Router,
    private service: ClientePessoaFisicaService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    const temp = localStorage.getItem('pessoaFisica');

    if(temp){
      const pf = JSON.parse(temp);

      if(pf.id){
        this.clientePessoaFisica.id = pf.id
        this.clientePessoaFisica.nome = pf.nome
        this.clientePessoaFisica.cpfCnpj = pf.cpf
        this.clientePessoaFisica.rg = pf.rg
        this.clientePessoaFisica.telefone = pf.telefone
        this.clientePessoaFisica.email = pf.email

        localStorage.removeItem('pessoaFisica');
      }
    }
  }

  navegarParaListaDeClientes(){
    this.router.navigate(['/cadastro/clientes/pessoa-fisica-list'])
  }

  salvar(){
    const dialogRef = this.confirmDialog("Deseja continuar?")
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.showSpinnerManager(true);
        this.service.salvar(this.clientePessoaFisica).subscribe({
          next: () => {
            const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              if(data){
                this.navegarParaListaDeClientes();
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
    this.clientePessoaFisica = {} as ClientePessoaFisica
  }
}
