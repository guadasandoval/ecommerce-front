import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, ReplaySubject } from 'rxjs';
import { STATUS_ERROR, STATUS_OK } from 'src/app/modules/app-common/interfaces/server-response';
import { ImportadorService } from '../../services/importador.service';

@Component({
  selector: 'app-importador',
  templateUrl: './importador.component.html'
})

export class ImportadorComponent implements OnInit {

    uploadForm: FormGroup;
    registrosTotales: number;
    registrosCargados: number;
    loading: boolean = false;
    mostrarModalOk: boolean = false;
    mostrarModalErr: boolean = false;
    mensajeError: string = '';
        
  constructor(private importadorService: ImportadorService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.importarArchivoExcel();
  }
 
  importarArchivoExcel(){
    this.uploadForm = this.formBuilder.group({
      archivos : ['', Validators.required]
    })
  }

  onFileSelect(event) {
      
      if (event.target.files && event.target.files.length > 0) {
        const file = (event.target.files[0] as File);
        this.uploadForm.get('archivos').setValue(file);
      }
  }

  onSubmit() {
    const subject = new ReplaySubject(1);
    subject.next(false);      

    $('#exampleModalLoading').on('shown.bs.modal', function (e) {
      subject.next(true);      
    });
    $('#exampleModalLoading')['modal']('show');
    this.loading = true;
    const formData = new FormData();
    
    formData.append('file', this.uploadForm.get('archivos').value);
    const combinado = combineLatest([subject, this.importadorService.importarArchivo(formData)])
    const subsctription = combinado.subscribe(([show,response]) => {
      if(show && response) {
        if(response.status == STATUS_OK) {
          this.loading = false;
  
          this.registrosCargados = response.dataCargadosCorrectamente;
          this.registrosTotales = response.dataRegistrosTotales;
  
          $('#exampleModalLoading')['modal']('hide');
          $('#exampleModalSuccess')['modal']('show');
          setTimeout(() => {
            $('#modalSuccess')['modal']('hide');
          }, 1500);
        } 
        else if(response.status == STATUS_ERROR) {
          this.loading = false;     
          this.mensajeError = response.error;
          $('#exampleModalLoading')['modal']('hide');
          $('#exampleModalDanger')['modal']('show');   
          setTimeout(() => {
            $('#exampleModalDanger')['modal']('hide');
          }, 1500);
        }    
        subsctription.unsubscribe();
      }         
    });
  }    
}
