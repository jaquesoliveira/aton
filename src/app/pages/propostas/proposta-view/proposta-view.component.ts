import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proposta } from 'src/app/models/Proposta.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-proposta-view',
  templateUrl: './proposta-view.component.html',
  styleUrl: './proposta-view.component.css'
})
export class PropostaViewComponent implements OnInit {

  @ViewChild('content', {static: false}) el!: ElementRef;
  
  proposta = {} as Proposta

  email = 'cursos@solarplusbrasil.com.br'

  constructor(){}

  ngOnInit(): void {
    let prop = localStorage.getItem('proposta')
    this.proposta = JSON.parse(prop)
    console.log(this.proposta)
  }

  imprimir(){
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.saveGraphicsState()
        pdf.save('proposta.pdf')
      }
    }) 
  }

}
