import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './pages/site/site.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariesModule } from '../usuaries/usuaries.module';
import { AppCommonModule } from '../app-common/app-common.module';
import { TableroModule } from '../tablero/tablero.module';
import { ImportadorModule } from '../importador/importador.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from '../app-common/services/my-http-interceptor';
import { UsuarioActualModule } from '../usuario-actual/usuario-actual.module';
import { ProductosModule } from '../productos/productos.module';



@NgModule({
  declarations: [
    SiteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppCommonModule,
    SiteRoutingModule,
    TableroModule,
    UsuariesModule,
    ImportadorModule,
    UsuarioActualModule,
    ProductosModule
    
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
    },
  ],
})
export class SiteModule {}