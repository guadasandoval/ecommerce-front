import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse, ServerResponseCategorias, ServerResponseStatus } from '../../app-common/interfaces/server-response';
import * as endpoints from '../../app-common/app-common-endpoints.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  serverResponse : ServerResponseStatus;
  constructor(private http: HttpClient) { }

  categorias() : Observable<ServerResponseCategorias>{
    return this.http.get<ServerResponseCategorias>(endpoints.categorias)
  }

  altaProducto(producto) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(endpoints.crearProducto, producto, this.httpOptions)
    .pipe(map((response: ServerResponse) => {
      this.serverResponse = response.status
      return response;
      }),
    );
  }
}
