import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TaAplicacaoFiltrosDTO } from '../dto/taAplicacaoFiltrosDto';

@Injectable({
  providedIn: 'root'
})
export class TaAplicacaoService {

  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }

  consultar(filtros: TaAplicacaoFiltrosDTO): Observable<any>{
    return this.httpClient.post<any>(this.url.concat('/ta-aplicacao'), JSON.stringify(filtros), this.httpOptions)
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

