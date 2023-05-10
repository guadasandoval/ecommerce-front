import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './pages/site/site.component';

const routes: Routes = [{
  
  path: "", component: SiteComponent,
  
  children: [
    
    // En la vista principal se carga el tablero
    {
      path: "", 
      loadChildren: () => import("src/app/modules/tablero/tablero.module").then((m) => m.TableroModule),
    },

    {
      path: "usuaries",
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
      path: 'usuarix-actual',
      loadChildren: () =>
        import('src/app/modules/usuarix-actual/usuarix-actual.module').then((m) => m.UsuarixActualModule),
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }