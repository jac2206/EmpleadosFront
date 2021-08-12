import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEmpleadosComponetComponent } from './grid-empleados-componet.component';

describe('GridEmpleadosComponetComponent', () => {
  let component: GridEmpleadosComponetComponent;
  let fixture: ComponentFixture<GridEmpleadosComponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridEmpleadosComponetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEmpleadosComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
