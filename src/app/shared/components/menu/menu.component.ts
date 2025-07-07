import { UserService } from 'src/app/core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { MenuModel, MenuPrincipalModel } from '../../models/menu.model';
import { ConfigRouteService } from '../../services/config-route.service';
import { CoreConstants } from 'src/app/core/data/core-constants';
import { AuthService } from '../../services/auth.service';
import { ModalInformativoAportesComponent } from '../modal/modal-informativo-aportes/modal-informativo-aportes.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare let $ :any;
declare function gtag(obs:any,obs2:any,obs3:any):any;

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Input("listaMenu") ListaMenuPrincipal: MenuPrincipalModel[] | [] = [];
  navigationId: string | null = "";
  constructor(
    private shellService: ConfigRouteService,
    private userService: UserService,
    private authService: AuthService,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.navigationId = this.userService.getNavigationId();
    if (this.navigationId != null && this.navigationId != "") {
      $(".side__item ul li a").removeClass("activa");
      $("#div" + this.navigationId).addClass("activa");
      $("#divmovil" + this.navigationId).addClass("activa");
    }
  }
  navigate(url: string, id: string) {
    console.log(url);
    console.log(id);
    if (id === "33") {
      this.visualizaModalAportes(url, id);
      //this.openModalInformativo();
    } else {
      this.shellService.navigate(url);
      this.userService.setRutaDefault(url);
      $(".side__item ul li a").removeClass("activa");
      $("#div" + id).addClass("activa");
      $("#divmovil" + id).addClass("activa");
      this.userService.setNavigationId(id);
      gtag("config", "UA-213690165-1", { page_path: url });
      this.validateAcceso(url);
      console.log("cambiar icono");
      console.log($("#itemCasillaMovil"));
      $("#itemCasillaMovil").attr(
        "src",
        "~/../assets/images/header/ONP_icono_sobre_blanco.png"
      );
    }
  }
  MostrarOpciones(id: string) {
    console.log(id);
    $(".grup-menu").removeClass("displays");
    $("#" + id).addClass("displays");
  }
  validateAcceso(url: string) {
    let token = this.userService.getToken();
    this.authService.validateAccess(url, token).subscribe((res: any) => {
      if (res.Codigo != CoreConstants.CodigoRespuesta.OperacionExitosa) {
        console.log(res.Message + " " + url);
        console.log("URL NO VALIDO ");
      } else {
        console.log(res.Message);
        console.log("URL VALIDO ");
      }
    });
  }

  visualizaModalAportes(url: string, id: string) {
    const modalRef: BsModalRef = this.modalService.show(
      ModalInformativoAportesComponent,
      { class: "modal-lg" }
    );

    modalRef.content.funcionLlamada.subscribe(() => {
      this.shellService.navigate(url);
      this.userService.setRutaDefault(url);
      $(".side__item ul li a").removeClass("activa");
      $("#div" + id).addClass("activa");
      $("#divmovil" + id).addClass("activa");
      this.userService.setNavigationId(id);
      gtag("config", "UA-213690165-1", { page_path: url });
      this.validateAcceso(url);

      console.log("entro a validar");
    });
  }
}
