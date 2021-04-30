import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from './layout/layout.module';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { HeaderComponent } from './login-layout/header/header.component';
import { LayoutOutletComponent } from './login-layout/layout-outlet/layout-outlet.component';
import { PatientsComponent } from './home/patients/patients.component';
import { PatientDetailsComponent } from './home/patient-details/patient-details.component';
import { HttpClientModule } from '@angular/common/http';
import { NotesService } from './services/notes.service';
import { APP_CONFIG,  API_ENDPOINT_CONFIG } from './app.config';
import { PatientService } from './services/patient.service';
import { MedicationService } from './services/medication.service';
import { DatePipe } from '@angular/common'
import { TextExtractService } from './services/textextract.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HomeModule } from './home/home.module';
import { MedicationComponent } from './home/medication/medication.component';
import { ProblemsService } from './services/problem.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLayoutComponent,
    HeaderComponent,
    LayoutOutletComponent,         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    LayoutModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule,
    HomeModule    
  ],
  providers: [NotesService,PatientService,MedicationService,DatePipe,TextExtractService,ProblemsService,
    {
      provide: APP_CONFIG,
      useValue: API_ENDPOINT_CONFIG     
    }],
  bootstrap: [AppComponent]  
})
export class AppModule { }
