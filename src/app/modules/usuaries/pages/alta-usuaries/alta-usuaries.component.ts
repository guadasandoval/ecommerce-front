import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { STATUS_OK, STATUS_ERROR, ServerResponseRol, ServerResponseGrupo } from 'src/app/modules/app-common/interfaces/server-response';
import { Grupo } from '../../interfaces/grupo';
import { Rol } from '../../interfaces/rol';
import { Usuarie } from '../../interfaces/usuarie';
import { UsuariesService } from '../../services/usuaries.service';
import { PasswordValidators } from './password-validators';

@Component({
  selector: 'app-alta-usuaries',
  templateUrl: './alta-usuaries.component.html',
})
export class AltaUsuariesComponent implements OnInit {

  formAltaUsuarix: FormGroup;
  formSubmitting: boolean;
  roles: Rol[];
  grupos: Grupo[];
  susbscribeRoles: Subscription;
  susbscribeGrupos: Subscription;
  mensajeError: string = '';

// eye
  visible:boolean = true;
  changetype:boolean =true;


// eye
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  constructor(public usuarieService : UsuariesService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildFormAltaUsuarix();
    this.obtenerRoles();
    this.obtenerGrupos();
    
  }
 
  // altaUsuarie en direcciotio ldap
  // altaUsuarie() {
  //   const usuarie : Usuarie = {uid: this.uid, nombre: this.nombre, apellido:this.apellido, email: this.email, password: this.password}    
  //   console.log(usuarie)
  //   this.usuarieService.altaUsuarie(usuarie).subscribe( (response: ServerResponse) => {
  //     if (response.status === STATUS_OK) {
  //       //TODO: manejar errores
  //     } else if (response.status === STATUS_ERROR) {
  //       console.log(response.error)
  //     }
  //   },
  // );}

  private buildFormAltaUsuarix(){
    this.formAltaUsuarix = this.formBuilder.group({
      rolId:[null, [Validators.required]],
      grupoId: [null, [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      habilitado: [null, [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9._%+-]+@mingeneros\.gob\.ar$")]],      password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]]
    },
    { validator: PasswordValidators.MatchingPasswords },
 
    );
  }

  altaUsuarix(){
    this.formSubmitting = true;
      if (this.formAltaUsuarix.invalid) {
      return;
    }
    const subject = new ReplaySubject(1);
    subject.next(false);   

    $('#modalLoading').on('shown.bs.modal', function (e) {
      subject.next(true);      
    });
    $('#modalLoading')['modal']('show');
  console.log(this.formAltaUsuarix.value)
    const combinado = combineLatest([subject, this.usuarieService.altaUsuarie(this.formAltaUsuarix.value)])
    const subscription = combinado.subscribe(([show,response]) => {
      if(show && response) {
        if(response.status == STATUS_OK) {
          $('#modalLoading')['modal']('hide');
          $('#modalSuccess')['modal']('show');
          setTimeout(() => {
            $('#modalSuccess')['modal']('hide');
          }, 1000);
          this.formAltaUsuarix.reset();
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
}

