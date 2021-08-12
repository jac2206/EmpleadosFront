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

  // @ViewChild('sexoList')
  // sexoValor!: ElementRef;

  // @ViewChild('referenciaValor') referenciaValor:ElementRef;
  // @ViewChild('batchValor') batchValor:ElementRef;
  // @ViewChild('longitudValor') longitudValor:ElementRef;
  // @ViewChild('cortesValor') cortesValor:ElementRef;
  // @ViewChild('anchoValor') anchoValor:ElementRef;
  // @ViewChild('largoValor') largoValor:ElementRef;
  // @ViewChild('sheetsNumberValor') sheetsNumberValor:ElementRef;
  // @ViewChild('stackHeightValor') stackHeightValor:ElementRef;
  // @ViewChild('sheetsThicknessValor') sheetsThicknessValor:ElementRef;
  // @ViewChild('productsMissingValor') productsMissingValor:ElementRef;
  // @ViewChild('sheetScrapValor') sheetScrapValor:ElementRef;

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

    // console.log(((document.getElementById("sexoLista") as HTMLInputElement).value))

    // console.log(((document.getElementById("nombresValor") as HTMLInputElement).value))
    // console.log(((document.getElementById("apellidosValor") as HTMLInputElement).value))
    // console.log(((document.getElementById("sexoValor") as HTMLInputElement).value))
    // // console.log(((document.getElementById("fechaNacimientoValor") as HTMLInputElement).value))
    // console.log(((document.getElementById("salarioValor") as HTMLInputElement).value))
    // console.log(((document.getElementById("vacunadoValor") as HTMLInputElement).value))
    // // console.log(this.model.year + "-" + this.model.month + "-" + this.model.day)
    // alert(GridEmpleadosComponetComponent.modelDatePicker.day);

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
      // Sexo : ((document.getElementById("sexoValor") as HTMLInputElement).value),
      Sexo : ((document.getElementById("sexoLista") as HTMLInputElement).value),
      FechaNacimiento : GridEmpleadosComponetComponent.modelDatePicker.year + "-" + mes + "-" + dia,
      // FechaNacimiento : ((document.getElementById("fechaNacimientoValor") as HTMLInputElement).value),
      Salario : Number((document.getElementById("salarioValor") as HTMLInputElement).value),
      // VacunadoCovid : ((document.getElementById("vacunadoValor") as HTMLInputElement).value)
      VacunadoCovid : ((document.getElementById("vacunaLista") as HTMLInputElement).value)

    }

    this.apiComp.PostJsonCrear('http://localhost/APIEmpleados.Servicio/api/Empleados/GuardarEmpleados', EMPLEADOCREAR)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res=>res)
    // PopupCrearEmpleadosComponent.modalServiceCerrar = this.modalService;
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
    // console.log((document.getElementById("idValor") as HTMLInputElement).value);
    // console.log((document.getElementById("nombresValor") as HTMLInputElement).value);
    // console.log((document.getElementById("apellidosValor") as HTMLInputElement).value);
    // console.log((document.getElementById("sexoLista") as HTMLInputElement).value);
    // console.log(GridEmpleadosComponetComponent.modelDatePicker.year + "-" + mes + "-" + dia);
    // console.log((document.getElementById("salarioValor") as HTMLInputElement).value);
    // console.log((document.getElementById("vacunaLista") as HTMLInputElement).value)

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

  // openBackDropCustomClass(content: any) {
  //   this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  // }

  // openWindowCustomClass(content: any) {
  //   this.modalService.open(content, { windowClass: 'dark-modal' });
  // }

  // openSm(content: any) {
  //   this.modalService.open(content, { size: 'sm' });
  // }

  // openLg(content: any) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  // openXl(content: any) {
  //   this.modalService.open(content, { size: 'xl' });
  // }

  // openVerticallyCentered(content: any) {
  //   this.modalService.open(content, { centered: true });
  // }



  // openModalDialogCustomClass(content: any) {
  //   this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  // }

}
