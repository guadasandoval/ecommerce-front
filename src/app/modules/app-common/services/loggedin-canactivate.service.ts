import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { STATUS_OK } from "../interfaces/server-response";
import { AuthServiceService } from "./auth-service.service";

@Injectable()
export class LoggedInCanActivateService implements CanActivate{
    constructor(public authService: AuthServiceService, public router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (this.authService.user === null) {
          this.router.navigate(['login'], { queryParams: { url: state.url } });
          return Promise.resolve(false);
        }
        return new Promise<boolean>((resolve, reject) => {
          this.authService.checkLogin().subscribe(
            (response) => {
              if (response.status === STATUS_OK) {
                resolve(true);
                return;
              }
              this.router.navigate(['login'], { queryParams: { url: state.url } });
              this.authService.logout();
              resolve(false);
            },
            (err) => {
              this.router.navigate(['login'], { queryParams: { url: state.url } });
              this.authService.logout();
              console.error(err);
              resolve(false);
            },
          );
        });
      }
}