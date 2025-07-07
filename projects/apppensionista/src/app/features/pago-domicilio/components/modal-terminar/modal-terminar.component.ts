import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-terminar',
  templateUrl: './modal-terminar.component.html',
  styleUrls: ['./modal-terminar.component.css']
})
export class ModalTerminarComponent implements OnInit {
  public onClose!: Subject<boolean>;
  @Input() body: string = "";
  titulo:string = "Pago a domicilio";
  botonNombre="Cerrar";
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.onClose = new Subject(); 
  }
  onClickClose(){
    this.onClose.next(false);
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    
  }

}
