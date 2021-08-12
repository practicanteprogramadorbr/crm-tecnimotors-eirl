import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'clientes', component: ClientesComponent,
    children: [
      { path: 'view', component: ViewComponent },
      { path: 'create', component: FormComponent },
      { path: 'edit/:id', component: FormComponent },
      { path: 'list', component: ListComponent },
      { path: '', pathMatch: 'full', redirectTo: '/clientes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
