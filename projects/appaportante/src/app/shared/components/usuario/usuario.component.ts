import { Component, OnInit } from '@angular/core'; 
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
nombreCompleto :string ='';
numeroDocumento : string ='';
tipoDocumento : string ='';
  constructor( private userService: UserService) { }

  ngOnInit(): void {
    let user = this.userService.getLoggedUsers(); 
    this.nombreCompleto=user.FullName??'';
    this.numeroDocumento=user.NumDoc??'';
    this.tipoDocumento=user.TypeDocDesc??''; 
  }

}
