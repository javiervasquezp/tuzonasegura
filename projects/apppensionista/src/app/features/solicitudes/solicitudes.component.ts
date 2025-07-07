import { Component, OnInit } from '@angular/core';
import { SharedConstants } from '../../shared/shared.constants';

@Component({
  selector: 'app-solicitudes',
  template: '<router-outlet></router-outlet>'
})
export class SolicitudesComponent implements OnInit {
  sharedconstants: any = SharedConstants;
  constructor() { }

  ngOnInit() {
  }
}