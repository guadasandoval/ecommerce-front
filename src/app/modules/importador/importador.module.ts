import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportadorRoutingModule } from './importador-routing.module';
import { ImportadorComponent } from './pages/importador/importador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../app-common/services/my-http-interceptor';
import { ImportComponent } from './pages/import/import.component';



@NgModule({
  declarations: [
    ImportComponent,
    ImportadorComponent, 
  ],
  imports: [
    CommonModule,
    ImportadorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
    }
  ],
})
export class ImportadorModule { }
