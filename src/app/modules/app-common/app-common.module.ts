import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedOutCanActivateService } from './services/logged-out-can-activate.service';
import { AuthServiceService } from './services/auth-service.service';
import { CommonService } from './services/common-service.service';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoggedInCanActivateService } from './services/loggedin-canactivate.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './services/my-http-interceptor';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    TopbarComponent, 
    SidebarComponent],
  
  imports: [
    CommonModule,
    RouterModule,
    //SiteRoutingModule,
  ],

  exports: [
    SidebarComponent,
    TopbarComponent,
  ]
})
export class AppCommonModule {
  static forRoot(): ModuleWithProviders<AppCommonModule>{
    return{
      ngModule: AppCommonModule,
      providers: [
        AuthServiceService, 
        LoggedInCanActivateService,
        LoggedOutCanActivateService,
        CommonService,
        {
          multi: true,
          provide: HTTP_INTERCEPTORS,
          useClass: MyHttpInterceptor,
        },
      ],
    }
  }
}