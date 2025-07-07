import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { NetworkSuccess } from 'projects/apppensionista/src/app/core/models/network.model';
import { CommonService } from 'projects/apppensionista/src/app/core/services/common.service';
import { UserService } from 'projects/apppensionista/src/app/core/services/user.service';
import { ModalConfComponent } from 'projects/apppensionista/src/app/shared/components/modal-conf/modal-conf.component';
import { RespuestaModel } from 'projects/apppensionista/src/app/shared/models/respuesta.model';
import { ServicioService } from 'projects/apppensionista/src/app/shared/services/servicio.service';
import { SharedConstants } from 'projects/apppensionista/src/app/shared/shared.constants';
import { ConfigRouteService } from 'src/app/shared/services/config-route.service';
import { ActualizarDatosConstants } from '../../../actualizar-datos/actualizar-datos.constants';
import { ModalConfirmarComponent } from '../../../autorizar-datos/components/modal/modal.component';
import { DepartamentosModel, DistritosModel, ProvinciasModel } from '../../../pago-domicilio/models/pago-domicilio.model';
import { DatosUsuario } from '../../models/datos.model';
import { ItemModel } from '../../models/item.model';
import { MotivosModel } from '../../models/motivos.model';
import { SolicitudService } from '../../services/solicitudes.service';
declare let $ :any; 

@Component({
  selector: 'app-otras-solicitudes',
  templateUrl: './otras-solicitudes.component.html',
  styleUrls: ['./otras-solicitudes.component.css']
})
export class OtrasSolicitudesComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable!: ElementRef;

  warning : string = "";
  model = new DatosUsuario();
  submitted: boolean = false;
  selectedFiles: File[] = [];
  ListaDepartamentos:any[]=[];
  ListaProvincias:any[]=[];
  ListaDistritos:any[]=[];
  ListaPaises:any[]=[];
  ListaPaisesResidencia:any[]=[];
  ListaMotivos:any[]=[];
  checkAutorizo: boolean = false;

  deshabilitarCorreo: boolean = false;
  deshabilitarCelular: boolean = false;
  bsModalRef: BsModalRef | null = null; 
  constructor(
    private modalService: BsModalService, 
    private spinnerService: NgxSpinnerService,
    private service:ServicioService,
    private solicitudservice:SolicitudService,
    private userService: UserService,
    private commonService: CommonService,
    private shellService: ConfigRouteService
    ) { }

  async ngOnInit(): Promise<void> {
    await this.GetDepartamento();
    await this.GetMotivos();
    await this.GetPaises();
    this.obtenerDatos();
    
    let user = this.userService.getLoggedUsers(); 
    this.model.NumeroDocumento = user.NumDoc;

    // Para reactivar la opción de casilla electrónica, de debe ELIMINAR la linea de abajo  ->  this.model.AutorizoCorreo = true;
    this.model.AutorizoCorreo = true;
  }

  save(){
    this.submitted = true;
    let zonaCobertura: any;
    if(this.validarCampos()){
      this.spinnerService.show();

      if(this.model.ResidoExtranjero){
         this.model.PaisResidencia = this.commonService.getDropDownText(this.model.CodPaisResidencia, this.ListaPaises,"Codigo")[0].Titulo;
      }else{
        this.model.Departamento=this.commonService.getDropDownText(this.model.IdDepartamento, this.ListaDepartamentos,"IdDepartamento")[0].DescripcionDepartamento;
        this.model.Provincia=this.commonService.getDropDownText(this.model.IdProvincia, this.ListaProvincias,"IdProvincia")[0].DescripcionProvincia;
        this.model.Distrito=this.commonService.getDropDownText(this.model.IdDistrito, this.ListaDistritos,"IdDistrito")[0].DescripcionDistrito;
        zonaCobertura = this.commonService.getDropDownText(this.model.IdDistrito, this.ListaDistritos,"IdDistrito")[0].ZonaCobertura;
        this.model.Ubigeo = this.model.IdDepartamento + this.model.IdProvincia + this.model.IdDistrito;
      }

      this.model.PaisNacionalidad = this.commonService.getDropDownText(this.model.CodPaisNacionalidad, this.ListaPaises,"Codigo")[0].Titulo;
      this.model.Cobertura= zonaCobertura ? "Si" : "No";
      this.model.MotivoDesc = this.commonService.getDropDownTextItem(this.model.MotivoCOD, this.ListaMotivos,"Codigo")[0].Titulo;
      console.log(this.model);
      this.solicitudservice.guardarDatos(this.model, this.selectedFiles).subscribe(
        (res: any) => {
          if(res.Codigo == CoreConstants.CodigoRespuesta.OperacionExitosa){
            this.mostrarPopupRegistro(true);
            this.limpiarSolicitud();
          }else{
            this.mostrarPopupRegistro(false, res.Message);
          }
          this.spinnerService.hide();  
        },(err:any) => {
        this.warning = `<p class='alert__info'>${err}</p>`; 
        this.spinnerService.hide();    
      });
    }
    
  }

  limpiarControl(){
    this.model.Telefono = "";
    this.model.Direccion = "";
    this.model.IdDepartamento = "";
    this.model.Departamento = "";
    this.model.Provincia = "";
    this.model.IdProvincia = "";
    this.model.Distrito = "";
    this.model.IdDistrito = "";
    this.ListaProvincias = [];
    this.ListaDistritos = [];
    this.limpiarSolicitud();
  }

  obtenerDatos(){
    this.spinnerService.show();
    this.service.obtenerDatos().subscribe(
      async (res: any) => {
        let respuesta = this.evaluarRespuesta(res);
        if (respuesta.Correcto) {
          let resp = respuesta.Result;
          this.model.Nombres = resp.Nombres;
          this.model.NombreCompleto = resp.Nombres + " " + resp.ApellidoPaterno + " " + resp.ApellidoMaterno;
          this.model.TipoDocumento = resp.DescTipoDocumento;
          this.model.Direccion = resp.Direccion != null ? resp.Direccion : "";
          this.model.Telefono = resp.TelefonoFijo != null ? resp.TelefonoFijo : "";
          this.model.Celular = resp.Celular != null ? resp.Celular : "";
          this.model.Correo = resp.Correo != null ? resp.Correo : "";

          this.model.IdDepartamento = resp.UbigeoDepartamento != null ? resp.UbigeoDepartamento : "";
          if (resp.UbigeoProvincia != null) {
            this.model.IdProvincia = resp.UbigeoProvincia;
            await this.slcDepartamentoChange(true);
          }
          if (resp.UbigeoDistrito != null) {
            this.model.IdDistrito = resp.UbigeoDistrito;
            await this.slcProvinciaChange(true);
          }

          if (this.model.Correo != null && this.model.Correo != undefined && this.model.Correo != "")
            this.deshabilitarCorreo = true;

          if (this.model.Celular != null && this.model.Celular != undefined && this.model.Celular != "")
            this.deshabilitarCelular = true;
        }
        this.spinnerService.hide();
      }, (err: any) => {
        this.warning = `<p class='alert__info'>${err}</p>`;
        this.spinnerService.hide();
      });
  }

  async GetDepartamento(){
    this.spinnerService.show();    
    await this.service.listarDepartamento().then((response : NetworkSuccess<DepartamentosModel[]>) =>{ 
      let resultado = this.evaluarRespuesta(response); 
      if(resultado != null && resultado.Result != null){
        this.ListaDepartamentos=resultado.Result;
      }
      this.spinnerService.hide();    
    });
  }

