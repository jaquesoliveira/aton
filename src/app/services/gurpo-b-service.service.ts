import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { catchError, throwError } from 'rxjs';
import { Estado } from '../libs/estado';
import { ParametrosAneelResumidaDto } from '../dto/parametrosAneelResumidaDto';

@Injectable({
  providedIn: 'root'
})
export class GurpoBServiceService {

  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }

  consultar(nomeEstado: string){
    console.log(nomeEstado)
    return this.httpClient.get<Estado[]>(this.url.concat(`/concessionaria/${nomeEstado}`))
    .pipe(catchError(this.handlerError))
  }

  getValTusdSemImposto(parametros: ParametrosAneelResumidaDto){
    console.log(parametros)
    return this.httpClient.post<any>(this.url.concat('/aneel'), JSON.stringify(parametros), this.httpOptions)
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
