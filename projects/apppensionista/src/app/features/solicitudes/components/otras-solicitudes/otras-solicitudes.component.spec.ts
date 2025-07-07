import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrasSolicitudesComponent } from './otras-solicitudes.component';

describe('OtrasSolicitudesComponent', () => {
  let component: OtrasSolicitudesComponent;
  let fixture: ComponentFixture<OtrasSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrasSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrasSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
