import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { ListarProductosComponent } from './pages/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductosComponent, ListarProductosComponent, CrearProductoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
