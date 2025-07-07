import { Injectable } from '@angular/core';
import { CoreConstants } from 'src/app/core/data/core-constants';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
    providedIn: 'root'
  })

  export class UtilitarioService {
    constructor(private apiService: ApiService){}

    numberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }
    
    emailValidator(email:string): boolean {
        // var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!EMAIL_REGEXP.test(email)) {
            return false;
        }
        return true; 
    }

    validarDireccion(dir:string): boolean {
      var REGEXP = /^[\\s\\-\\.a-zA-Z0-9ñÑ]{10,80}$/;
      if (!REGEXP.test(dir)) {
          return false;
      }
      return true; 
    }

    validarCelular(dir:string): boolean {
      var REGEXP = /^[0-9]{8,10}$/;
      if (!REGEXP.test(dir)) {
          return false;
      }
      return true; 
    }

    validarFijo(dir:string): boolean {
      var REGEXP = /^[0-9]{5,8}$/;
      if (!REGEXP.test(dir)) {
          return false;
      }
      return true; 
    }
  }