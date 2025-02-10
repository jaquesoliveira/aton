import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { IrradiacaoMunicipio } from '../dto/IrradiacaoMunicipioDto';
import { Proposta } from '../models/Proposta.model';
import { PropostaDto } from '../models/proposta-dto';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  private url = enviroment.baseUrl;
  private path = '/api/v1/proposta'

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }


  consultar(nomeEstado: string){
    return this.httpClient.get<IrradiacaoMunicipio[]>(this.url.concat(`${this.path}/irradiacao/${nomeEstado}`), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  listar(){    
    return this.httpClient.get<PropostaDto[]>(this.url.concat(this.path), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  salvar(proposta: Proposta){
    return this.httpClient.post<Proposta>(this.url.concat(`${this.path}`), proposta, this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  findById(id: number){
    return this.httpClient.get<Proposta>(this.url.concat(`${this.path}/${id}`), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  excluir(id: number){
    return this.httpClient.delete<Proposta>(this.url.concat(`${this.path}/${id}`), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  handlerError(error: HttpErrorResponse){
    let errorMessage = ''

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = "Deu ruim"
    }
    return throwError(errorMessage);
  }
}
