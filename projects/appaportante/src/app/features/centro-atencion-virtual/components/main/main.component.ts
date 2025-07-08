import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/appaportante/src/environments/environment';

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
  
  env = environment;
  
  constructor() { }

  ngOnInit(): void {
  }

  iniciarVideollamada(){
    console.log("Iniciar Videollamada");
  }
}
