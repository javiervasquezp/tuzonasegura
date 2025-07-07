import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {
  fechaconsulta: string = "";
  fechaactualizacion: string = "";
  @Input() fechaActual = "";
  @Input() isVisibleFechaActual = true;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let user = this.userService.getLoggedUsers(); 
    this.fechaconsulta=user.DateSearch??'';
    this.fechaactualizacion=user.DateUpdate??'';
    
  }
}
