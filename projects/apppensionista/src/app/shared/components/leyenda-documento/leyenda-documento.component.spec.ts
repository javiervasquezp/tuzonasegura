import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeyendaDocumentoComponent } from './leyenda-documento.component';

describe('LeyendaDocumentoComponent', () => {
  let component: LeyendaDocumentoComponent;
  let fixture: ComponentFixture<LeyendaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeyendaDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeyendaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
