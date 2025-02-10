import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styleUrl: './propostas.component.css'
})
export class PropostasComponent implements OnInit{


  ngOnInit(): void {
    localStorage.removeItem('idProposta')    
  }  
}
