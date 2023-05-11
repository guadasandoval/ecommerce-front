import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './pages/listar-productos/listar-productos.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  { path: "", component: ProductosComponent, 
  
  children: [
    {
      path: "listar-productos", component: ListarProductosComponent,
    },

    {
      path: "crear-producto", component: CrearProductoComponent,
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
