import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDateStruct,NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { takeWhile } from 'rxjs/operators';
import { GridEmpleadosComponetComponent } from '../grid-empleados-componet/grid-empleados-componet.component';
import { ApiGuardarService } from './apiGuardar.service';
// import { GridEmpleadosComponetComponent} from '../grid-empleados-componet/grid-empleados-componet.component'

interface EmpleadosCrear {
  // Id: number;
  Nombres: string;
  Apellidos: string;
  Sexo: string;
  FechaNacimiento: string;
  Salario: number;
  VacunadoCovid: string;
}

interface EmpleadosEditar {
  Id: number;
  Nombres: string;
  Apellidos: string;
  Sexo: string;
  FechaNacimiento: string;
  Salario: number;
  VacunadoCovid: string;
}

let EMPLEADOCREAR: EmpleadosCrear
{

};

let EMPLEADOEDITAR: EmpleadosEditar
{

};


@Component({
  providers:[ApiGuardarService,
    // GridEmpleadosComponetComponent
  ],
  selector: 'app-popup-crear-empleados',
  templateUrl: './popup-crear-empleados.component.html',
  styleUrls: ['./popup-crear-empleados.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupCrearEmpleadosComponent implements OnInit {
  model!: NgbDateStruct;
  aa: any = "Masculino";
  closeResult: string | undefined;
  prueba:any = 'JAC';
  @ViewChild('nombresValor')
  nombresValor!: ElementRef;
  private alive = true;


  constructor(public modalService: NgbModal,
    private apiComp: ApiGuardarService,
    private calendar: NgbCalendar,
    // private empleados: GridEmpleadosComponetComponent
    ) { }

    // public static modalServiceCerrar:any;

  ngOnInit(): void {
  }

  AbriPopup(){
    this.modalService.open({ scrollable: true });

  }

  openScrollableContent(longContent: any) {
    // this.model = {year: 2021, month: 1, day: 3}
    // this.aa = "Seleccione Sexo"
    this.modalService.open(longContent, { scrollable: true });

  }

  Guardar(){

    let mes;
    let dia;
    if(GridEmpleadosComponetComponent.modelDatePicker.month < 10){
      mes = "0" + GridEmpleadosComponetComponent.modelDatePicker.month;
    }
    else{
      mes = GridEmpleadosComponetComponent.modelDatePicker.month;
    }
    if(GridEmpleadosComponetComponent.modelDatePicker.day < 10){
      dia = "0" + GridEmpleadosComponetComponent.modelDatePicker.day;
    }
    else{
      dia = GridEmpleadosComponetComponent.modelDatePicker.day
    }
    // console.log(this.model.year + "-" + mes + "-" + dia)

    EMPLEADOCREAR =
    {
      Nombres : ((document.getElementById("nombresValor") as HTMLInputElement).value),
      Apellidos : ((document.getElementById("apellidosValor") as HTMLInputElement).value),
      Sexo : ((document.getElementById("sexoLista") as HTMLInputElement).value),
      FechaNacimiento : GridEmpleadosComponetComponent.modelDatePicker.year + "-" + mes + "-" + dia,
      Salario : Number((document.getElementById("salarioValor") as HTMLInputElement).value),
      VacunadoCovid : ((document.getElementById("vacunaLista") as HTMLInputElement).value)

    }

    this.apiComp.PostJsonCrear('http://localhost/APIEmpleados.Servicio/api/Empleados/GuardarEmpleados', EMPLEADOCREAR)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res=>res)
    this.modalService.dismissAll();

  }

  Editar(){
    let mes;
    let dia;
    if(GridEmpleadosComponetComponent.modelDatePicker.month < 10){
      mes = "0" + GridEmpleadosComponetComponent.modelDatePicker.month;
    }
    else{
      mes = GridEmpleadosComponetComponent.modelDatePicker.month;
    }
    if(GridEmpleadosComponetComponent.modelDatePicker.day < 10){
      dia = "0" + GridEmpleadosComponetComponent.modelDatePicker.day;
    }
    else{
      dia = GridEmpleadosComponetComponent.modelDatePicker.day
    }

    EMPLEADOEDITAR =
    {
      Id : Number((document.getElementById("idValor") as HTMLInputElement).value),
      Nombres : ((document.getElementById("nombresValor") as HTMLInputElement).value),
      Apellidos : ((document.getElementById("apellidosValor") as HTMLInputElement).value),
      Sexo : ((document.getElementById("sexoLista") as HTMLInputElement).value),
      FechaNacimiento : GridEmpleadosComponetComponent.modelDatePicker.year + "-" + mes + "-" + dia,
      Salario : Number((document.getElementById("salarioValor") as HTMLInputElement).value),
      VacunadoCovid : ((document.getElementById("vacunaLista") as HTMLInputElement).value)

    }

    this.apiComp.PostJsonCrear('http://localhost/APIEmpleados.Servicio/api/Empleados/EditarEmpleados', EMPLEADOEDITAR)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res=>res)
    this.modalService.dismissAll();

  }

  ModelDatePicker(){
    alert(this.model.day);
  }

}
