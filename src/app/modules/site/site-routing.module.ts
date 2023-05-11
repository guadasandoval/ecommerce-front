import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './pages/site/site.component';

const routes: Routes = [{
  
  path: "", component: SiteComponent,
  
  children: [
    
    {
      path: "", 
      loadChildren: () => import("src/app/modules/tablero/tablero.module").then((m) => m.TableroModule),
    },

    {
      path: "usuarios",
      loadChildren: () => import("src/app/modules/usuaries/usuaries.module").then((m) => m.UsuariesModule),
    },
    
    {
      path: "importar",
      loadChildren: () => import("src/app/modules/importador/importador.module").then((m) => m.ImportadorModule),
    },

    {
      path: "productos",
      loadChildren: () => import("src/app/modules/productos/productos.module").then((m) => m.ProductosModule),
    },

    {
      path: 'usuario-actual',
      loadChildren: () =>
        import('src/app/modules/usuario-actual/usuario-actual.module').then((m) => m.UsuarioActualModule),
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }