import { Component, OnInit } from '@angular/core';
import { MisDatos } from '../../interfaces/mis-datos';
import { UsuarioActualService } from '../../services/usuario-actual.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
})
export class MisDatosComponent implements OnInit {
  misDatos : MisDatos;
  
  constructor(private usuarioActualService: UsuarioActualService) { 
    this.mostrarMisDatos()
  }

  ngOnInit(): void {}
  
  mostrarMisDatos(){
    this.usuarioActualService.getMisDatos().subscribe(response => {
      this.misDatos = response.data;
    }) 
  }
}
