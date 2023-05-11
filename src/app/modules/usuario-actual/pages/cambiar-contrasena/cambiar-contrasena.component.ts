import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, ReplaySubject } from 'rxjs';
import { ServerResponse, STATUS_ERROR, STATUS_OK } from 'src/app/modules/app-common/interfaces/server-response';
import { UsuarioActualService } from '../../services/usuario-actual.service';
import { PasswordValidators } from './password-validators';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
})
export class CambiarContrasenaComponent implements OnInit {

  formPassword: FormGroup;
  formSubmitting: boolean;
  mensajeError: string = '';
  isUsuario: boolean = true;

  constructor(public usuarioService : UsuarioActualService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildFormResetPassword();
  }

  private buildFormResetPassword(){
    this.formPassword = this.formBuilder.group({
      CurrentPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      Password:['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      ConfirmPassword:['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],   
    },
    { validator: PasswordValidators.MatchingPasswords },
    ); 
  }

  cambiarPassword(){ 
    this.formSubmitting = true;
    if (this.formPassword.invalid) {
      return;
    }
    if(this.formPassword.get("Password").value !== this.formPassword.get("ConfirmPassword").value){
      this.mensajeError = "Las contraseñas no coinciden";
      $('#modalDanger')['modal']('show');  
      setTimeout(() => {
        $('#modalDanger')['modal']('hide');
      }, 1800); 
      return;
    }
 
    const subject = new ReplaySubject(1);
    subject.next(false);
    this.isUsuario = false;      
    
    $('#modalLoading').on('shown.bs.modal', function (e) {
      subject.next(true);      
    });
    $('#modalLoading')['modal']('show');

    const combinado = combineLatest([subject, this.usuarioService.cambiarContrasena(this.formPassword.value)])
    const subscription = combinado.subscribe(([show,response]) => {
      if(show && response) {
        if(response.status == STATUS_OK) {
          $('#modalLoading')['modal']('hide');
          $('#modalSuccess')['modal']('show');
          setTimeout(() => {
            $('#modalSuccess')['modal']('hide');
          }, 1800);
          this.formPassword.reset();
        } 
        else if(response.status == STATUS_ERROR) {
          this.mensajeError = response.error;
          $('#modalLoading')['modal']('hide');
          $('#modalDanger')['modal']('show');  
          setTimeout(() => {
            $('#modalDanger')['modal']('hide');
          }, 1800); 
        }    
        subscription.unsubscribe();
      }         
    });
  }

  return(){
    this.router.navigate(["/site"])
  }
}
