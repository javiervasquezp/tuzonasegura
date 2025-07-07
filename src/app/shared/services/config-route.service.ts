import { Injectable } from '@angular/core';
import { CoreConstants } from 'src/app/core/data/core-constants';
import { UserService } from 'src/app/core/services/auth.service';
import { ShellConfig } from './config';
declare var $ : any;
@Injectable({
  providedIn: 'root'
})
export class ConfigRouteService {
  private config: ShellConfig | null = null;
  constructor(private userService: UserService) { }
  init(config: ShellConfig) {
    this.config = config; 
    if ((!location.hash || location.href.indexOf(CoreConstants.LocalStorage.UrlValidateToken)>0)&& config.initialRoute) {//
      location.hash = config.initialRoute;
    } 
    //window.addEventListener("hashchange", () => {this.urlChanged();console.log('addEventListener');}); 
    setTimeout(() => this.urlChanged(), 0);    
    if (config.preload) { 
      this.preloadClients(); 
    } 

    let url  = this.userService.getRutaDefault();
    if(url !=null && url !="")
      this.navigate(url);
  }
  
  urlChanged() {
    // console.log('urlChanged');
    if(this.config != null ){
      for (const client in this.config.clients) {
        const entry = this.config.clients[client];
        const route = '#' + entry.route;
         
        if (location.hash.startsWith(route)) {
          // Lazy load module if still not loaded 
          if (!entry.loaded) {
            this.load(client);
          }
          else {
            this.showClient(client);
          }
        }
        else if (entry.loaded) {
          this.hideClient(client);
        }
      }
    }
  }

  showClient(clientName: string) {
    this.setClientVisibility(clientName, true);
  }

  hideClient(clientName: string) {
    this.setClientVisibility(clientName, false);
  }

  setClientVisibility(clientName: string, show: boolean) {
    // console.log('clientName');
    // console.log(clientName);
    // console.log(show);
    if(this.config != null){
        const entry = this.config?.clients[clientName];
        
        if (!entry) {
          throw new Error(`aplication ${clientName} is not configured.`);
        }

        const elms = document.getElementsByTagName(entry?.element);

        if (elms?.length === 0) {
          throw new Error(`aplication ${clientName} is not loaded.`);
        }

        if (elms?.length > 1) {
          throw new Error(`aplication ${clientName} is loaded several times.`);
        }

        const elm : any= elms[0]??[];
        elm['hidden'] = !show;  
      }
  }

  load(name: string): void {
    if(this.config != null){
        const configItem = this.config?.clients[name];
        // Don't load bundle twice
        if (configItem==null || configItem?.loaded) return;
        configItem.loaded = true;
        const content = document.getElementById(this.config?.outletId || 'content');       
        // Add tag for micro frontend, e. g. <apppensionista></apppensionista>
        const element = document.createElement(configItem?.element);        
        element['hidden'] = !location.hash.startsWith('#' + configItem?.route);          
        
        element.setAttribute('token',this.userService.getToken()); 
        content?.appendChild(element);
       
        // Add script-tag(s) to load bundle
        const files = typeof configItem?.src === 'string' ? [configItem?.src] : configItem.src;

        files.forEach(src => {
          const script = document.createElement('script');
          script.src = src;
          content?.appendChild(script); 
        });
      }
  }

  preloadClients() {
    for (const client in this.config?.clients) {
    
      this.load(client);
    }
  }

  navigate(url: string) {
    // console.log('navigate-location-0'); 
    // console.log(location);
    const pos = location.hash.indexOf('?');
    const query = pos !== -1? location.hash.substr(pos): '';
    console.log(query);
    location.hash = url + query; 
    // console.log('navigate-url-1');
    // console.log(url);
    // console.log(location);
    this.urlChanged();
  }

}
