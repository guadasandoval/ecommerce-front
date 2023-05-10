import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { STATUS_OK } from '../interfaces/server-response';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutCanActivateService implements CanActivate{

  constructor(public authService : AuthServiceService, public router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    if(this.authService.user === null){
      return Promise.resolve(true); 
    }
   
    return new Promise<boolean>((resolve, reject) => {
      this.authService.checkLogin().subscribe(
        (response) => {
          if (response.status === STATUS_OK) {
            this.router.navigate(['site']);
            resolve(false);
            return;
          }
          this.authService.logout();
          resolve(true);
        },
        (err) => {
          this.authService.logout();
          console.error(err);
          resolve(true);
        },
      );
    }); 
  }
}