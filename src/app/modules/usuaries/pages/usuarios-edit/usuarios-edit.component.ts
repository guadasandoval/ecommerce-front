import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { ServerResponse, ServerResponseGrupo, ServerResponseRol, STATUS_ERROR, STATUS_OK } from 'src/app/modules/app-common/interfaces/server-response';
import { PasswordValidators } from 'src/app/modules/usuario-actual/pages/cambiar-contrasena/password-validators';
import { Grupo } from '../../interfaces/grupo';
import { Rol } from '../../interfaces/rol';
import { Usuarie } from '../../interfaces/usuarie';
import { UsuariesService } from '../../services/usuaries.service';


@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
})
export class UsuariosEditComponent implements OnInit {

  formEditUsuarix: FormGroup;
  formPassword: FormGroup;
  formSubmitting: boolean;
  idUsuarix: number;
  usuarixData: Usuarie;
  roles: Rol[];
  grupos: Grupo[];

  susbscribeRoles: Subscription;
  susbscribeGrupos: Subscription;

  mensajeError: string = '';
  isUsuario: boolean = true;

  constructor(public usuarieService : UsuariesService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.idUsuarix = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.buildFormEditUsuarix();
    this.buildFormResetPassword();
    this.obtenerRoles();
    this.obtenerGrupos();
    this.loadDataUsuario();
  }
 
   private buildFormEditUsuarix(){
    this.formEditUsuarix = this.formBuilder.group({
      ID:[''],
      RolId:['', [Validators.required]],
      GrupoId: ['', [Validators.required]],
      Nombres: ['', [Validators.required]],
      Apellidos: ['', [Validators.required]],
      Email: ["", [Validators.required, Validators.email, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9._%+-]+@mingeneros\.gob\.ar$")]],      Password: [''],
      ResetPassword: [''],
      Habilitado: ['', [Validators.required]],
    })
  }

  private buildFormResetPassword(){
    this.formPassword = this.formBuilder.group({
      Password: ['', [Validators.required, Validators.maxLength(50)]],
      ConfirmPassword:['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],   
    },
    { validator: PasswordValidators.MatchingPasswords },)

    }

  loadDataUsuario(){
    this.usuarieService.buscarUsuario(this.idUsuarix).subscribe(response => {
      if(response.status == STATUS_OK){
        this.usuarixData = response.data;
        this.precargarForm();
      } else{
        console.log(response.error);
        
      }
    })
  }

  precargarForm(){
    this.formEditUsuarix.get("RolId").setValue(this.usuarixData.RolId);
    this.formEditUsuarix.get("GrupoId").setValue(this.usuarixData.GrupoId);
    this.formEditUsuarix.get("Nombres").setValue(this.usuarixData.Nombres);
    this.formEditUsuarix.get("Apellidos").setValue(this.usuarixData.Apellidos);
    this.formEditUsuarix.get("Email").setValue(this.usuarixData.Email);
    this.formEditUsuarix.get("Habilitado").setValue(this.usuarixData.Habilitado);
    this.formEditUsuarix.get("ID").setValue(this.usuarixData.ID);
  }

  obtenerRoles(){
    this.susbscribeRoles = this.usuarieService.getRolesOptions().subscribe( (response: ServerResponseRol) => {
      if (response.status === STATUS_OK) {
        this.roles = response.data;  
      } else {
        console.log(response.error);
      }
    });
  }

  obtenerGrupos(){
    this.susbscribeGrupos = this.usuarieService.getGruposOptions().subscribe( (response: ServerResponseGrupo) => {
      if (response.status === STATUS_OK) {
        this.grupos = response.data;  
      } else {
        console.log(response.error);
      }
    });
  }

  editarDatos(){ 
    this.formSubmitting = true;
    if (this.formEditUsuarix.invalid) {
      return;
    }
    const subject = new ReplaySubject(1);
    subject.next(false);   
    this.isUsuario = true;   

    $('#modalLoading').on('shown.bs.modal', function (e) {
      subject.next(true);      
    });
    $('#modalLoading')['modal']('show');

    const combinado = combineLatest([subject, this.usuarieService.editarDatosUsuario(this.idUsuarix, this.formEditUsuarix.value)])
    const subscription = combinado.subscribe(([show,response]) => {
      if(show && response) {
        if(response.status == STATUS_OK) {
          $('#modalLoading')['modal']('hide');
          $('#modalSuccess')['modal']('show');
          setTimeout(() => {
            $('#modalSuccess')['modal']('hide');
          }, 1000);
        } 
        else if(response.status == STATUS_ERROR) {
          this.mensajeError = response.error;
          $('#modalLoading')['modal']('hide');
          $('#modalDanger')['modal']('show');  
          setTimeout(() => {
            $('#modalDanger')['modal']('hide');
          }, 1000); 
        }    
        subscription.unsubscribe();
      }         
    });
  }

  resetPassword(){ 
    this.formSubmitting = true;
    if (this.formPassword.invalid) {
      return;
    }
    this.usuarieService.updateUsuarioPassword(this.idUsuarix, this.formPassword.value).subscribe((response:ServerResponse)=>{
      if(response.status == STATUS_OK){
        console.log("reset pass OK");   
      } else {
        console.log(response.error) 
      }
    });
    const subject = new ReplaySubject(1);
    subject.next(false);      
    this.isUsuario = false;

    $('#modalLoading').on('shown.bs.modal', function (e) {
      subject.next(true);      
    });
    $('#modalLoading')['modal']('show');

    const combinado = combineLatest([subject, this.usuarieService.updateUsuarioPassword(this.idUsuarix, this.formPassword.value)])
    const subscription = combinado.subscribe(([show,response]) => {
      if(show && response) {
        if(response.status == STATUS_OK) {
          $('#modalLoading')['modal']('hide');
          $('#modalSuccess')['modal']('show');
          setTimeout(() => {
            $('#modalSuccess')['modal']('hide');
          }, 1000);
          document.getElementById('close').click()
        } 
        else if(response.status == STATUS_ERROR) {
          this.mensajeError = response.error;
          $('#modalLoading')['modal']('hide');
          $('#modalDanger')['modal']('show');  
          setTimeout(() => {
            $('#modalDanger')['modal']('hide');
          }, 1000); 
        }    
        subscription.unsubscribe();
      }         
    });
  }

  return(){
    this.router.navigate(["/site/usuaries/usuarios"])
  }
}
