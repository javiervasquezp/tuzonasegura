import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesComponent } from './solicitudes.component';
import { OtrasSolicitudesComponent } from './components/otras-solicitudes/otras-solicitudes.component';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [SolicitudesComponent, OtrasSolicitudesComponent],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class SolicitudesModule { }
