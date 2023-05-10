import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { STATUS_OK } from 'src/app/modules/app-common/interfaces/server-response';
import { PersonaF } from '../../interfaces/personaF';
import { PersonasFortalecimientoService } from '../../services/personas-fortalecimiento.service';

@Component({
  selector: 'app-tabla-fortalecimiento',
  templateUrl: './tabla-fortalecimiento.component.html',
})
export class TablaFortalecimientoComponent implements OnInit {

  constructor(public service: PersonasFortalecimientoService, private  formBuilder: FormBuilder) { }
  
  
  personasFortalecimiento: PersonaF[];
  ultimaActualizacionPersonaMetadata: Date | string;
  nombreDeArchivoActualizacionMetadata: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  susbscribeProvincias: Subscription;
  formFiltro: FormGroup;
  listaPersonasTabla: PersonaF[];


  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  ngOnInit(): void {  
    
}
}
