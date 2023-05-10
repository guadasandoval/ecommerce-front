import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { AuthServiceService } from 'src/app/modules/app-common/services/auth-service.service';
import { AuthUsuario } from 'src/app/modules/app-common/interfaces/categorias/auth-usuario';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
})

export class SiteComponent implements OnInit {

  user: AuthUsuario;
  constructor(private authService: AuthServiceService, private router: Router, private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.authService.loggedInChanged.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.user = this.authService.user;
      } else {
        this.user = null;
      }
    });

    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = '/assets/bootstrapTheme/js/sb-admin-2.min.js';  
    this.renderer2.appendChild(document.body, s);
  }
}