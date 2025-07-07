import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-informativo-aportes',
  templateUrl: './modal-informativo-aportes.component.html',
  styleUrls: ['./modal-informativo-aportes.component.css']
})
export class ModalInformativoAportesComponent {
  message: string ='';
  funcionLlamada = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {}

  llamarFuncion() {
    this.funcionLlamada.emit();
    this.bsModalRef.hide();
  }

  cerrarModal() {
    this.bsModalRef.hide();
  }
}
