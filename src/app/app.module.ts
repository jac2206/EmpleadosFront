import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridEmpleadosComponetComponent } from './Components/grid-empleados-componet/grid-empleados-componet.component';
import { FormsModule, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiGetService } from './Components/grid-empleados-componet/api.service';
import { PopupCrearEmpleadosComponent } from './Components/popup-crear-empleados/popup-crear-empleados.component';
import { ApiGuardarService } from './Components/popup-crear-empleados/apiGuardar.service';
// import {MatButton} from '@angular/material/button'
// import { BrowserAnimationsModule} from '@angular/material'
// import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    GridEmpleadosComponetComponent,
    PopupCrearEmpleadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    // FormControl,
    ReactiveFormsModule,
    // MatButton
    // MatSliderModule,
    // MatButton
  ],
  providers: [ApiGetService,
    ApiGuardarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
