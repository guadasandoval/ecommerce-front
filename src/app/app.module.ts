import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from './modules/app-common/app-common.module';
import { SiteModule } from './modules/site/site.module';
import { LoginModule } from './modules/login/login.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,  
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppCommonModule.forRoot(),
    DataTablesModule,
  ],
  
  providers: [ 
    { provide: LOCALE_ID, useValue: 'es-Ar' },
],
  bootstrap: [AppComponent]
})
export class AppModule { }