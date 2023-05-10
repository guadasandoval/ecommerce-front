import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasFortalecimientoRoutingModule } from './personas-fortalecimiento-routing.module';
import { TablaFortalecimientoComponent } from './pages/tabla-fortalecimiento/tabla-fortalecimiento.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TablaFortalecimientoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    PersonasFortalecimientoRoutingModule
  ]
})
export class PersonasFortalecimientoModule { }
