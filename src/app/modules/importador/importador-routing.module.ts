import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportComponent } from './pages/import/import.component';

import { ImportadorComponent } from './pages/importador/importador.component';


const routes: Routes = [{
  path: "", component: ImportComponent,

  children: [
    {
      path: "", component: ImportadorComponent,
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportadorRoutingModule { }
