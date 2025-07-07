import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';


export abstract class UserData {
  // abstract currentUser: Usuario;
 

//   abstract setLoggedMenu(items: OpcionPerfil[]);

//   abstract getLoggedMenu(): Observable<OpcionPerfil[]>;

//   abstract getLogo();

  abstract setLogOut():any;

  abstract setToken(token:String):any;

  abstract isAuthenticate():boolean;

  abstract getToken(): string;

  abstract getLoggedUsers():Usuario;
}
