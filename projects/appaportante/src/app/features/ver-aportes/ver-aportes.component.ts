import { Component, OnInit } from '@angular/core';
import { SharedConstants } from '../../shared/shared.constants';

@Component({
  selector: 'app-ver-aportes',
  template: '<router-outlet></router-outlet>'
})
export class VerAportesComponent implements OnInit {
  sharedconstants: any = SharedConstants;
  constructor() { }

  ngOnInit() {
  }
}