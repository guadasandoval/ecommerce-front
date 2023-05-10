import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarixActualRoutingModule } from './usuarix-actual-routing.module';
import { UsuarixActualComponent } from './pages/usuarix-actual/usuarix-actual.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { MisDatosComponent } from './pages/mis-datos/mis-datos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuarixActualComponent, CambiarContrasenaComponent, MisDatosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarixActualRoutingModule,
    AppCommonModule
  ]
})
export class UsuarixActualModule { }
