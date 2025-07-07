import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-leyenda-documento',
  templateUrl: './leyenda-documento.component.html',
  styleUrls: ['./leyenda-documento.component.css']
})
export class LeyendaDocumentoComponent implements OnInit {
  tipoDocumento : string ='';
  descripcion : string ='';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let user = this.userService.getLoggedUsers(); 
    this.descripcion=user.FullTypeDocDesc??'';
    this.tipoDocumento=user.TypeDocDesc??''; 
  }

}
