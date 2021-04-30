import { Injectable,Inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { NoteModel, TestNote } from '../shared/models/note';
import { ParseModel } from '../shared/models/parsemodel';
import { apiresponse } from '../shared/models/responsemodel';


@Injectable({
  providedIn: 'root'
})
export class TextExtractService {

  headers: HttpHeaders;
  httpOptions: {};
  endPoint:string;
  data:TestNote;
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
  
  GetExtractedData(note:any,externalId:any) {    
    //api/v2/Medical/entities/extraction
   // return this.http.get<apiresponse>(this.endPoint + 'api/medical/entities/extraction',this.httpOptions)
    this.data={notes:note};
    return this.http.post<apiresponse>(this.endPoint + 'api/patient/'+ externalId + '/medical/entities/awsextraction',this.data,this.httpOptions)
 }

  GetSuggestionData(externalId:any) {    
    //api/v2/Medical/entities/extraction
    return this.http.get<apiresponse>(this.endPoint + 'api/patient/'+externalId+'/medicals/suggestions',this.httpOptions)
 }
  

}
