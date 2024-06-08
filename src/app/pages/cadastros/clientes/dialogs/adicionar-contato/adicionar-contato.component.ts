import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contato } from 'src/app/models/contato.model';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.component.html',
  styleUrl: './adicionar-contato.component.css'
})
export class AdicionarContatoComponent {
  fonewhatsApp: boolean
  foneTelegram: boolean

  contato = {} as Contato;

  constructor(
    public dialogRef: MatDialogRef<AdicionarContatoComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  onConfirm(): void {
    this.dialogRef.close(this.contato)
  }

  onCancel(): void {
    this.dialogRef.close(false)
  }

}
