import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MisDatos } from '../../usuarix-actual/interfaces/mis-datos';
import { UsuarixActualService } from '../../usuarix-actual/services/usuarix-actual.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {

misDatos : MisDatos;
  
constructor(private router: Router, private authService: AuthServiceService, private usuarixActualService: UsuarixActualService) {
  this.mostrarMisDatos();
}

logoutUser(){
  this.authService.logout();
  this.router.navigate(['login'])
}

mostrarMisDatos(){
  this.usuarixActualService.getMisDatos().subscribe(response => {
    this.misDatos = response.data;
  }) 
}

}
