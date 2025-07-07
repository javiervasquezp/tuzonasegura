import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { NetworkSuccess } from 'projects/apppensionista/src/app/core/models/network.model'; 
import { CommonService } from 'projects/apppensionista/src/app/core/services/common.service';
import { UserService } from 'projects/apppensionista/src/app/core/services/user.service';
import { ModalConfComponent } from 'projects/apppensionista/src/app/shared/components/modal-conf/modal-conf.component';
import { SharedConstants } from 'projects/apppensionista/src/app/shared/shared.constants';
import { ConfigRouteService } from 'src/app/shared/services/config-route.service';
import { ActualizarDatosConstants } from '../../../actualizar-datos/actualizar-datos.constants';
import { ModalConfirmarComponent } from '../../../autorizar-datos/components/modal/modal.component';
import { ItemModel } from '../../../solicitudes/models/item.model';
import { DistritosModel, PagoDomicilioModel, ProvinciasModel, UsuarioDatos } from '../../models/pago-domicilio.model';
import { PagoDomicilioService } from '../../services/pago-domicilio.service';
import { ModalTerminarComponent } from '../modal-terminar/modal-terminar.component';
declare let $ :any; 
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isActivate : boolean = false;
  warning : string = "";
  datosPensionista:any;
  ListaDepartamentos:any[]=[];
  ListaProvincias:any[]=[];
  ListaDistritos:any[]=[];
  ListaDepartamentosDP:any[]=[];
  ListaProvinciasDP:any[]=[];
  ListaDistritosDP:any[]=[];
  MensajeParrafoSharepoint:string = "";
  MensajeCorreoEnviado:string = "";
  nombreCompleto :string ='';
  numeroDocumento : string ='';
  tipoDocumento : string ='';
  checkAutorizo: boolean = false;
  ListaPaises:any[]=[];
model : UsuarioDatos = new UsuarioDatos();
isDisabledVariable:boolean = false;
isDisabledLugarPago:boolean = true;
deshabilitarCorreo: boolean = false;
deshabilitarCelular: boolean = false;
deshabilitarTelefijo: boolean = false;
error:string ="";
//pagoForm: FormGroup;
submitted = false;
bsModalRef: BsModalRef | null = null; 

