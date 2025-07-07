import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { flatten } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoreConstants } from 'projects/apppensionista/src/app/core/data/core-constants';
import { Usuario } from 'projects/apppensionista/src/app/core/data/usuario.model';
import { CriterioPaginar } from 'projects/apppensionista/src/app/core/models/criterio-paginar.model';
import { UserService } from 'projects/apppensionista/src/app/core/services/user.service';
import { ModalConfComponent } from 'projects/apppensionista/src/app/shared/components/modal-conf/modal-conf.component';
import { AutorizarDatosConstants } from '../../autorizar-datos-constants';
import { InformacionModel } from '../../models/informacion.model';
import { RegistrarModel } from '../../models/registrar.model';
import { RespuestaModel } from '../../models/respuesta.model';
import { AutorizarDatosService } from '../../services/autorizar-datos.service';
import { ModalConfirmarComponent } from '../modal/modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  bsModalRef: BsModalRef | null = null;
  warning: string = "";
  usuarioLogueado = new Usuario();
  listaRegimenes = new Array();
  listaCooperativa = new Array();
  model = new RegistrarModel();
  page = new CriterioPaginar();
  loadingIndicator = true;
  totalRows = 0;
  rows: any[] | []=[];
  reorderable = true;
  autorizadoFlag: boolean = true;
  pagecount:number=5;
  @ViewChild(ModalConfirmarComponent)
  child!: ModalConfirmarComponent;
  
  constructor(private prestamosService: AutorizarDatosService, 
    private userService: UserService, 
    private spinnerService: NgxSpinnerService,
    public datePipe: DatePipe,
    private modalService: BsModalService
    ) { 
      this.page.Pagina = 0;
      this.page.Tamanio = this.pagecount;
    }

  ngOnInit(): void {
    this.usuarioLogueado = this.userService.getLoggedUsers(); 
    this.limpiar();
    this.obtenerRegimenes();
    this.setPage({ offset: 0 });
  }

  obtenerRegimenes(){
    this.spinnerService.show();
    let data={
      tipoDocumento: this.usuarioLogueado.TypeDocSnp,
      numeroDocumento: this.usuarioLogueado.NumDoc
    };
    this.prestamosService.obtenerRegimen(data).subscribe(
      (res: any) => {
        let resp = this.evaluarRespuesta(res);
        if(resp.Correcto){
          this.listaRegimenes = resp.Result.filter((book: InformacionModel) => book.estadoCuenta === AutorizarDatosConstants.Estados.Activo && book.TipoDerecho == AutorizarDatosConstants.TipoDerecho.Propio);
          if(this.listaRegimenes.length == 0){
            this.autorizadoFlag = false;
            this.warning = AutorizarDatosConstants.mensajesValidacion.msgNoAutorizado;
          }else{
            this.setearRegimenDefecto();
            this.slcRegimenChange();
          }
        }
        this.spinnerService.hide();  
      },(err:any) => {
      this.warning = `<p class='alert__info'>${err}</p>`; 
      this.spinnerService.hide();    
    });
  }

  obtenerCooperativas(){
    this.spinnerService.show();
    let data={
      Regimen: this.model.regimen
    };
    this.prestamosService.listarCooperativas(data).subscribe(
      (res: any) => {
        this.listaCooperativa = this.evaluarRespuesta(res).Correcto ? this.evaluarRespuesta(res).Result : []; 
        this.spinnerService.hide();  
      },(err:any) => {
      this.warning = `<p class='alert__info'>${err}</p>`; 
      this.spinnerService.hide();    
    });
  }

  setPage(pageInfo:any) {
    this.page.Pagina = pageInfo.offset + 1;
    this.loadingIndicator = true;
    this.prestamosService.listarAutorizaciones(this.setearModelo()).subscribe((res: any) => {
      this.page = this.page;
        let resultado = this.evaluarRespuesta(res).Correcto ? this.evaluarRespuesta(res).Result : [];
        this.rows = resultado;
        this.totalRows = resultado.length > 0 ? resultado[0].RowsTotal : 0;
        //console.log(this.rows);
        //console.log(this.totalRows);
      this.loadingIndicator = false;
    },(err:any) => {
      this.warning = `<p class='alert__info'>${err}</p>`; 
      this.loadingIndicator = false;   
    });
  }
  onClickPage(page:any){ 
    this.setPage({ offset: page });
    
  }
  registrar(){
      this.spinnerService.show();
      this.prestamosService.registrarAutorizacion(this.model).subscribe(
        (res: any) => {
          if(this.evaluarRespuesta(res).Correcto){
            this.setPage({ offset: 0 });
            this.abrirExitoModal(true);
            this.limpiar();
          }
          this.spinnerService.hide();  
        },(err:any) => {
        this.warning = `<p class='alert__info'>${err}</p>`; 
        this.spinnerService.hide();    
      });
  }

  eliminar(row: any){
    let request ={
      IdAutorizacionDescuento: row.IdAutorizacionDescuento
    }
    this.spinnerService.show();
    this.prestamosService.eliminarAutorizacion(request).subscribe(
      (res: any) => {
        if(this.evaluarRespuesta(res).Correcto){
          this.setPage({ offset: 0 });
          this.abrirExitoModal(false);
        }
        this.spinnerService.hide();  
      },(err:any) => {
      this.warning = `<p class='alert__info'>${err}</p>`; 
      this.spinnerService.hide();    
    });
  }

  slcRegimenChange(){
    if(this.listaRegimenes.length > 0){
      this.model.cuentaPension = this.listaRegimenes.find(elemento => elemento.desRegimen == this.model.regimen).desCuenta;
      this.model.prestacion = this.listaRegimenes.find(elemento => elemento.desRegimen == this.model.regimen).prestacion;
    }
    
    this.listaCooperativa = [];
    this.model.codigoCooperativa = "";
    this.obtenerCooperativas();
  }

  slcEntidadChange(){
    this.model.numeroRuc = this.listaCooperativa.find(elemento => elemento.CodigoCooperativa == this.model.codigoCooperativa).NumeroRuc;
    this.model.descripcionCooperativa = this.listaCooperativa.find(elemento => elemento.CodigoCooperativa == this.model.codigoCooperativa).DescripcionCooperativa;
    this.model.tipoCooperativa = this.listaCooperativa.find(elemento => elemento.CodigoCooperativa == this.model.codigoCooperativa).TipoCooperativa;
  }

  setearModelo(){
    let data ={
      TipoDocumento: this.usuarioLogueado.TypeDocSnp,
      NumeroDocumento: this.usuarioLogueado.NumDoc,
      NumeroRuc: null,
      Estado:  null,
      PageNumber: this.page.Pagina,
      PageSize: this.page.Tamanio
    }; 
    return data;
  }

  evaluarRespuesta(res:any){
    this.warning = "";
    let resultado = new RespuestaModel();
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
    }else{
        this.warning = res.Message;
    }
    return resultado;
  }

  validarCamposObligatorios(){
    this.warning = "";
    let valido: boolean = true;

    if(!this.model.esAutorizacion){
      this.warning += AutorizarDatosConstants.mensajesValidacion.msgIngresarCheck;
    }
    
    if(this.model.regimen.length == 0){
      this.warning += AutorizarDatosConstants.mensajesValidacion.msgIngresarRegimen;
    }
    
    if(this.model.codigoCooperativa.length == 0){
      this.warning += AutorizarDatosConstants.mensajesValidacion.msgIngresarEntidadFinanciera;
    }

    if(this.warning.length > 0){
      this.warning = AutorizarDatosConstants.mensajesValidacion.msgEncabezadoAlerta + this.warning;
      valido = false;
    }

    return valido;
  }
  
  limpiar(){
    this.model = new RegistrarModel();
    this.model.tipoDocumento = this.usuarioLogueado.TypeDocSnp;
    this.model.numeroDocumento = this.usuarioLogueado.NumDoc;
    this.model.usuarioCreacion = this.usuarioLogueado.NumDoc;
    this.setearRegimenDefecto();
  }

  abrirExitoModal(esregistro: boolean){
    this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
    (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
      if (result) {
       // this.ngOnChanges();
       //console.log('addModalProcessClick');
      }
      this.bsModalRef!.hide();
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.titulo = "Operación exitosa";
    this.bsModalRef.content.body = esregistro ? "<p>Se registró la autorización con éxito.</p>" : "<p>Se canceló la autorización con éxito.</p>";
    this.bsModalRef.content.esModalConfirmar = false;
  }

  cancelarAutorizacionClick(row: any){
    this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
          (<ModalConfComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
            this.bsModalRef!.hide();
            if (result == true) {
              this.eliminar(row);
            }
          }); 
    this.bsModalRef.content.titulo = "Alerta";
    this.bsModalRef.content.body = "<p>¿Estás seguro de que desea cancelar la autorización de " + row.DescCooperativa + "?</p>";
    this.bsModalRef.content.esModalConfirmar = true;
  }

  registrarAutorizacionClick(){
    if(this.validarCamposObligatorios()){
          this.bsModalRef = this.modalService.show(ModalConfirmarComponent, {class: 'modal-lg'});
        (<ModalConfirmarComponent>this.bsModalRef!.content).onClose!.subscribe(result => {
          this.bsModalRef!.hide();
          if (result) {
          this.registrar();
          }
        });
        this.bsModalRef.content.titulo = "Alerta";
        this.bsModalRef.content.body = "<p>¿Confirma su registro y autorización a " + this.model.descripcionCooperativa + "?</p>";
        this.bsModalRef.content.esModalConfirmar = true;
    }
  }

  setearRegimenDefecto(){
    if(this.listaRegimenes.length > 0)
      this.model.regimen = this.listaRegimenes[0].desRegimen;
  }
}
