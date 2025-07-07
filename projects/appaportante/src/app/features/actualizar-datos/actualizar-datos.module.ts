import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarDatosComponent } from 'projects/apppensionista/src/app/features/actualizar-datos/actualizar-datos.component';
import { FormularioComponent } from 'projects/apppensionista/src/app/features/actualizar-datos/components/formulario/formulario.component';
import { ActualizarDatosRoutingModule } from 'projects/apppensionista/src/app/features/actualizar-datos/actualizar-datos.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';



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
})
export class ActualizarDatosModule { }
