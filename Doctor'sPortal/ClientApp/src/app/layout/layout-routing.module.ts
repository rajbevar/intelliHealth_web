import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutOutletComponent } from './layout-outlet/layout-outlet.component';
import { PatientsComponent } from '../home/patients/patients.component';
import { PatientDetailsComponent } from '../home/patient-details/patient-details.component';


const routes: Routes = [
    {
        path: 'patients',
        component: LayoutOutletComponent,
        children: [           
            {
                path: '',               
                component: PatientsComponent
            },
            {
                path: 'patients',
                component: PatientsComponent
            },
            {
                // path: 'patientsummary',
                // component: PatientDetailsComponent
                
                    path: 'patientsummary/:id',
                    component: PatientDetailsComponent
                
            }
        ],
        //canActivate: [AuthGuard]
    }    
    
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
