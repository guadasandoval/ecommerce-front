import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioActualRoutingModule } from './usuario-actual-routing.module';
import { AppCommonModule } from '../app-common/app-common.module';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { MisDatosComponent } from './pages/mis-datos/mis-datos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioActualComponent } from './pages/usuario-actual/usuario-actual.component';


@NgModule({
  declarations: [UsuarioActualComponent, CambiarContrasenaComponent, MisDatosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioActualRoutingModule,
    AppCommonModule
  ]
})
export class UsuarioActualModule { }
