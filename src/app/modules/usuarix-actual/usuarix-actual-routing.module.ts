import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { MisDatosComponent } from './pages/mis-datos/mis-datos.component';
import { UsuarixActualComponent } from './pages/usuarix-actual/usuarix-actual.component';

const routes: Routes = [{
  path: "", component: UsuarixActualComponent,
  children:[
    {
      path: "mis-datos", component: MisDatosComponent,
    },
    {
    path: "cambiar-contrasena", component: CambiarContrasenaComponent,
    }
  ]
 
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarixActualRoutingModule { }
