import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SolicitudesComponent } from 'projects/apppensionista/src/app/features/solicitudes/solicitudes.component';
import { OtrasSolicitudesComponent } from 'projects/apppensionista/src/app/features/solicitudes/components/otras-solicitudes/otras-solicitudes.component';
import { SolicitudesRoutingModule } from 'projects/apppensionista/src/app/features/solicitudes/solicitudes-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    SolicitudesComponent, OtrasSolicitudesComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    SharedModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class SolicitudesModule { }
