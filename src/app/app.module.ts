import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeService} from './service/employee.service';
import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeDynamicFormComponent } from './employee-dynamic-form/employee-dynamic-form.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListChildComponent } from './employee-list-child/employee-list-child.component';
import { EmployeeSearchChildComponent } from './employee-search-child/employee-search-child.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/employee', pathMatch: 'full'},
  {path: 'employee', component: EmployeeListComponent},
  {path: 'employee/:id', component: EmployeeDetailsComponent},
  {path: 'edit/:id', component: EmployeeDynamicFormComponent},
  // {path: 'create', component: EmployeeCreateComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeDynamicFormComponent,
    EmployeeDetailsComponent,
    EmployeeListChildComponent,
    EmployeeSearchChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
