import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfComponent } from './modal-conf.component';

describe('ModalConfComponent', () => {
  let component: ModalConfComponent;
  let fixture: ComponentFixture<ModalConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
