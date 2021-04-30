import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { apiresponse } from '../shared/models/responsemodel';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  headers: HttpHeaders;
  httpOptions: {};
  endPoint:string;
  
  constructor(private http: HttpClient,@Inject(APP_CONFIG) config: AppConfig) {
      this.headers = new HttpHeaders({         
          'Access-Control-Allow-Origin': '*' ,
          'Access-Control-Allow-Method': 'GET, POST, PATCH, PUT, DELETE, OPTIONS' ,
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token' ,
          'Content-Type': 'application/json; charset=utf-8'
      });
      this.httpOptions = {
          headers: this.headers
      };
      this.endPoint=config.apiEndpoint;      
  }

  GetPatients() {    
    return this.http.get<apiresponse>(this.endPoint + 'api/patients',this.httpOptions)
  }

  GetPatient(id:any) {    
    return this.http.get<apiresponse>(this.endPoint + 'api/patientById/' + id,this.httpOptions)
  }
}
