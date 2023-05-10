import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedOutCanActivateService } from './modules/app-common/services/logged-out-can-activate.service';
import { LoggedInCanActivateService } from './modules/app-common/services/loggedin-canactivate.service';

const routes: Routes = [
  
  {
    path: "", 
    pathMatch: "full",
    redirectTo: "login",
  }, 

      {
        path: "login",
        loadChildren: () => import ('./modules/login/login.module').then((m)=> m.LoginModule),
        canActivate: [
        LoggedOutCanActivateService],
      },
    
      {
        path: "site",
        loadChildren: () => import("./modules/site/site.module").then((m) => m.SiteModule),
        canActivate: [
        LoggedInCanActivateService],
      },
    
      {
        path: "**", 
        redirectTo: "login",
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }