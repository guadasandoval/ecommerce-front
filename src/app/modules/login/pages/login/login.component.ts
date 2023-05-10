import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerResponseLogin, STATUS_OK, STATUS_ERROR, ServerResponseLoginPrueba } from 'src/app/modules/app-common/interfaces/server-response';
import { AuthServiceService } from 'src/app/modules/app-common/services/auth-service.service';
import { UsuarieLogin } from 'src/app/modules/usuaries/interfaces/usuarieLogin';


@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  
  user: string
  password: string

  formLogin: FormGroup;
  formSubmitting: boolean;
  url: string;
  hide: boolean = false;

  constructor(public authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
   
    const email = this.authService.loadUserRemember();
       
    this.formLogin = this.formBuilder.group({
      email: [email, [Validators.required, Validators.email, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [email !== '', []],
    });
    
    this.formSubmitting = false;

    this.url = null;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.url) {
        if (params.url.indexOf('/site/') === 0) {
          this.url = params.url;
        } else {
          this.url = null;
        }
      } else {
        this.url = null;
      }
    });
  }
  
  loginUsuario(){
    const loginUsuario : UsuarieLogin = {user: this.user, password : this.password}
    this.authService.usuarieLogin(loginUsuario).subscribe(
      (response: ServerResponseLogin) => {
        if (response.status === STATUS_OK) {
            this.router.navigate(["site"]);
        }
        else if (response.status === STATUS_ERROR) {}
      },
    );
  }

  onSubmit(): void {
    
    if (!this.formLogin.valid) {
      return;
    }

    if (this.formSubmitting) {
      return;
    }
    this.formSubmitting = true;

    if (this.formLogin.value.remember) {
      this.authService.saveUserRemember(this.formLogin.value.email);
    } else {
      this.authService.clearUserRemember();
    }

    this.authService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe(
      (response: ServerResponseLoginPrueba) => {
        if (response.status === STATUS_OK) {
          if (this.url) {
            this.router.navigateByUrl(this.url);
          } else {
            this.router.navigate(['site']);
          }
        } else if (response.status === STATUS_ERROR) {
         window.alert(response.error);
        }
        this.formSubmitting = false;
      },

    );
  }
}