@ViewChild(ModalTerminarComponent) child!: ModalTerminarComponent;
  constructor(private pagoDomicilioService:PagoDomicilioService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private modalService: BsModalService,
    private commonService: CommonService,
    private frmBuilder: FormBuilder,
    private shellService: ConfigRouteService) { 
      /*this.pagoForm = this.frmBuilder.group({
        departamento: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
        distrito: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        referencia: ['', [Validators.required]]
      });*/
    }

  async ngOnInit(): Promise<void> {
    await this.GetPaises();
    this.verDatos();
  }

  verDatos(){
    this.spinnerService.show();    
    this.pagoDomicilioService.verDatos().then((response : NetworkSuccess<PagoDomicilioModel>) =>{ 
      let resultado = this.evaluarRespuesta(response) as NetworkSuccess<PagoDomicilioModel>; 

      if(resultado != null && resultado.Result != null && resultado.Result.DatosPensionista != null){
        this.datosPensionista=resultado.Result.DatosPensionista.Usuario;
        var depart = this.datosPensionista.Departamento;
        this.datosPensionista.Departamento = depart + "0000";
        this.datosPensionista.Provincia = depart + this.datosPensionista.Provincia + "00";
         
        let user = this.userService.getLoggedUsers(); 
        this.nombreCompleto=user.FullName??'';
        this.numeroDocumento=user.NumDoc??'';
        this.tipoDocumento=user.TypeDocDesc??''; 

        this.ListaDepartamentos=resultado.Result.DatosUbigeos.Departamentos;  
        this.ListaProvincias=resultado.Result.DatosUbigeos.Provincias;  
        this.ListaDistritos=resultado.Result.DatosUbigeos.Distritos;  
        
        this.ListaDepartamentosDP=resultado.Result.DatosDepartamentosPD.Departamentos;  
        this.ListaProvinciasDP=resultado.Result.DatosProvinciasPD.Provincias;  
        this.ListaDistritosDP=resultado.Result.DatosDistritosPD.Distritos;  
        
        this.MensajeParrafoSharepoint=resultado.Result.MensajeParrafoSharepoint;        
       if( (this.datosPensionista.Direccion != null && this.datosPensionista.Direccion != "" ) 
       &&  (this.datosPensionista.Distrito != null && this.datosPensionista.Distrito != "" )
       &&  (this.datosPensionista.Provincia != null && this.datosPensionista.Provincia != "" )
       &&  (this.datosPensionista.Departamento != null && this.datosPensionista.Departamento != "" ) )
       { 
        this.isDisabledLugarPago=false;
       }
       
        if (this.datosPensionista.Correo != null && this.datosPensionista.Correo != undefined && this.datosPensionista.Correo != "")
            this.deshabilitarCorreo = true;

        if (this.datosPensionista.Celular != null && this.datosPensionista.Celular != undefined && this.datosPensionista.Celular != "")
            this.deshabilitarCelular = true;
        
        if (this.datosPensionista.Telefono != null && this.datosPensionista.Telefono != undefined && this.datosPensionista.Telefono != "")
            this.deshabilitarTelefijo = true;
      } 
      this.spinnerService.hide();    
    });
  }
 
  evaluarRespuesta(res:any){
    if (res.IsSuccess == true) {
      switch (res.Codigo) {
          case CoreConstants.CodigoRespuesta.OperacionExitosa: 
            return res;
          case CoreConstants.CodigoRespuesta.OperacionNoEjecutada: 
              this.warning = res.Message;break;
          case CoreConstants.CodigoRespuesta.ErrorNoControlado: 
              this.warning = CoreConstants.Mensajes.NoHayConexion;break;
          case CoreConstants.CodigoRespuesta.OperacionIncorrectaDatos: 
              this.warning = res.Message;break;
          case CoreConstants.CodigoRespuesta.NoAutorizado: 
              this.warning = CoreConstants.Mensajes.NoAutorizado;break;
          case CoreConstants.CodigoRespuesta.CambioClave: 
              this.warning = res.Message;break;
      }
    }else{
        this.warning = res.Message;
    }

    if(this.warning.length > 0){
      this.scrollTop();
    }
  }
  
  async slcDepartamentoChange(cargaInicial: boolean = false){
    if(this.model.IdDepartamento!=""){
      this.spinnerService.show();    
      await this.pagoDomicilioService.listarProvincia(this.model.IdDepartamento).then((response : NetworkSuccess<ProvinciasModel[]>) =>{ 
        let resultado = this.evaluarRespuesta(response) as NetworkSuccess<ProvinciasModel[]>; 
        if(resultado != null && resultado.Result != null){
          this.ListaProvinciasDP=resultado.Result;
          if(!cargaInicial){
            this.model.IdProvincia="";
            this.model.IdDistrito="";
          }
        } else{
          this.model.IdProvincia="";
          this.model.IdDistrito="";
        }
        this.spinnerService.hide();    
      });
    }
  }  

  async slcProvinciaChange(cargaInicial: boolean = false){
    if(this.model.IdDepartamento!="" && this.model.IdProvincia !=""){
      this.spinnerService.show();    
      await this.pagoDomicilioService.listarDistrito(this.model.IdDepartamento,this.model.IdProvincia).then((response : NetworkSuccess<DistritosModel[]>) =>{ 
        let resultado = this.evaluarRespuesta(response) as NetworkSuccess<DistritosModel[]>; 
        if(resultado != null && resultado.Result != null){
          this.ListaDistritosDP=resultado.Result;
          if(!cargaInicial){
            this.model.IdDistrito="";
          }
        } else{          
          this.model.IdDistrito="";
        }
        this.spinnerService.hide();    
      });
    }
  }
  onCheckboxChange(e:any) {     
    if (e.target.checked) {
       this.isActivate=true;
    } else {
      this.isActivate=false;
    }
  }
  async onCheckboxDireccionChange(e:any) {     
    if (e.target.checked) { 
      this.isDisabledVariable=true;
      this.model.Direccion=this.datosPensionista.Direccion; 
      this.model.Referencia = this.datosPensionista.Referencia;
      if(this.datosPensionista.Departamento!=null){
        this.model.IdDepartamento =this.datosPensionista.Departamento.substring(0,2);
        await this.slcDepartamentoChange(true);
        if(this.datosPensionista.Provincia!=null){
          this.model.IdProvincia =this.datosPensionista.Provincia.substring(2,4);
          await this.slcProvinciaChange(true);
          this.model.IdDistrito =this.datosPensionista.Distrito; 
        }         
      }      
    } else {
     this.limpiarControl();
    }
  }
  limpiarControl(){
    this.isDisabledVariable=false;
    this.model.IdDepartamento ='';
    this.model.IdProvincia ='';
    this.model.IdDistrito ='';
    this.model.Direccion='';
    this.ListaProvinciasDP=[];
    this.ListaDistritosDP=[];
    this.submitted=false; 
    this.model.Referencia='';
    this.model.AutorizoCasilla = false;
    this.model.AutorizoCorreo = false;
    this.checkAutorizo = false;
  }
  save(){
    this.submitted=true;
    this.model.submitted==true
    //console.log(this.pagoForm);
    if(this.validarCampos())
    {
      this.spinnerService.show();         
      this.model.Departamento=this.commonService.getDropDownText(this.model.IdDepartamento, this.ListaDepartamentosDP,"IdDepartamento")[0].DescripcionDepartamento;
      this.model.Provincia=this.commonService.getDropDownText(this.model.IdProvincia, this.ListaProvinciasDP,"IdProvincia")[0].DescripcionProvincia;
      this.model.Distrito=this.commonService.getDropDownText(this.model.IdDistrito, this.ListaDistritosDP,"IdDistrito")[0].DescripcionDistrito;
      this.model.ZonaCobertura=this.commonService.getDropDownText(this.model.IdDistrito, this.ListaDistritosDP,"IdDistrito")[0].ZonaCobertura;
      this.model.PaisNacionalidad = this.commonService.getDropDownText(this.model.CodPaisNacionalidad, this.ListaPaises,"Codigo")[0].Titulo;
      this.model.Ubigeo = this.model.IdDepartamento + this.model.IdProvincia + this.model.IdDistrito;
      this.model.Correo=this.datosPensionista.Correo;
      this.model.Celular=this.datosPensionista.Celular;
      this.model.Telefono = this.datosPensionista.Telefono;
      this.model.Nombre=this.nombreCompleto;
      this.model.TipoDocumento=this.tipoDocumento;
      this.model.NumeroDocumento=this.numeroDocumento;   
      this.pagoDomicilioService.registrar(this.model).then((response : NetworkSuccess<string>) =>{ 
        console.log(response);
        if(response.IsSuccess && response.Codigo == CoreConstants.CodigoRespuesta.OperacionExitosa){
          this.bsModalRef = this.modalService.show(ModalTerminarComponent, {class: 'modal-lg'});
          (<ModalTerminarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
            this.bsModalRef!.hide();
          }); 
          this.bsModalRef.content.body = response.Message; 
        }else{
          this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
          (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
              this.bsModalRef!.hide();
          });
          this.bsModalRef.content.titulo = "Error"; 
          this.bsModalRef.content.body = response.Message; 
          this.bsModalRef.content.icon = "~/../assets/images/icon-alert.svg";
        }  
        this.spinnerService.hide();    
      });
    }
  }
  
  validarCampos(){
    this.warning = "";
    let valido: boolean = true;
    if(this.model.CodPaisNacionalidad == ""){
      this.warning = ActualizarDatosConstants.mensajesValidacion.msgNacionalidad;
    }
    if(this.datosPensionista.Celular == ""){
      this.warning = ActualizarDatosConstants.mensajesValidacion.msgCelular;
    }
    if(this.datosPensionista.Correo == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgCorreo;
    }
    if(this.model.Direccion == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgDireccion;
    }
    if(this.model.IdDepartamento == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgDepartamento;
    }
    if(this.model.IdProvincia == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgProvincia;
    }
    if(this.model.IdDistrito == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgDistrito;
    }
    if(this.model.Referencia == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgReferencia;
    }
    if(!this.model.AutorizoCorreo && !this.model.AutorizoCasilla){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgTipoNotificacion;
    }

    if(this.warning.length > 0){
      this.warning = SharedConstants.Alerta.msgEncabezadoAlertaSol + this.warning;
      valido = false;
      this.scrollTop();
    }
    return valido;
  }

  alertaCasillaE(event: any){
    this.bsModalRef = this.modalService.show(ModalConfComponent, {class: 'modal-lg'});
          (<ModalConfComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
            this.bsModalRef!.hide();
            if (result == true) {
              this.checkAutorizo = true;
              this.model.AutorizoCasilla = true;
              this.model.AutorizoCorreo = false;
            }else{
              this.model.AutorizoCasilla = false;
              this.model.AutorizoCorreo = true;
            }
          }); 

    this.bsModalRef.content.body = SharedConstants.Alerta.msgAlertaCasilla;
    this.bsModalRef.content.btnNameSi = "Autorizo";
    this.bsModalRef.content.btnNameNo = "No autorizo";
  }

  onItemChangeCasilla(event: any){
      this.alertaCasillaE(event);
  }

  irActualizarDatos(){
    let url = "";
    let user = this.userService.getLoggedUsers();
    if(user.TypeUser == SharedConstants.Perfiles.Aportante || user.TypeUser == SharedConstants.Perfiles.Aportante2022)
      url  = SharedConstants.rutasActualizarDatos.aportante;
    else
      url  = SharedConstants.rutasActualizarDatos.pensionista;  

    this.shellService.navigate(url);
    $("#div20").removeClass("activa");
    $("#div26").addClass("activa");
  }

  scrollTop(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  async GetPaises(){
    this.spinnerService.show();    
    await this.pagoDomicilioService.listarPaises().then((response : NetworkSuccess<ItemModel[]>) =>{ 
      let resultado = this.evaluarRespuesta(response); 
      if(resultado != null && resultado.Result != null){
        this.ListaPaises=resultado.Result;
      }
      this.spinnerService.hide();    
    });
  }
}
