import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/appaportante/src/environments/environment';
import { UtilitarioService } from 'projects/apppensionista/src/app/shared/utilitario.service';
import { interval } from 'rxjs';

// Declaramos jQuery global para poder usarlo
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  warning: string = "";
  loading : boolean = false;
  subscription: any;
  estaEnHorario = false;  
  env = environment;

  constructor(
    private utilSvc: UtilitarioService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit()
  {
    this.gestionarBtnIniciarLlamada();

    this.subscription = interval(1000).subscribe(() => {
      this.gestionarBtnIniciarLlamada();
    });
  }

  gestionarBtnIniciarLlamada(){
    let hoy = new Date(); 
    //let hoy = new Date("2025/06/29 10:00:00");  

    // console.log("Fecha: " + hoy.toDateString());
    // console.log("Dia: " + hoy.getDay());
    // console.log("----------------------------------------------");
    // console.log(`1970-01-01T${hoy.getHours().toString()}:${hoy.getMinutes().toString()}:${hoy.getSeconds().toString()}Z`);
    // console.log(hoy);
    // console.log(`hoy: ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}` );
    // console.log(`inicio: ${parseInt(this.env.horarioAtencionCAV.HoraInicio)}:${parseInt(this.env.horarioAtencionCAV.MinutoInicio)}:${parseInt(this.env.horarioAtencionCAV.SegundosInicio)}` );
    // console.log(`fin: ${parseInt(this.env.horarioAtencionCAV.HoraFin)}:${parseInt(this.env.horarioAtencionCAV.MinutoFin)}:${parseInt(this.env.horarioAtencionCAV.SegundosFin)}` );
    // console.log(hoy.getDay());

    //Se verifica si la fecha actual está dentro de los días no laborables para CAV
    if(this.utilSvc.estaDentroDeFechas(this.env.horarioAtencionCAV.diasNoLaborables, new Date()))
    {
      this.estaEnHorario = false;
      console.log("estaDentroDeFechas");
      console.log(this.estaEnHorario);
    }
    // En angular Domingo es 0 y Sabado es 6
    else if(this.env.production && 
        !(hoy.getDay()  >= this.env.horarioAtencionCAV.diaInicio && hoy.getDay() <= this.env.horarioAtencionCAV.diaFin)){

      this.estaEnHorario = false;
    }      
    else if(hoy.getHours() >= parseInt(this.env.horarioAtencionCAV.HoraInicio) 
            && hoy.getMinutes() >= parseInt(this.env.horarioAtencionCAV.MinutoInicio)
            && hoy.getSeconds() >= parseInt(this.env.horarioAtencionCAV.SegundosInicio)
            && hoy.getHours() <= parseInt(this.env.horarioAtencionCAV.HoraFin) 
            && hoy.getMinutes() <= parseInt(this.env.horarioAtencionCAV.MinutoFin)  
            && hoy.getSeconds() <= parseInt(this.env.horarioAtencionCAV.SegundosFin)){
      //console.log("2do if");
      this.estaEnHorario = true;
    }
    else{
      //console.log("Else");
      this.estaEnHorario = false;
    }
  }

  iniciarVideollamada(){
    this.loading = true;
    $("#irModalRedireccion").click();
    window.open(this.env.linkTeamsCAV, "_blank");
    this.loading = false;
  }
}
