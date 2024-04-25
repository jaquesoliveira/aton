import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TarifaGrupoAModel } from '../models/tarifa-grupo-a.model';

@Injectable({
  providedIn: 'root'
})
export class TarifasGrupoAService {

  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }

  consultarTarifasGrupoA(id: number): Observable<TarifaGrupoAModel>{
    return this.httpClient.get<TarifaGrupoAModel>(this.url.concat(`/tarifas/${id}`), this.httpOptions)
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
