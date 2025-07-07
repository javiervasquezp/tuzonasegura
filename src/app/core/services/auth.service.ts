
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Usuario } from 'src/app/core/data/usuario.model';
import { environment } from 'src/environments/environment';
import { CoreConstants } from '../data/core-constants';
import { UserData } from '../data/user';
import { JwtHelperService } from '@auth0/angular-jwt';
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
 

//   setLoggedMenu(items: OpcionPerfil[]) {
//     localStorage.setItem(AppConstants.LocalStorage.Menu, JSON.stringify(items));
//   }
//   getLoggedMenu(): Observable<OpcionPerfil[]> {
//     const items = localStorage.getItem(AppConstants.LocalStorage.Menu);
//     return observableOf(JSON.parse(items));
//   }
getLoggedUsers():Usuario {
   let user : Usuario;
   var token = this.getToken();
   const helper = new JwtHelperService();
   const decodedToken = helper.decodeToken(token); 
   user = decodedToken as Usuario;//JSON.parse(decodedToken.dataLogin);
   return user;
}
  setLogOut() { 
    // localStorage.removeItem(AppConstants.LocalStorage.Menu);
    localStorage.removeItem(CoreConstants.LocalStorage.Token);
    localStorage.removeItem(CoreConstants.LocalStorage.NavegationId);
    localStorage.removeItem(CoreConstants.LocalStorage.RutaDefault);
    localStorage.clear();
  }
  authlogon() {
    window.location.href=`${environment.authlogon}`;
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
  setNavigationId(id: string) {
     localStorage.setItem(CoreConstants.LocalStorage.NavegationId, id);
  }
  getNavigationId() {
    return localStorage.getItem(CoreConstants.LocalStorage.NavegationId);
 }
  setToken(token: string) {
    let authAppToken: {};
    // authAppToken = JSON.parse(localStorage.getItem(CoreConstants.LocalStorage.Token) || '{}');
    // if (authAppToken == null || authAppToken == undefined) {
      authAppToken = {
        createdAt: Date.now(),
        name: "nb:auth:jwt:token",
        ownerStrategyName: "email",
        value: token
      // };
    }
    localStorage.setItem(CoreConstants.LocalStorage.Token, JSON.stringify(authAppToken));
  }
  setRutaDefault(ruta: string) {
    localStorage.setItem(CoreConstants.LocalStorage.RutaDefault, ruta);
  }

  getRutaDefault() {
    return localStorage.getItem(CoreConstants.LocalStorage.RutaDefault);
 }
}
