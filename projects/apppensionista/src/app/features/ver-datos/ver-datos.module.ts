import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { VerDatosComponent } from './ver-datos.component';
import { VerDatosRoutingModule } from './ver-datos-routing.module';
import { SharedModule } from '../../shared/shared.module'; 



@NgModule({
  declarations: [
    MainComponent,
    VerDatosComponent 
  ],
  imports: [
    CommonModule,
    VerDatosRoutingModule,
    SharedModule.forRoot()
  ]
})
export class VerDatosModule { }
