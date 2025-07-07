import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 
import { DatosDetalle } from '../models/resoluciones.model';

@Injectable()
export class DataResolucionesService {

  private messageSource = new BehaviorSubject(new DatosDetalle());
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(modelo: DatosDetalle) {
    this.messageSource.next(modelo);
  }

}