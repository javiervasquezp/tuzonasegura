import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';

// Declaramos jQuery global para poder usarlo
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  warning: string = "";
  aceptaCondiciones : boolean = false;
  loading : boolean = false;
  btnAuth? : HTMLInputElement | null;
  btnAuthMovil? : HTMLInputElement | null;

  chkAcepta? : HTMLInputElement | null;
  chkAceptaMovil? : HTMLInputElement | null;
  //bsModalRef: BsModalRef | null = null;
  // Referencia a la directiva en el template
  private readonly modalInfoSelector = '#modalInfo';
  
  env = environment;
  constructor(
    // private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit()
  {
    this.aceptaCondiciones = false;
    // console.log(this.aceptaCondiciones);
    
    this.btnAuth = document.getElementById('btnAuth') as HTMLInputElement | null;
    this.btnAuthMovil = document.getElementById('btnAuthMovil') as HTMLInputElement | null;
    this.chkAcepta = document.getElementById('chkAceptar') as HTMLInputElement | null;
    this.chkAceptaMovil = document.getElementById('chkAceptaMovil') as HTMLInputElement | null;
    this.deshabilitarBtnAuth();
  }

  // openModal(template: TemplateRef<any>, bootstrapSize: permitedSizeModalBootstrap) {

  //   const config: ModalOptions = { 
  //     class: 'modal-' + bootstrapSize,
  //     backdrop: 'static',
  //     keyboard: false
  //   };

  //   this.modalRef = this.modalService.show(template, config);
  // }

  openModal(): void {
    // Configuramos opciones y lo abrimos
    $(this.modalInfoSelector).modal({
      backdrop: 'static',
      keyboard: false
    });
    $(this.modalInfoSelector).modal('show');
  }

  closeModal(): void {
    $(this.modalInfoSelector).modal('hide');
  }

  usuarioAcepta(){
    this.aceptaCondiciones = ! this.aceptaCondiciones;

    if(this.chkAcepta != null)
      this.chkAcepta.checked = this.aceptaCondiciones;
    
    if(this.chkAceptaMovil != null)
      this.chkAceptaMovil.checked = this.aceptaCondiciones;
    
    // console.log(this.aceptaCondiciones);
    //this.warning = "";
    if (this.aceptaCondiciones) {
      this.habilitarBtnAuth();
    }
    else{
      this.deshabilitarBtnAuth();
    }
  }

  habilitarBtnAuth(){
    this.btnAuth?.removeAttribute('disabled');   
    this.btnAuth?.classList.remove('bton-third');
    this.btnAuth?.classList.add('bton-second');

    this.btnAuthMovil?.removeAttribute('disabled');   
    this.btnAuthMovil?.classList.remove('bton-third');
    this.btnAuthMovil?.classList.add('bton-second');
  }

  deshabilitarBtnAuth(){
    this.btnAuth?.setAttribute('disabled', '');
    this.btnAuth?.classList.remove('bton-second');
    this.btnAuth?.classList.add('bton-third');

    this.btnAuthMovil?.setAttribute('disabled', '');
    this.btnAuthMovil?.classList.remove('bton-second');
    this.btnAuthMovil?.classList.add('bton-third');
  }

  iniciarVideollamada(){
    console.log("Iniciar Videollamada");
  }

}
