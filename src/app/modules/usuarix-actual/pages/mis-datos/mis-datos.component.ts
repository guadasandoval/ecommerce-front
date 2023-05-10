import { Component, OnInit } from '@angular/core';
import { MisDatos } from '../../interfaces/mis-datos';
import { UsuarixActualService } from '../../services/usuarix-actual.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
})
export class MisDatosComponent implements OnInit {
  misDatos : MisDatos;
  
  constructor(private usuarixActualService: UsuarixActualService) { 
    this.mostrarMisDatos()
  }

  ngOnInit(): void {}
  
  mostrarMisDatos(){
    this.usuarixActualService.getMisDatos().subscribe(response => {
      this.misDatos = response.data;
    }) 
  }
}
