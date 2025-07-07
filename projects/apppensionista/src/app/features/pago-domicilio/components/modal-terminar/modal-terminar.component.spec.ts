import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTerminarComponent } from './modal-terminar.component';

describe('ModalTerminarComponent', () => {
  let component: ModalTerminarComponent;
  let fixture: ComponentFixture<ModalTerminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTerminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTerminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
