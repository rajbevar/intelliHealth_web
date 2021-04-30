import { Injectable,Inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { apiresponse } from '../shared/models/responsemodel';


@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

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
  GetProblems(id:any) {
    return this.http.get<apiresponse>(this.endPoint + 'api/problems?id='+id +'&category=1',this.httpOptions)
  }
  CreateProblems(problems: any,id:any) { 
    return this.http.post(this.endPoint  + 'api/problems?externalId='+id, problems,this.httpOptions);    
	}

}
