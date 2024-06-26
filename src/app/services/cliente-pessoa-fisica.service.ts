import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientePessoaFisicaService {

  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }

  listar(){
    return this.httpClient.get<Cliente[]>(this.url.concat(`/cliente`))
    .pipe(catchError(this.handlerError))
  }

  pesquisar(parametros: Cliente){
    return this.httpClient.post<Cliente[]>(this.url.concat(`/cliente/consultar`), JSON.stringify(parametros), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  salvar(clientePessoaFisica: Cliente){
    return this.httpClient.post<any>(this.url.concat(`/cliente/salvar`), JSON.stringify(clientePessoaFisica), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  excluir(id: number){
    return this.httpClient.delete<any>(this.url.concat(`/cliente/${id}`))
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
