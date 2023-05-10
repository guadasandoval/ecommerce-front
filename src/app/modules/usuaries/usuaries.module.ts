import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariesRoutingModule } from './usuaries-routing.module';
import { AltaUsuariesComponent } from './pages/alta-usuaries/alta-usuaries.component';
import { UsuariesService } from './services/usuaries.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../app-common/services/my-http-interceptor';
import { UsuariosComponent } from './pages/usuarios-list/usuarios.component';
import { UsuariesComponent } from './pages/usuaries/usuaries.component';
import { DataTablesModule } from 'angular-datatables';
import { UsuariosEditComponent } from './pages/usuarios-edit/usuarios-edit.component';

@NgModule({
  declarations: [AltaUsuariesComponent, UsuariosComponent, UsuariesComponent, UsuariosEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    UsuariesRoutingModule,
  ],
  providers: [
    UsuariesService, 
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
    },
  ],
})
export class UsuariesModule { }