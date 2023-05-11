import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MisDatos } from '../../usuario-actual/interfaces/mis-datos';
import { UsuarioActualService } from '../../usuario-actual/services/usuario-actual.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {

misDatos : MisDatos;
  
constructor(private router: Router, private authService: AuthServiceService, private usuarioActualService: UsuarioActualService) {
  this.mostrarMisDatos();
}

logoutUser(){
  this.authService.logout();
  this.router.navigate(['login'])
}

mostrarMisDatos(){
  this.usuarioActualService.getMisDatos().subscribe(response => {
    this.misDatos = response.data;
  }) 
}

}
