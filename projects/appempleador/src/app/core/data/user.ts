import { Usuario } from './usuario.model';


export abstract class UserData {
  
  abstract setLogOut():any;
 
  abstract isAuthenticate():boolean;
  abstract getToken(): string;
  abstract getLoggedUsers():Usuario;
}