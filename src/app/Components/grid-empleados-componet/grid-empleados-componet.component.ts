import { DecimalPipe, Location, LocationStrategy  } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { map, takeUntil, startWith, debounceTime, tap, switchMap, delay, takeWhile } from 'rxjs/operators';
import {ApiGetService} from './api.service';
import {PopupCrearEmpleadosComponent} from  '../popup-crear-empleados/popup-crear-empleados.component'
import { NgbActiveModal, NgbModal, NgbDateStruct,NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



interface Empleados {
  Id?: number;
  Nombres: string;
  Apellidos: string;
  Sexo: string;
  FechaNacimiento: string;
  EdadALaFecha: string;
  Salario: number;
  VacunadoCovid: string;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}


interface SearchResult2 {
  empleados: Empleados[];
  total: number;
}

let EMPLEADOS: Empleados[] = [


];

function matches2(empleadosFiltro: Empleados, term: string, pipe: PipeTransform) {
  return empleadosFiltro.Nombres.toLowerCase().includes(term)
    // || empleadosFiltro.nombres.toLowerCase().includes(term.toLowerCase())
    || empleadosFiltro.Apellidos.toLowerCase().includes(term.toLowerCase())
    || empleadosFiltro.FechaNacimiento.toLowerCase().includes(term)
    || empleadosFiltro.Sexo.toLowerCase().includes(term)
    || empleadosFiltro.EdadALaFecha.toLowerCase().includes(term)
    || empleadosFiltro.VacunadoCovid.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(empleadosFiltro.Salario).includes(term);
}


@Component({
  providers: [ApiGetService,
    DecimalPipe,
    PopupCrearEmpleadosComponent],
  selector: 'app-grid-empleados-componet',
  templateUrl: './grid-empleados-componet.component.html',
  styleUrls: ['./grid-empleados-componet.component.scss']
})
export class GridEmpleadosComponetComponent implements OnInit {
  model!: NgbDateStruct;
  public static modelDatePicker:  NgbDateStruct;

  // prueba = 'Jac'
   // prueba = 'Jac'
   // prueba = 'Jac'
  // prueba = 'Jac'
  private alive = true;
  cantidadEmpleadosBuscar!: number;
   empleadosBuscar:any;
   totalSalario:any;
   totalEmpleados:any;
  sexoValorLista: any;
  vacunaValorLista: any;
  id!: number;
  nombre!: string;
  apellidos!: string;
  sexo!: string;
  fechaNacimiento!: string;
  salario!: number;
  vacunadoCovid!: string;

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''

  };

  // longContent: any = longContent;

  total: number | undefined ;
  empleados = EMPLEADOS;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  // private _countries$ = new BehaviorSubject<Country[]>([]);
  private _Empleados$ = new BehaviorSubject<Empleados[]>([]);

  private _total$ = new BehaviorSubject<number>(0);

  filter = new FormControl('');
  // filter2 = new FormControl('');
  constructor(private apiGetComp: ApiGetService,
    public pipe : DecimalPipe,
    private empleadoCrearPopup: PopupCrearEmpleadosComponent,) {
      this._search$.pipe(
        takeWhile(() => this.alive),
        tap(() => this._loading$.next(false)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this._Empleados$.next(result.empleados);
        this._total$.next(result.total);
        // this.CargarEmpleados();
      });

      this._search$.next();
      this.CargarEmpleados();
      this.alive;
     }

     get empleados$() { return this._Empleados$.asObservable(); }
     get total$() { return this._total$.asObservable(); }
     get loading$() { return this._loading$.asObservable(); }
     get page() { return this._state.page; }
     get pageSize() { return this._state.pageSize; }
     get searchTerm() { return this._state.searchTerm; }

      // get searchTerm() { return this._state.searchTerm; }
      set page(page: number) { this._set({page}); }
      set pageSize(pageSize: number) { this._set({pageSize}); }
      set searchTerm(searchTerm: string) { this._set({searchTerm}); }

      private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
      }

  ngOnInit(): void {
    // this.CargarEmpleados();

  }

  // ActualizarGrid(){
  //   this.CargarEmpleados;
  // }

  CargarEmpleados(){

    this.apiGetComp.GetJson('http://localhost/APIEmpleados.Servicio/api/Empleados/ObtenerEmpleados')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      EMPLEADOS = res;
      // this.empleados = EMPLEADOS
      this._search$.next();
      this.totalEmpleados = EMPLEADOS.length
            // console.log(this.empleados);
            // console.log();
   });

   this.apiGetComp.GetJsonSalario('http://localhost/APIEmpleados.Servicio/api/Empleados/ObtenerTotalSalario')
   .pipe(takeWhile(() => this.alive))
   .subscribe((res: any) => {
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    // console.log(formatterPeso.format(10000))
    this.totalSalario = formatterPeso.format(res);
   });
  //  const formatterPeso = new Intl.NumberFormat('es-CO', {
  //   style: 'currency',
  //   currency: 'COP',
  //   minimumFractionDigits: 0
  // })
  // console.log(formatterPeso.format(10000))
  // this.totalSalario =formatterPeso.format(10000);
   this._search$.next();
  //  console.log(EMPLEADOS[0].nombres);
  //  this.nombreLabel = EMPLEADOS[0k].nombres;

  }

  _search(): Observable<SearchResult2> {

    const {pageSize, page, searchTerm} = this._state;


    let empleados = EMPLEADOS;

    // 2. filter
    empleados = empleados.filter(empleados => matches2(empleados, searchTerm, this.pipe));
    const total = empleados.length;
    // 3. paginate
    empleados = empleados.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    this.empleadosBuscar = empleados;
    this.cantidadEmpleadosBuscar = empleados.length;

    // return of({countries, total});
    return of({empleados, total});
  }

  BuscarEmpleados(){
    var sumaSalario = 0;
    this.empleadosBuscar.forEach((element: any) =>
    sumaSalario = sumaSalario + element.Salario);
    console.log(sumaSalario);

    var json = {NumeroEmpleados: this.cantidadEmpleadosBuscar, TotalSalarioEmpleados: sumaSalario}
    // console.log(json)
    // console.log(this.empleadosBuscar);
    this.EnviarJson(this.empleadosBuscar,json);

  }

  async EnviarJson(empleadosBuscar:any,json:any){
    console.log(empleadosBuscar);
    console.log(json);


    // const respuestaRaw = await fetch("http://localhost/APIEmpleados.Servicio/api/Empleados/RecibirJsonEmpleados", {
    //   body: JSON.stringify(empleadosBuscar), // <-- Aquí van los datos
    //   headers: {
    //     "Content-Type": "application/json", // <-- Importante el encabezado
    //   },
    //   method: "POST",
    // });
    // const jsonDecodificado = await respuestaRaw.json();
    this.apiGetComp.PostJsonEnviarEmpleados("http://localhost/APIEmpleados.Servicio/api/Empleados/RecibirJsonEmpleados", empleadosBuscar)
    this.apiGetComp.PostJsonEnviarNumeroYSalarioEmpleados("http://localhost/APIEmpleados.Servicio/api/Empleados/RecibirJsonNumeroYSalarioEmpleados", json)

    // console.log(respuuesta);
  }

  CrearEmpleado(longContent: any){
    var fechaActual = new Date();
    // fechaActual = Date.;
    // console.log(fechaActual.getMonth());
    this.model = {year: fechaActual.getFullYear(), month: fechaActual.getMonth()+1, day: fechaActual.getDate()}

    this.empleadoCrearPopup.openScrollableContent(longContent);
    // alert("Crear Empleado")
    // this.CargarEmpleados();
  }

  GuardarEmpleado(){
    GridEmpleadosComponetComponent.modelDatePicker = this.model;
    this.empleadoCrearPopup.Guardar();
    // delay(500);
    // this.CargarEmpleados();
    this.alive;
  }

  EditarEmpleado(){
    GridEmpleadosComponetComponent.modelDatePicker = this.model;
    this.empleadoCrearPopup.Editar();
    this.CargarEmpleados();
    this.alive;
  }

  EliminarEmpleado(id:any){
    // alert("Eliminar " + id);
    // delay(200)
    this.apiGetComp.DeleteJson(`http://localhost/APIEmpleados.Servicio/api/Empleados/EliminarEmpleados?id=${id}`)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res=>res)
    // delay(500);
    this.CargarEmpleados();
  }

  EditarPopUp(longContent2: any, id:any ,nombres:string, apellidos:string, sexo:string, fechaNacimiento:string, salario:any, vacunadoCovid:string ){
    this.id = id
    this.nombre = nombres;
    this.apellidos = apellidos;
    this.sexo = sexo;
    // this.fechaNacimiento = fechaNacimiento;
    // console.log(fechaNacimiento.split("-",3)[0]);
    this.model = {year: parseInt(fechaNacimiento.split("-",3)[0]), month: parseInt(fechaNacimiento.split("-",3)[1]), day: parseInt(fechaNacimiento.split("-",3)[2])}
    // this.model = {year: 2021, month: 1, day: 3}
    this.salario = salario;
    this.vacunadoCovid = vacunadoCovid;
    this.empleadoCrearPopup.openScrollableContent(longContent2);


  }

}
