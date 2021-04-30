import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { patient } from 'src/app/shared/models/patientmodel';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients:patient;
  totalPatients:number;
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private patientService: PatientService,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,

  ) { }

  ngOnInit() {
    this.ng4LoadingSpinnerService.show();
    this.patientService.GetPatients().subscribe(result => {  
         
      this.patients = result.result.results;
      this.totalPatients=result.result.count;   
      this.ng4LoadingSpinnerService.hide();
    });
  }

  myClickFunction(id:any)
  {
    //id=3454545;
    
    this.router.navigate( ['patients/patientsummary',id],{state: {externalId: id}}); 
  }

}
