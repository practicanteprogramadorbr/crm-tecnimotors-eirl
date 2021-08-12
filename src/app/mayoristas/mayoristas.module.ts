import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayoristasRoutingModule } from './mayoristas-routing.module';
import { ViewMComponent } from './view-m/view-m.component';
import { FormMComponent } from './form-m/form-m.component';
import { ListMComponent } from './list-m/list-m.component';
import { MayoristasComponent } from './mayoristas.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';


@NgModule({
  declarations: [
    ViewMComponent,
    FormMComponent,
    ListMComponent,
    MayoristasComponent
  ],
  imports: [
    CommonModule,
    MayoristasRoutingModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    NotifierModule
  ],
  exports: [
    ViewMComponent,
    FormMComponent,
    ListMComponent,
    MayoristasComponent
  ]
})
export class MayoristasModule { }
