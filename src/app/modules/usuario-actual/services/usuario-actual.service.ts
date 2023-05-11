import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as UsuariosConstants from '../../app-common/app-common-endpoints.constants';
import { ServerResponse, ServerResponseMisDatos } from '../../app-common/interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getMisDatos(): Observable<ServerResponseMisDatos> {
    return this.http.get<ServerResponseMisDatos>(UsuariosConstants.misDatos);
  }

  cambiarContrasena(formInputPassword): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(UsuariosConstants.cambiarContrasena, formInputPassword, this.httpOptions);
  }

}
