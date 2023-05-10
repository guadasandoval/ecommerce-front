import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as UsuariesConstants from '../../app-common/app-common-endpoints.constants';
import { ServerResponse, ServerResponseMisDatos, ServerResponseUsuarix } from '../../app-common/interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarixActualService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getMisDatos(): Observable<ServerResponseMisDatos> {
    return this.http.get<ServerResponseMisDatos>(UsuariesConstants.misDatos);
  }

  cambiarContrasena(formInputPassword): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(UsuariesConstants.cambiarContrasena, formInputPassword, this.httpOptions);
  }

}
