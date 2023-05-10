import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './pages/tablero/tablero.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../app-common/services/my-http-interceptor';




@NgModule({
  declarations: [TableroComponent],
  imports: [
    CommonModule,
    TableroRoutingModule,
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
    },
  ],
})
export class TableroModule {}