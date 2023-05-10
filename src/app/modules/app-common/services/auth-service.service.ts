import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { UsuarieLogin } from '../../usuaries/interfaces/usuarieLogin';
import { ServerResponse, ServerResponseLogin, ServerResponseLoginPrueba, ServerResponseStatus, STATUS_OK } from '../interfaces/server-response';
import * as Constants from '../app-common-endpoints.constants';
import { LoginInfo } from '../interfaces/categorias/login-info';
import { AuthUsuario } from '../interfaces/categorias/auth-usuario';


@Injectable()
export class AuthServiceService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  serverResponseLogin : ServerResponseStatus;

  private readonly KEY_AUTH: string = 'key-auth';
  private readonly KEY_REMEMBER: string = 'key-remember';
  private loggedInChangedSubject: BehaviorSubject<boolean>;
  private auth: LoginInfo;
  
  constructor(private httpClient: HttpClient) {
    this.auth = null;
    this.loggedInChangedSubject = new BehaviorSubject<boolean>(false);
    const authStr = localStorage.getItem(this.KEY_AUTH);
    if (authStr) {
      this.auth = JSON.parse(authStr);
      this.loggedInChangedSubject.next(true);
    } else {
      this.setLogout();
    }
  }


  usuarieLogin (usuarieLogin : UsuarieLogin) : Observable<ServerResponseLogin> {
    return this.httpClient.post<ServerResponseLogin> ("/api/login", usuarieLogin, this.httpOptions)
    .pipe(map((response: ServerResponseLogin) => {
      
      this.serverResponseLogin = response.status
      console.log(this.serverResponseLogin);
      return response;
      }),
    );
  }
 

  get authorization(): string {
    return this.auth ? this.auth.token : null;
  }

  get user(): AuthUsuario {
    return this.auth ? this.auth.usuario : null;
  }

  public get loggedInChanged(): Observable<boolean> {
    return this.loggedInChangedSubject.asObservable();
  }

  private setLogin(data: LoginInfo): void {
    this.auth = data;

    localStorage.setItem(this.KEY_AUTH, JSON.stringify(this.auth));

    this.loggedInChangedSubject.next(true);
  }

  private setLogout(): void {
    this.auth = null;
    localStorage.removeItem(this.KEY_AUTH);

    // Clear all cached request
    const emailRemember = this.loadUserRemember();
    localStorage.clear();
    if (emailRemember !== '') {
      this.saveUserRemember(emailRemember);
    }

    this.loggedInChangedSubject.next(false);
  }

  saveUserRemember(email: string): void {
    localStorage.setItem(this.KEY_REMEMBER, email);
  }

  loadUserRemember(): string {
    const email = localStorage.getItem(this.KEY_REMEMBER) || '';
    return email;
  }

  clearUserRemember(): void {
    localStorage.removeItem(this.KEY_REMEMBER);
  }

  checkLogin(): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponseLoginPrueba>(Constants.checkLogin, null);
  }

  login(email: string, password: string): Observable<ServerResponseLoginPrueba> {
   
    const data = { email, password };
    return this.httpClient.post<ServerResponseLoginPrueba>(Constants.login, data).pipe(
      map((response: ServerResponseLoginPrueba) => {
        if (response.status === STATUS_OK) {
          this.setLogin(response.data);
        } else {
          this.setLogout();
        }
        return response;
      }),
    );
  }

  logout(skipServer: boolean = false): void {
    if (!skipServer) {
      this.httpClient.post<ServerResponse>(Constants.logout, null).subscribe((response: ServerResponse) => {});
    }
    this.setLogout();
  }

  hasPermission(permission: number, type: number): boolean {
    // tslint:disable-next-line: no-bitwise
    permission &= type;

    return permission !== 0;
  }
  
}

