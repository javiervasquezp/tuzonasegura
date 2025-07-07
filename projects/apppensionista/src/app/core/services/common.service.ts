import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  getDropDownText(id :any, object:any, name:any){ 
    const selObj = _.filter(object, function (o: any) {
        return (_.includes(id,o[name]));
    });
    return selObj; 
  }


  getDropDownTextItem(id :any, object:any, name:any){ 
    const selObj = _.filter(object, function (o: any) {
        return (_.eq(id,o[name]));
    });
    return selObj; 
  }

}
 