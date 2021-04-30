import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients/patients.component'
import { PatientDetailsComponent } from './patient-details/patient-details.component';


const routes: Routes = [
    {
        path: '',       
        component: PatientsComponent
    },
    {
        path: 'patients',
        component: PatientsComponent
    },
    {
        path: 'patientsummary/:id',
        component: PatientDetailsComponent
    }

    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
