import { DeleteComponent } from './employee/delete/delete.component';
import { DetailsComponent } from './employee/details/details.component';
import { AddComponent } from './employee/add/add.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:EmployeeComponent},
  {path:'add',component:AddComponent},
  {path:'details',component:DetailsComponent},
  {path:'delete',component:DeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
