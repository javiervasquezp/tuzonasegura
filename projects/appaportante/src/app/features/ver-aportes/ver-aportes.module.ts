import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { VerAportesRoutingModule } from './ver-aportes-routing.module';
import { VerAportesComponent } from './ver-aportes.component';  
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    MainComponent, VerAportesComponent
  ],
  imports: [
    CommonModule,
    VerAportesRoutingModule,
    SharedModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class VerAportesModule { }
