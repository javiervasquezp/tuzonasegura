import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { ModalInformativoAportesComponent } from './components/modal/modal-informativo-aportes/modal-informativo-aportes.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ModalComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalModule],
  exports: [HeaderComponent, FooterComponent, MenuComponent],
  entryComponents: [ModalComponent, ModalInformativoAportesComponent]
})
export class SharedModule {}
