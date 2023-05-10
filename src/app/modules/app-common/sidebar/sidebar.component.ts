import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeUser } from '../../usuaries/interfaces/typeUser';
import { Usuarie } from '../../usuaries/interfaces/usuarie';
import { UsuariesService } from '../../usuaries/services/usuaries.service';
import { MisDatos } from '../../usuarix-actual/interfaces/mis-datos';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  userData : TypeUser;
  misDatos: MisDatos;
  userDataStr: string;
  user: Usuarie;
  
  
  constructor(private usuarixService: UsuariesService, private route: ActivatedRoute) {
   this.userDataStr = localStorage.getItem('key-auth');
  if (this.userDataStr) {
    this.userData = JSON.parse(this.userDataStr);
    } else {
      return;
    }
  }

  ngOnInit(): void {
     this.getUser();
  }

  getUser(){
    this.usuarixService.buscarUsuario(this.userData.usuario.id).subscribe(response => {
      this.user = response.data;    
    }) 
  }

}

