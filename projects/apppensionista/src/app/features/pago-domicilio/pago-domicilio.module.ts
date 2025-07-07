import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { PagoDomicilioRoutingModule } from './pago-domicilio-routing.module';
import { PagoDomicilioComponent } from './pago-domicilio.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalTerminarComponent } from './components/modal-terminar/modal-terminar.component';
import { CommonService } from '../../core/services/common.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    PagoDomicilioComponent,
    ModalTerminarComponent
  ],
  imports: [
    CommonModule,
    PagoDomicilioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    ModalModule.forRoot()
  ] 
})
export class PagoDomicilioModule { }
