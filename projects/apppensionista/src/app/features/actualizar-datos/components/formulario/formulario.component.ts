import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { Usuario } from 'projects/apppensionista/src/app/core/data/usuario.model';
import { UserService } from 'projects/apppensionista/src/app/core/services/user.service';
import { RespuestaModel } from 'projects/apppensionista/src/app/shared/models/respuesta.model';
import { SharedConstants } from 'projects/apppensionista/src/app/shared/shared.constants';
import { UtilitarioService } from 'projects/apppensionista/src/app/shared/utilitario.service';
import { ModalConfirmarComponent } from '../../../autorizar-datos/components/modal/modal.component';
import { DepartamentosModel, DistritosModel, ProvinciasModel } from '../../../pago-domicilio/models/pago-domicilio.model';
import { PagoDomicilioService } from '../../../pago-domicilio/services/pago-domicilio.service';
import { NetworkSuccess } from '../../../ver-datos/models/network.model';
import { ActualizarDatosConstants } from '../../actualizar-datos.constants';
import { FormularioModel } from '../../models/formulario.model';
import { ActualizarDatosService } from '../../services/actualizar-datos.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  bsModalRef: BsModalRef | null = null;
  warning : string = "";
  isActivate : boolean = true;
  model = new FormularioModel();
  usuarioLogueado = new Usuario();

  sharedconstants: any = SharedConstants;
  emailValid: boolean = false;
  ListaDepartamentos:any[]=[];
  ListaProvincias:any[]=[];
  ListaDistritos:any[]=[];
  constructor(public utilitario: UtilitarioService, private modalService: BsModalService, private spinnerService: NgxSpinnerService,
    private actualizarService: ActualizarDatosService,
    private userService: UserService,
    private pagoDomicilioService:PagoDomicilioService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.userService.getLoggedUsers(); 
    this.obtenerDatos();
    this.GetDepartamento();
  }

  cancelar(){
    console.log("cancelar");
    this.obtenerDatos();
  }

  obtenerDatos(){
    this.spinnerService.show();
    this.actualizarService.obtenerDatos().subscribe(
      (res: any) => {
        let respuesta = this.evaluarRespuesta(res);
        if(respuesta.Correcto){
          this.model = respuesta.Result;
          if(this.model.EsAntiguo){
            if(this.model.UbigeoProvincia != null){
              this.slcDepartamentoChange();
            }
            if(this.model.UbigeoDistrito != null){
              this.slcProvinciaChange();
            }
          }
        }
        this.spinnerService.hide();  
      },(err:any) => {
      this.warning = `<p class='alert__info'>${err}</p>`; 
      this.spinnerService.hide();    
    });
  }

  guardarDatos(){
    console.log(this.model);
    this.spinnerService.show();
    this.model.CodCelularPais = "PE";
    this.actualizarService.guardarDatos(this.model).subscribe(
      (res: any) => {
        let respuesta = this.evaluarRespuesta(res);
        if(respuesta.Correcto){
          this.abrirExitoModal();
        }
        this.spinnerService.hide();  
      },(err:any) => {
      this.warning = `<p class='alert__info'>${err}</p>`; 
      this.spinnerService.hide();    
    });
  }

  save(){
    if(this.validarCampos()){
      this.guardarDatos();
    }
  }

  validarCampos(){
    this.warning = "";
    let valido: boolean = true;
    this.emailValid = this.utilitario.emailValidator(this.model.Correo);
    let validarDir = this.utilitario.validarDireccion(this.model.Direccion);
    let validarCel = this.utilitario.validarCelular(this.model.Celular);
    let validarFijo = this.utilitario.validarFijo(this.model.TelefonoFijo);

    if(this.model.Celular.length == 0)
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgCelular;
    else if(!validarCel)
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgCelularInvalido;

    if(this.model.Correo.length == 0)
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgCorreo;
    else if( !this.emailValid){
      this.warning += ActualizarDatosConstants.mensajesValidacion.msgCorreoValido;
    }

    // if(this.model.Telefono.length > 0){
    //     if(!validarFijo){
    //       this.warning += AuctualizarDatosConstants.mensajesValidacion.msgFijoInvalido;
    //     }
    // }
    // if(this.model.Direccion.length == 0)
    //     this.warning += AuctualizarDatosConstants.mensajesValidacion.msgDireccion;

    if(this.warning.length > 0){
      this.warning = SharedConstants.Alerta.msgEncabezadoAlerta + this.warning;
      valido = false;
    }

    return valido;
  }

  abrirExitoModal(){
    this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
    (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
      if (result) {
       console.log('addModalProcessClick');
      }
      this.bsModalRef!.hide();
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.titulo = "Operación exitosa";
    this.bsModalRef.content.body = "<p class='title'>Se registró con éxito.</p>";
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
      this.warning = CoreConstants.Mensajes.NoHayConexion;
    
    return resultado;
  }
  
  async GetDepartamento(){
      this.spinnerService.show();    
      await this.pagoDomicilioService.listarDepartamento().then((response : NetworkSuccess<DepartamentosModel[]>) =>{ 
        let resultado = this.evaluarRespuesta(response); 
        if(resultado != null && resultado.Result != null && resultado.Result != null){
          this.ListaDepartamentos=resultado.Result;
        }
        this.spinnerService.hide();    
      });
  }
  
  async slcDepartamentoChange(){
    if(this.model.UbigeoDepartamento!=""){
      this.spinnerService.show();    
      await this.pagoDomicilioService.listarProvincia(this.model.UbigeoDepartamento).then((response : NetworkSuccess<ProvinciasModel[]>) =>{ 
        let resultado = this.evaluarRespuesta(response); 
        if(resultado != null && resultado.Result != null && resultado.Result != null){
          this.ListaProvincias=resultado.Result;
        } else{
          this.model.UbigeoProvincia="";
          this.model.UbigeoDistrito="";
        }
        this.spinnerService.hide();    
      });
    }
  }  

  async slcProvinciaChange(){
    if(this.model.UbigeoDepartamento!="" && this.model.UbigeoProvincia !=""){
      this.spinnerService.show();    
      await this.pagoDomicilioService.listarDistrito(this.model.UbigeoDepartamento,this.model.UbigeoProvincia).then((response : NetworkSuccess<DistritosModel[]>) =>{ 
        let resultado = this.evaluarRespuesta(response); 
        if(resultado != null && resultado.Result != null && resultado.Result != null){
          this.ListaDistritos=resultado.Result;
        } else{          
          this.model.UbigeoDistrito="";
        }
        this.spinnerService.hide();    
      });
    }
  }
}
