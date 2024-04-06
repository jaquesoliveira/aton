import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { catchError, throwError } from 'rxjs';
import { Estado } from '../libs/estado';

@Injectable({
  providedIn: 'root'
})
export class GurpoBServiceService {

  private url = enviroment.baseUrl + "/concessionaria";

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }

  consultar(nomeEstado: string){
    console.log(nomeEstado)
    return this.httpClient.get<Estado[]>(this.url.concat(`/${nomeEstado}`))
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