async slcDepartamentoChange(cargaInicial: boolean = false){
  if(this.model.IdDepartamento!=""){
    this.spinnerService.show();    
    await this.service.listarProvincia(this.model.IdDepartamento).then((response : NetworkSuccess<ProvinciasModel[]>) =>{ 
      let resultado = this.evaluarRespuesta(response); 
      if(resultado != null && resultado.Result != null){
        this.ListaProvincias=resultado.Result;
        this.ListaDistritos = [];
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
    await this.service.listarDistrito(this.model.IdDepartamento,this.model.IdProvincia).then((response : NetworkSuccess<DistritosModel[]>) =>{ 
      let resultado = this.evaluarRespuesta(response); 
      if(resultado != null && resultado.Result != null){
        this.ListaDistritos=resultado.Result;
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

 async GetMotivos(){
  this.spinnerService.show();    
  await this.solicitudservice.listarMotivos().then((response : NetworkSuccess<MotivosModel[]>) =>{ 
    let resultado = this.evaluarRespuesta(response); 
    if(resultado != null && resultado.Result != null){
      this.ListaMotivos=resultado.Result;
    }
    this.spinnerService.hide();    
  });
}

async GetPaises(){
  this.spinnerService.show();    
  await this.service.listarPaises().then((response : NetworkSuccess<ItemModel[]>) =>{ 
    let resultado = this.evaluarRespuesta(response); 
    if(resultado != null && resultado.Result != null){
      this.ListaPaises=resultado.Result;
      this.ListaPaisesResidencia = this.ListaPaises.filter(obj => obj.Codigo !== "PER");
    }
    this.spinnerService.hide();    
  });
}

  evaluarRespuesta(res:any){
    this.warning = "";
    let resultado = new RespuestaModel();
    if(res != null){
      if (res.IsSuccess == true) {
        switch (res.Codigo) {
            case CoreConstants.CodigoRespuesta.OperacionExitosa:
              resultado.Correcto = true;
              resultado.Result = res.Result;break;
            case CoreConstants.CodigoRespuesta.OperacionNoEjecutada: 
                this.warning = res.Message;break;
            case CoreConstants.CodigoRespuesta.ErrorNoControlado: 
                this.warning = CoreConstants.Mensajes.NoHayConexion;break;
            case CoreConstants.CodigoRespuesta.OperacionIncorrectaDatos: 
                this.warning = res.Message;break;
        }
      }else
        this.warning = res.Message;
    }else
    {
      this.warning = CoreConstants.Mensajes.NoHayConexion;
    }

    if(this.warning.length > 0){
      this.scrollTop();
    }
    return resultado;
  }

  validarCampos(){
    this.warning = "";
    let valido: boolean = true;
    if(this.model.CodPaisNacionalidad == ""){
      this.warning = ActualizarDatosConstants.mensajesValidacion.msgNacionalidad;
    }
    if(this.model.Celular == ""){
      this.warning = ActualizarDatosConstants.mensajesValidacion.msgCelular;
    }
    if(this.model.Correo == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgCorreo;
    }

    if(this.model.Direccion == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgDireccion;
    }
    if(this.model.ResidoExtranjero){
      if(this.model.CodPaisResidencia == ""){
        this.warning += ActualizarDatosConstants.mensajesValidacion.msgResidencia;
      }
    }else{
      if(this.model.IdDepartamento == ""){
        this.warning += ActualizarDatosConstants.mensajesValidacion.msgDepartamento;
      }
      if(this.model.IdProvincia == ""){
        this.warning += ActualizarDatosConstants.mensajesValidacion.msgProvincia;
      }
      if(this.model.IdDistrito == ""){
        this.warning += ActualizarDatosConstants.mensajesValidacion.msgDistrito;
      }
    }

    if(this.model.MotivoCOD == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgMotivo;
    }
    if(this.model.DetalleSolicitud == ""){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgDescripcion;
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

  mostrarPopupRegistro(exito: boolean, mensaje: string = ""){
    this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
          (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
            this.bsModalRef!.hide();
          }); 
    if(exito){
      this.bsModalRef.content.titulo = "Operación exitosa";
      this.bsModalRef.content.body = SharedConstants.Alerta.msgRegistroSolicitud;
    }else{
      this.bsModalRef.content.icon = "~/../assets/images/icon-alert.svg";
      this.bsModalRef.content.titulo = "Error";
      this.bsModalRef.content.body = mensaje;
    }
  }

  limpiarSolicitud(){
    this.model.DetalleSolicitud = "";
    this.model.MotivoCOD = "";
    this.model.MotivoDesc = "";
    this.model.isDeclarionJurada = false;
    this.model.FacilitacionADM = false;
    this.submitted = false;
    this.warning = "";
    this.selectedFiles = [];
    this.model.AutorizoCasilla = false;

    // Para Desactivar la opcion de solicitar notificación de la solicitud a través de casilla
    // se pone this.model.AutorizoCorreo en true, para activarla se pone en false.
    this.model.AutorizoCorreo = true;
    this.checkAutorizo = false;
    this.myInputVariable.nativeElement.value = "";
    this.model.Ubigeo = "";
  }

  chooseFile(event: Event) {
    this.selectedFiles = [];
    let files = (event.target as HTMLInputElement).files;
    const fileSize = files![0].size / 1024 / 1024; // in MiB
    if (fileSize > 5) {
        this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
              (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
                this.bsModalRef!.hide();
                if (result) {
                  console.log('addModalProcessClick');
                  console.log(result);
                }
              }); 
        this.bsModalRef.content.titulo = "Alerta";
        this.bsModalRef.content.body = SharedConstants.Alerta.msgAlertaArchivo;
        this.myInputVariable.nativeElement.value = "";
    } else {
      //se agrega validación de cantidad de caracteres a 54 incluyendo .pdf
      if(files![0].name.length > 54){
        this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
                (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
                  this.bsModalRef!.hide();
                }); 
          this.bsModalRef.content.titulo = "Alerta";
          this.bsModalRef.content.body = SharedConstants.Alerta.msgAlertaNombreArchivo;
          this.myInputVariable.nativeElement.value = "";
      }else{
        this.selectedFiles.push(files![0]);
      }
    }
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
  
  scrollTop(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  irActualizarDatos(){
    let url = "";
    let user = this.userService.getLoggedUsers();
    if(user.TypeUser == SharedConstants.Perfiles.Aportante || user.TypeUser == SharedConstants.Perfiles.Aportante2022){
      url  = SharedConstants.rutasActualizarDatos.aportante;
      $("#div34").removeClass("activa");
      $("#div27").addClass("activa");
    }
    else{
      url  = SharedConstants.rutasActualizarDatos.pensionista;  
      $("#div14").removeClass("activa");
      $("#div26").addClass("activa");
    }
    this.shellService.navigate(url);
  }

  onCheckboxDireccionChange($event: any){
    if ($event.target.checked) { 
      this.model.ResidoExtranjero=true;
    }else{
      this.model.ResidoExtranjero=false;
      this.model.PaisResidencia = "";
      this.model.CodPaisResidencia = "";
    }
  }
}
