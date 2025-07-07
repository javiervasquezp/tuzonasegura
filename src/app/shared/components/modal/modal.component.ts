import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, Subject} from 'rxjs';
import { UserService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  processForm: FormGroup | undefined;
  submitted = false;
  addProcessSubscription$: Subscription | undefined;
  editProcessSubscription$: Subscription | undefined;
  postProcessSubscription$: Subscription | undefined;
  errors: any; 
  titulo: string = "Cerrar sesión";
  //item: Process;
  //ItsNewRegister = true;
  public onClose: Subject<any> | undefined;
  constructor( public bsModalRef: BsModalRef,
    private userService: UserService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.onClose = new Subject(); 
    //this.loadFormulary();
  }
  CerrarSesionClick(){ 
    this.spinnerService.show();
    this.userService.setLogOut();
    this.userService.authlogon();
  }
}
