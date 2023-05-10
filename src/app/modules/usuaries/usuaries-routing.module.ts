import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaUsuariesComponent } from './pages/alta-usuaries/alta-usuaries.component';
import { UsuariesComponent } from './pages/usuaries/usuaries.component';
import { UsuariosEditComponent } from './pages/usuarios-edit/usuarios-edit.component';
import { UsuariosComponent } from './pages/usuarios-list/usuarios.component';

const routes: Routes = [
 
  { path: "", component: UsuariesComponent, 
  children: [
    {
      path: "usuarios", component: UsuariosComponent,
    },

    {
      path: "alta-usuario", component: AltaUsuariesComponent,
    },

    { 
      path: 'editar/:id', component: UsuariosEditComponent 
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariesRoutingModule { }