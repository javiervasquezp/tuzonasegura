import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {
  @Input() titulo :string ='';
  @Input() body : string ='';
  @Input() botonNombre : string ='Cerrar';
@Output() closeHandler = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onClickHandler(): void {
		this.closeHandler.emit();
	}
}
