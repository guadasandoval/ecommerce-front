import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaFortalecimientoComponent } from './pages/tabla-fortalecimiento/tabla-fortalecimiento.component';

const routes: Routes = [{
  path: "", component: TablaFortalecimientoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasFortalecimientoRoutingModule { }
