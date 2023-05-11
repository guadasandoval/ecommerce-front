import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { ServerResponseCategorias, STATUS_ERROR, STATUS_OK } from 'src/app/modules/app-common/interfaces/server-response';
import { ProductoService } from '../../services/producto.service';
import { Categoria } from '../../../app-common/interfaces/categorias/categoria';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
})
export class CrearProductoComponent implements OnInit {

  formAltaProducto : FormGroup;
  submitted = false;
  categoriasList: Categoria[];
  mensajeError: string = '';
  susbscribeCategorias: Subscription;

  constructor(private formBuilder : FormBuilder, private productoService: ProductoService) { 
  }

  ngOnInit():void{
    this.inicializarForm();
    this.obtenerCategorias();
  }


  inicializarForm() {
    this.formAltaProducto = this.formBuilder.group({
        nombre: ['', [Validators.pattern(/^[^/@$%&!°|¬?¡¿=;:,"·~]+$/)]], 
        precio: [null, Validators.required],
        descripcion: [null],
        idCategoria: [null, Validators.required],
        stock: [null]
    });
  }

  obtenerCategorias() {
    this.susbscribeCategorias = this.productoService.categorias().subscribe( (response: ServerResponseCategorias) => {
      if (response.status === STATUS_OK) {
        this.categoriasList = response.data;
        
      } else {
        console.log(response.error);
      }
    });
  }


  crearProducto() {   
    this.submitted = true;

    if(this.formAltaProducto.invalid) {
      return;
    }

    const subject = new ReplaySubject(1);
    subject.next(false);      

    $('#modalLoading').on('shown.bs.modal', function (e) {
      subject.next(true);      
    });
    $('#modalLoading')['modal']('show');

    const combinado = combineLatest([subject, this.productoService.altaProducto(this.formAltaProducto.value)])
    const subscription = combinado.subscribe(([show,response]) => {
      if(show && response) {
        if(response.status == STATUS_OK) {
          $('#modalLoading')['modal']('hide');
          $('#modalSuccess')['modal']('show');
          setTimeout(() => {
            $('#modalSuccess')['modal']('hide');
          }, 1000);
          this.vaciarForm();
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

  vaciarForm() {
    this.submitted = false;    
    this.formAltaProducto.reset();
  }

}
