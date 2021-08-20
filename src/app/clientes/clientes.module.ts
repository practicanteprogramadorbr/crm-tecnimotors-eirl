import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';
import { ClientesComponent } from './clientes.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ViewComponent,
    FormComponent,
    ClientesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ViewComponent,
    FormComponent,
    ClientesComponent,
    ListComponent
  ]
})
export class ClientesModule { }
