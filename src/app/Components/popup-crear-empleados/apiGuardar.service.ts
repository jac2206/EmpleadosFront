import { Injectable} from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'

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


@Injectable({
    providedIn: 'root'
})

export class ApiGuardarService{


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        //   responseType: 'text'
        }),
        'responseType': 'blob' as 'json'
      };

    constructor(private http: HttpClient){}

    GetJson(url:string){
        return this.http.get(url);
    }

    PostJsonCrear(url:string, empleadoCrear: EmpleadosCrear){
      return this.http.post(url, empleadoCrear, this.httpOptions);
  }

  PostJsonEditar(url:string, empleadoEditar: EmpleadosEditar){
    return this.http.post(url, empleadoEditar, this.httpOptions);
}



}
