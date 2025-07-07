import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-conf',
  templateUrl: './modal-conf.component.html',
  styleUrls: ['./modal-conf.component.css']
})
export class ModalConfComponent implements OnInit {
  @Input() titulo: string = "";
  @Input() body: string = "";
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
