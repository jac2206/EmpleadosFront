import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCrearEmpleadosComponent } from './popup-crear-empleados.component';

describe('PopupCrearEmpleadosComponent', () => {
  let component: PopupCrearEmpleadosComponent;
  let fixture: ComponentFixture<PopupCrearEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCrearEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCrearEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
