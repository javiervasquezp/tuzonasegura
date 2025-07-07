import { Output,EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @Input() mostrarImprimir: boolean = false;
nombreCompleto :string ='';
numeroDocumento : string ='';
tipoDocumento : string ='';
@Output() printHandler = new EventEmitter();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let user = this.userService.getLoggedUsers(); 
    this.nombreCompleto=user.FullName??'';
    this.numeroDocumento=user.NumDoc??'';
    this.tipoDocumento=user.TypeDocDesc??''; 
  }
  onClickHandler(): void {
		this.printHandler.emit();
	}
}
