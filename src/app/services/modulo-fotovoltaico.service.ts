import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ModuloFotovoltaico } from '../models/modulo-fotovoltaico.model';

@Injectable({
  providedIn: 'root'
})
export class ModuloFotovoltaicoService {
 
  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8' })
  }

  constructor(private httpClient: HttpClient) { }

  listar(){    
    return this.httpClient.get<ModuloFotovoltaico[]>(this.url.concat(`/modulo`))
    .pipe(catchError(this.handlerError))
  }

  pesquisar(parametros: ModuloFotovoltaico){
    return this.httpClient.post<ModuloFotovoltaico[]>(this.url.concat(`/modulo/consultar`), JSON.stringify(parametros), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  salvar(inversorDto: ModuloFotovoltaico){
    return this.httpClient.post<any>(this.url.concat(`/modulo/salvar`), JSON.stringify(inversorDto), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  excluir(id: number){
    return this.httpClient.delete<any>(this.url.concat(`/modulo/${id}`))
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
