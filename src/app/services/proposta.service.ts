import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { IrradiacaoMunicipio } from '../dto/IrradiacaoMunicipioDto';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
  }

  constructor(private httpClient: HttpClient) { }


  consultar(nomeEstado: string){
    console.log(nomeEstado)
    return this.httpClient.get<IrradiacaoMunicipio[]>(this.url.concat(`/irradiacao/${nomeEstado}`))
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
