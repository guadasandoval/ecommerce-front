import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { MisDatosComponent } from './pages/mis-datos/mis-datos.component';
import { UsuarioActualComponent } from './pages/usuario-actual/usuario-actual.component';

const routes: Routes = [{
  path: "", component: UsuarioActualComponent,
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
export class UsuarioActualRoutingModule { }
