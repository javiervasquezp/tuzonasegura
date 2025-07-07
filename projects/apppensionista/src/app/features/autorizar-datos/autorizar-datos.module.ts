import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { AutorizarDatosRoutingModule } from './autorizar-datos-routing.module';
import { AutorizarDatosComponent } from './autorizar-datos.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalConfirmarComponent } from './components/modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    MainComponent, AutorizarDatosComponent, ModalConfirmarComponent
  ],
  imports: [
    CommonModule,
    AutorizarDatosRoutingModule,
    SharedModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DatePipe],
  entryComponents:[ModalConfirmarComponent] 
})
export class AutorizarDatosModule { }
