import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { InversorDto } from '../models/inversor-dto';
import { catchError, throwError } from 'rxjs';
import { ParametrosInversorDto } from '../dto/parametrosInversorDto';

@Injectable({
  providedIn: 'root'
})
export class InversorService {

  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }

  listar(){    
    return this.httpClient.get<InversorDto[]>(this.url.concat(`/inversor`))
    .pipe(catchError(this.handlerError))
  }

  consultar(parametros: ParametrosInversorDto){
    return this.httpClient.post<InversorDto[]>(this.url.concat(`/inversor/consultar`), JSON.stringify(parametros), this.httpOptions)
    .pipe(catchError(this.handlerError))
  }

  salvar(inversorDto: InversorDto){
    return this.httpClient.post<any>(this.url.concat(`/inversor/salvar`), JSON.stringify(inversorDto), this.httpOptions)
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
