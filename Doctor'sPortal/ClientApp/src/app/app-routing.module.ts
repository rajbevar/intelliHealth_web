import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientsComponent } from './home/patients/patients.component';


const routes: Routes = [
  {
    children: [
      {
        component: LoginComponent,
        path: ''
      }
    ],   
    path: 'login',
  },
  {
    children: [
      {
        component: LoginComponent,
        path: ''
      }
    ],   
    path: '',
  },

    
];

@NgModule({
  //declarations: [HomeComponent,LoginComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
