import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { apiresponse } from '../shared/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  headers: HttpHeaders;
  httpOptions: {};
  endPoint:string;
  
  constructor(private http: HttpClient,@Inject(APP_CONFIG) config: AppConfig) {
      this.headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*' 
      });
      this.httpOptions = {
          headers: this.headers
      };
      this.endPoint=config.apiEndpoint;      
  }
  createMedication(medicines:any)
  {
    
    return this.http.post(this.endPoint  + 'api/medication', medicines,this.httpOptions);    
    
  }

  addMedicationToFhir(medicines:any,externalId:string)
  {    
    return this.http.post(this.endPoint  + 'api/Fhir/patient/add-medicines?emrPatientId=' + externalId, medicines,this.httpOptions);    
  }

  addMedicalConditionToFhir(condition:any,externalId:string)
  {    
    return this.http.post(this.endPoint  + 'api/Fhir/patient/add-medical-conditions?emrPatientId=' + externalId, condition,this.httpOptions);    
  }

  GetMedications(id:any) {
    return this.http.get<apiresponse>(this.endPoint + 'api/medications?externalId='+id,this.httpOptions)
  }

  GetMedicationFollowUp(id:any) {
    return this.http.get<apiresponse>(this.endPoint + 'api/medications/medicationfollowup?externalId='+id,this.httpOptions)
  }
  
}
