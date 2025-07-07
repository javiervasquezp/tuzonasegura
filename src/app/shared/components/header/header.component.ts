import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/auth.service';
import { MenuModel, MenuPrincipalModel } from '../../models/menu.model';
import { ConfigRouteService } from '../../services/config-route.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { CoreConstants } from 'src/app/core/data/core-constants';
import { SharedConstants } from '../../shared.constants';
import { Usuario } from 'src/app/core/data/usuario.model';
import { environment } from 'src/environments/environment';
declare let $: any;
declare function gtag(obs: any, obs2: any, obs3: any): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('listaMenu') ListaMenuPrincipal: MenuPrincipalModel[] | [] = [];
  @Input('nombreUsuario') NombreUsuario: string | null = null;
  bsModalRef: BsModalRef | null = null;
  navigationId: string | null = "";
  soloVerCasilla: boolean = false;
  user = new Usuario();
  sharedConstants: any = SharedConstants;
  env = environment;
  constructor(private shellService: ConfigRouteService,
    private modalService: BsModalService,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.navigationId = this.userService.getNavigationId();
    if (this.navigationId != null && this.navigationId != "") {
      $(".side__item ul li a").removeClass("activa");
      $("#div" + this.navigationId).addClass("activa");
      $("#divmovil" + this.navigationId).addClass("activa");
    }

    this.user = this.userService.getLoggedUsers();
    console.log(this.user);
    if (this.user.TypeUser == SharedConstants.Perfiles.Ciudadano || this.user.TypeUser == SharedConstants.Perfiles.Representante) {
      this.soloVerCasilla = true;
      this.mostrarBandeja();
    }
  }
  navigate(url: string, id: string) {
    this.shellService.navigate(url);
    $('.btn-menu').click();
    $(".side__item ul li a").removeClass("activa");
    $("#div" + id).addClass("activa");
    $("#divmovil" + id).addClass("activa");
    this.userService.setNavigationId(id);
    gtag('config', 'UA-213690165-1', { 'page_path': url });
    this.validateAcceso(url);
  }

  MostrarOpciones(id: string) {
    $(".grup-menu").removeClass("displays");
    $("#" + id).addClass("displays");
  }

  addModalProcessClick(): void {
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'modal-lg' });
    (<ModalComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
      if (result) {
        // this.ngOnChanges();
        //console.log('addModalProcessClick');
      }
      this.bsModalRef!.hide();
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  validateAcceso(url: string) {
    let token = this.userService.getToken();
    this.authService.validateAccess(url, token).subscribe((res: any) => {
      if (res.Codigo != CoreConstants.CodigoRespuesta.OperacionExitosa) {
        console.log(res.Message + " " + url);
        console.log('URL NO VALIDO ');
      }
      else {
        console.log(res.Message);
        console.log('URL VALIDO ');
      }
    });
  }

  verCasilla() {
    let url = '/buzon/casilla-electronica';
    this.shellService.navigate(url);
    this.validateAcceso(url);
    let elemento: any = document.getElementById('main_menu');
    elemento.style.visibility = "hidden";

    if (document.getElementById("content")?.className != null) {
      let content: any = document.getElementById('content');
      content.classList.remove('main2');
      content.classList.add('main');
    }
  }

  verFichaAsegurado(isFromMovil : boolean) {
    //console.log('Ver ficha del asegurado');
    let url = this.env.urlFichaAsegurado;

    this.validateAcceso(url);

    if(!isFromMovil){
      console.log('FROM DESKTOP');
      $("#itemFichaAsegurado").attr(
        "href",
        url
      );
  
      $("#itemFichaAsegurado").click();
    }
    else{
      console.log('FROM MOVIL');
      $("#aFichaAseguradoMovil").attr(
        "href",
        url
      );
  
      $("#aFichaAseguradoMovil").click();      
    }
  }

  //nuevos ajustes para casilla electronica
  mostrarBandeja() {
    $("#itemOperaciones").removeClass("header-activa");
    $("#itemCasilla").addClass("header-activa");
    $("#itemFichaAsegurado").removeClass("header-activa");

    $("#itemFichaAsegurado img").attr("src", "/../assets/images/header/ONP_icono_ficha_apgado.png");

    $("#itemOperaciones img").attr("src", "/../assets/images/header/ONP_Icono__mis_operaciones_apagado.png");
    $("#itemCasilla img").attr("src", "/../assets/images/header/ONP_Icono_casilla_electronica_encendido.png");
    $("#itemCasillaMovil").attr("src", "/../assets/images/header/ONP_icono_sobre_amarillo.png");
    this.verCasilla();
    //  let nombre: any  = document.getElementById('nombre_header');
    //  nombre.style.display = "none"; 
  }

  //nuevos ajustes para casilla electronica
  mostrarFichaAsegurado() {

    this.verFichaAsegurado(false);

  }


  mostarBandejaMovil() {
    $("#itemCasillaMovil").attr("src", "/../assets/images/header/ONP_icono_sobre_amarillo.png");
    $("#itemFichaAseguradoMovil").attr("src", "/../assets/images/header/ONP_icono_ficha_apgado.png");
    this.verCasilla();
  }

  mostrarFichaAseguradoMovil() {

    this.verFichaAsegurado(true);
  }

  mostrarOperaciones() {
    $("#itemOperaciones").addClass("header-activa");
    $("#itemCasilla").removeClass("header-activa");
    $("#itemFichaAsegurado").removeClass("header-activa");

    $("#itemFichaAsegurado img").attr("src", "/../assets/images/header/ONP_icono_ficha_apgado.png");
    $("#itemOperaciones img").attr("src", "~/../assets/images/header/ONP_Icono__mis_operaciones_encendido.png");
    $("#itemCasilla img").attr("src", "~/../assets/images/header/ONP_Icono_casilla_electronica_apagado.png");
    $("#itemCasillaMovil").attr("src", "~/../assets/images/header/ONP_icono_sobre_blanco.png");

    let url = this.userService.getRutaDefault();
    if (url != null && url != "") {
      this.shellService.navigate(url);
      this.validateAcceso(url);
    }

    let elemento: any = document.getElementById('main_menu');
    elemento.style.visibility = "visible";

    let menu: any = document.getElementById('content');
    menu.removeAttribute("style");

    // let nombre: any  = document.getElementById('nombre_header');
    // nombre.style.display = "block"; 

    if (document.getElementById("content")?.className != null) {
      let content: any = document.getElementById('content');
      content.classList.remove('main');
      content.classList.add('main2');
    }
  }
}
