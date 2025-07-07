import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './core/guards/auth.guard';
import { UserService } from './core/services/auth.service';
import { MenuModel, MenuPrincipalModel } from './shared/models/menu.model';
import { ClientConfigs, ShellConfig } from './shared/services/config';
import { ConfigRouteService } from './shared/services/config-route.service';
import { MenuService } from './shared/services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from './core/data/usuario.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from './core/data/core-constants';
import { SharedConstants } from './shared/shared.constants';
declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ListaMenu: MenuPrincipalModel[] | [] = [];
  NombreUsuario: string = '';
  titleSpinner = 'Validando información...';
  validation: boolean = false;
  user = new Usuario();
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private shellService: ConfigRouteService,
    private userService: UserService,
    private auth: AuthGuard,
    private serviceMenu: MenuService,
    private spinnerService: NgxSpinnerService,) {
  }

  ngOnInit() {
    this.spinnerService.show();
    const token: string = this.urlvalidateToken();
    if (!this.auth.canActivateValidate()) {
      if (token == '/') {
        this.validation = true;
        this.userService.authlogon();
      }
      else {
        this.validation = false;
        if(this.user != undefined && this.user != null){
          if(this.user.TypeUser == SharedConstants.Perfiles.Ciudadano || this.user.TypeUser == SharedConstants.Perfiles.Representante){
            this.setAplicationPerfil();
            this.spinnerService.hide();
          }else{
            this.listaMenu();
          }
        }
      }
    }
    else {
      this.listaMenu();
    }
  }

  // @HostListener('window:beforeunload')
  // onUnload() {
  //   this.userService.setLogOut();
  //   // return false;
  // }

  listaMenu() {
    try {
      this.validation = true;
      this.serviceMenu.ListaMenu().subscribe(

        (res: any) => {

          if (res.Codigo == CoreConstants.CodigoRespuesta.OperacionExitosa) {
            this.ListaMenu = res.Result;
            this.spinnerService.hide();
            this.validation = false;
            this.setAplicationPerfil();
          }
          else {
            if (res.Message != null && res.Message != "")
              this.titleSpinner = res.Message;
            setTimeout(() => { this.userService.authlogon(); }, 10000);
          }
        });
    } catch (e) {
      this.validation = true;
      this.userService.authlogon();
    }
  }

  setLoggedUser() {
    try {
      this.user = this.userService.getLoggedUsers();
      this.NombreUsuario = this.user.Name!;
      //this.setAplicationPerfil();
    } catch (e) { }
  }

  setAplicationPerfil() {
    const random = () => {
      return Math.floor(Math.random() * (90000000000000)) + 59366123221269342244000;
    }
    try {
      const user = this.userService.getLoggedUsers();
      this.NombreUsuario = user.Name!;
      this.NombreUsuario = user.Name!;
      const components = atob(user.CodeComp);
      const objComponet = JSON.parse(components);
      /*const objComponet = [
        {
          MicroElemento: "app-reporte-ficha",
          MicroUrl:
            "http://aseguramientoqa.onp.gob.pe/assets/mife/onp-mife-reprote-ficha.js?v=",
          MicroRouter: "/ficha-reporte",
          MicroRouterDefault: "/",
          Componente: "03b115e3-8542-493b-9697-83f6f762b9b9"
        },
        {
          MicroElemento: "app-casilla-electronica",
          MicroUrl:
            "http://aseguramientoqa.onp.gob.pe/assets/mife/onp-mife-mcasillaelectronica.js?v=",
          MicroRouter: "/buzon",
          MicroRouterDefault: "/",
          Componente: "1229E589-FC45-428F-B742-08079F79BF6C"
        },
        {
          MicroElemento: "app-aportes-calcular",
          MicroUrl: "/assets/micro-frontends/onp-mife-maportescalcular-2.js?v=",
          MicroRouter: "/aportes-calcular",
          MicroRouterDefault: "/",
          Componente: "eeaac86b-6958-4a38-b218-434ef9ec1e45"
        },
        {
          MicroElemento: "app-aportante",
          MicroUrl: "/assets/micro-frontends/appaportante/master.js?v=",
          MicroRouter: "/aportante",
          MicroRouterDefault: "/ver-aportes",
          Componente: "0BC604AA-B234-47B0-90EB-225A34D3702F"
        }
      ];*/


      let rutamicrofrontend: ClientConfigs = {};
      let rutadefault = "";
      if (objComponet != null) {
        objComponet.forEach((element: any) => {
          let componet: { loaded: boolean, src: string, element: string, route: string } = {
            loaded: false,
            src: element.MicroUrl + random(),
            route: element.MicroRouter,
            element: element.MicroElemento
          };
          rutamicrofrontend[element.MicroElemento.replace('app-', '')] = componet;
          if (element.MicroRouterDefault != "/") {
            rutadefault = element.MicroRouter + element.MicroRouterDefault;
            this.userService.setRutaDefault(rutadefault);
          }
        });
      }

      let menu: ShellConfig = {
        initialRoute: rutadefault,
        outletId: 'content',
        preload: true,
        clients: rutamicrofrontend
      };
      this.shellService.init(menu);
      //window.location.reload();
      //$("#content").load();

    } catch (e) { }


  }

  urlvalidateToken() {
    let token: string = "";
    const parsed = window.location.href;
    const host = window.location.origin;
    const parameter = parsed.replace(host, "");
    token = parameter.replace(CoreConstants.LocalStorage.UrlValidateToken, "");
    if(parameter.includes(CoreConstants.LocalStorage.UrlValidateToken) && token != '/'){
      this.userService.setToken(token);
      this.setLoggedUser();
      // console.log("cambio de token", token);
    }
    return token;
  }
  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

}
