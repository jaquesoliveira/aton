import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EstadosDto } from '../models/estados-dto';
import { catchError, Observable, throwError } from 'rxjs';
import { httpErrorResponse } from '../libs/erros';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private url = enviroment.baseUrl;
  
  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<EstadosDto[]>{      
    return this.httpClient.get<EstadosDto[]>(this.url.concat('/api/v1/estados'))
    .pipe(catchError(httpErrorResponse.prototype))
  }

}
