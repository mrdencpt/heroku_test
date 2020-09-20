import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { PetComponent } from './pet/pet.component';
import { RepairComponent } from './repair/repair.component';
import { MadiceenComponent } from './madiceen/madiceen.component';
import { ReportComponent } from './report/report.component';
import { ClinicComponent } from './clinic/clinic.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ShareService } from './ShareService';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'clinic',
    component: ClinicComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'pet',
    component: PetComponent
  },
  {
    path: 'repair',
    component: RepairComponent
  },
  {
    path: 'madiceen',
    component: MadiceenComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    DashboardComponent,
    CustomerComponent,
    PetComponent,
    RepairComponent,
    MadiceenComponent,
    ReportComponent,
    ClinicComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), //ผูกไปกับ Root อยู่ใน appRoutes
    HttpClientModule,
    FormsModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]

})
export class AppModule { }
