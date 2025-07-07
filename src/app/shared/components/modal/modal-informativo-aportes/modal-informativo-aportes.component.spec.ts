import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformativoAportesComponent } from './modal-informativo-aportes.component';

describe('ModalInformativoAportesComponent', () => {
  let component: ModalInformativoAportesComponent;
  let fixture: ComponentFixture<ModalInformativoAportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInformativoAportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInformativoAportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
