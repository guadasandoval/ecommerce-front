import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { STATUS_OK } from 'src/app/modules/app-common/interfaces/server-response';
import { Usuarie } from '../../interfaces/usuarie';
import { UsuariesService } from '../../services/usuaries.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuariosList: Usuarie[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(public usuarieService : UsuariesService) { }

  ngOnInit(): void {
    this.inicializarTabla()
    this.listarUsuarios()
  }
  listarUsuarios(){
    this.usuarieService.listarUsuarios().subscribe(response => {
      if(response.status == STATUS_OK) {
        this.usuariosList = response.data
        this.dtTrigger.next();
      } else{
        console.log(response.error); 
      }
    })
  }

  inicializarTabla() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ personas",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ personas",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primera",
          previous: "Anterior",
          next: "Siguiente",
          last: "Última"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
