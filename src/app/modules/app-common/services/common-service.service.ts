import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Constants from '../../app-common/app-common-endpoints.constants';
import { ServerResponseCategorias } from '../interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }


  categorias(): Observable<ServerResponseCategorias> {
    return this.http.get<ServerResponseCategorias>(Constants.categorias)
  }

}