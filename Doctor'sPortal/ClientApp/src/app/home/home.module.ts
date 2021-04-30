import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientsComponent } from './patients/patients.component';
import { MedicationComponent } from './medication/medication.component';

@NgModule({
  declarations: [ PatientDetailsComponent, PatientsComponent, MedicationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
