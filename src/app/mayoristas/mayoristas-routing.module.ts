import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMComponent } from './form-m/form-m.component';
import { ListMComponent } from './list-m/list-m.component';
import { MayoristasComponent } from './mayoristas.component';
import { ViewMComponent } from './view-m/view-m.component';

const routes: Routes = [
  {
    path: 'mayoristas',
    component: MayoristasComponent,
    children: [
      { path: 'view/:id', component: ViewMComponent },
      { path: 'create', component: FormMComponent },
      { path: 'edit/:id', component: FormMComponent },
      { path: 'list', component: ListMComponent },
      { path: '', pathMatch: 'full', redirectTo: 'list' }
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MayoristasRoutingModule { }
