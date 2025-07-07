import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ActualizarDatosRoutingModule } from './actualizar-datos.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActualizarDatosComponent } from './actualizar-datos.component';



@NgModule({
  declarations: [
    ActualizarDatosComponent, FormularioComponent
  ],
  imports: [
    CommonModule,
    ActualizarDatosRoutingModule,
    SharedModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DatePipe]
})
export class ActualizarDatosModule { }
