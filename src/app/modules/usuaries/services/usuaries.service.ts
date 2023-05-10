import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarie } from '../interfaces/usuarie';
import * as UsuariesConstants from '../../app-common/app-common-endpoints.constants';
import { ServerResponse, ServerResponseGrupo, ServerResponseRol, ServerResponseStatus, ServerResponseUsuarios, ServerResponseUsuarix } from '../../app-common/interfaces/server-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariesService {
    
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  serverResponse : ServerResponseStatus;
  
  constructor(private http: HttpClient) {}

  altaUsuarie(usuarie : Usuarie) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(UsuariesConstants.altaUsuario, usuarie, this.httpOptions)
    .pipe(map((response: ServerResponse) => {
      this.serverResponse = response.status
      return response;
      }),
    );
  }

  listarUsuarios() : Observable<ServerResponseUsuarios>{
    return this.http.get<ServerResponseUsuarios>(UsuariesConstants.usuariosList)
  }

  buscarUsuario(id: number) : Observable<ServerResponseUsuarix> {
    return this.http.get<ServerResponseUsuarix>(UsuariesConstants.editarUsuario + id) 
  }

  editarDatosUsuario(id: number, usuarie : Usuarie) : Observable<ServerResponse>{
    return this.http.post<ServerResponse>(UsuariesConstants.editarUsuario + id, usuarie, this.httpOptions)
  }

  updateUsuarioPassword(id: number, password: string): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(UsuariesConstants.password + id, password, this.httpOptions);
  }

   // ----------------------------------------------------------------------------------------------
  // Roles
  // ----------------------------------------------------------------------------------------------
  getRolesOptions(): Observable<ServerResponseRol> {
    return this.http.get<ServerResponseRol>(UsuariesConstants.roles);
  }

  // ----------------------------------------------------------------------------------------------
  // Grupos
  // ----------------------------------------------------------------------------------------------
  getGruposOptions(): Observable<ServerResponseGrupo> {
    return this.http.get<ServerResponseGrupo>(UsuariesConstants.grupos);
  }
}