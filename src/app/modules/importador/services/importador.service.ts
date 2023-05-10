import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as RutaConstants from '../../app-common/app-common-endpoints.constants';
import { ServerResponseImportador } from '../../app-common/interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class ImportadorService {
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

    
  importarArchivo(formData: FormData) : Observable<ServerResponseImportador>{   
    return this.http.post<ServerResponseImportador>(RutaConstants.importar, formData)
    .pipe(map((response: ServerResponseImportador) => {
      return response;
      }),  
    );
  }

}
