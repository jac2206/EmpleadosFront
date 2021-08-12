import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import { Observable, Subject, of } from 'rxjs';


interface Empleados {
    // Id: number;
    nombres: string;
    apellidos: string;
    sexo: string;
    fechaNacimiento: string;
    edadALaFecha: string;
    salario: number;
    vacunacionCovid: string;
  }

@Injectable({
    providedIn: 'root',
})

export class ApiGetService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        //   responseType: 'text'
        }),
        'responseType': 'blob' as 'json',
      };

    constructor(private http: HttpClient) {}

    GetJson(url: string) {
        return this.http.get(url);
    }

    GetJsonSalario(url: string) {
      return this.http.get(url);
  }

  async PostJsonEnviarEmpleados(url:string, empleadosBuscar: any){
    const respuestaRaw = await fetch(url, {
      body: JSON.stringify(empleadosBuscar), // <-- Aquí van los datos
      headers: {
        "Content-Type": "application/json", // <-- Importante el encabezado
      },
      method: "POST",
    });
    const jsonDecodificado = await respuestaRaw.json();
    return jsonDecodificado;
}

async PostJsonEnviarNumeroYSalarioEmpleados(url:string, json: any){
  const respuestaRaw = await fetch(url, {
    body: JSON.stringify(json), // <-- Aquí van los datos
    headers: {
      "Content-Type": "application/json", // <-- Importante el encabezado
    },
    method: "POST",
  });
  const jsonDecodificado = await respuestaRaw.json();
  return jsonDecodificado;
}

  //   DeleteJson(url: string) {
  //     return this.http.get(url);
  // }
  DeleteJson(url: string) {
    return this.http.delete(url);
}



}
