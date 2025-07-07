import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ResolucionesRoutingModule } from './resoluciones-routing.module';
import { ResolucionesComponent } from './resoluciones.component';
import { SharedModule } from '../../shared/shared.module';
import { DetalleComponent } from './components/detalle/detalle.component';
import { DataResolucionesService } from './services/data-resoluciones.service';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    MainComponent,
    ResolucionesComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ResolucionesRoutingModule,
    SharedModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DataResolucionesService],
})
export class ResolucionesModule { }
