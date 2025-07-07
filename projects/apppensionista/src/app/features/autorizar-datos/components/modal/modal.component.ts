import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalConfirmarComponent implements OnInit {
  @Input() titulo: string = "";
  @Input() body: string = "";
  @Input() esModalConfirmar: boolean = false;
  @Input() icon: string = "~/../../../../assets/images/icon-user.svg";
  @Input() btnNameSi: string = "Sí";
  @Input() btnNameNo: string = "No";

  public onClose!: Subject<boolean>;
  constructor(
    public bsModalRef: BsModalRef
    ) { }

  ngOnInit(): void {
    this.onClose = new Subject(); 
  }

  aceptarClick(){
    this.onClose.next(true);
  }

  cancelarClick(){
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
