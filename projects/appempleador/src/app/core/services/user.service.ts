import { Injectable } from '@angular/core';  
import { environment } from 'src/environments/environment';
import { CoreConstants } from '../data/core-constants';
import { UserData } from '../data/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../data/usuario.model';
@Injectable({
  providedIn: 'root',
})
export class UserService extends UserData {
  constructor() {
      super();
  }

  isAuthenticate(): boolean {
    let authAppToken: { value: '' };
    authAppToken = JSON.parse(localStorage.getItem(CoreConstants.LocalStorage.Token) || '{}');
    if (authAppToken.value == undefined) {
      return false;
    } else {
      if (authAppToken.value.length == 0) {
        return false;
      } else {
        return true;
      }
    }
  }
  
getLoggedUsers():Usuario {
   let user : Usuario;
   var token = this.getToken(); 
   const helper = new JwtHelperService();
   const decodedToken = helper.decodeToken(token);
   user =decodedToken as Usuario;
   return user;
}
  setLogOut() { 
    localStorage.removeItem(CoreConstants.LocalStorage.Token);
    localStorage.removeItem(CoreConstants.LocalStorage.NavegationId);
    
  }
  authlogon() {
    window.location.href=`${environment.authlogon}${environment.codigoAplicacion}`;
  }
  getToken(): string {
    let authAppToken: { value: '' };
    authAppToken = JSON.parse(localStorage.getItem(CoreConstants.LocalStorage.Token) || '{}');
    if (authAppToken.value == undefined) {
      return '';
    } else {
      if (authAppToken.value.length == 0) {
        return '';
      } else {
        return authAppToken.value;
      }
    }
  } 
}
