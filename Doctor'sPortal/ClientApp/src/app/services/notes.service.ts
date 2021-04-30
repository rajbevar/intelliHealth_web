import { Injectable,Inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';
import { NoteModel } from '../shared/models/note';
import { ParseModel } from '../shared/models/parsemodel';
import { apiresponse } from '../shared/models/responsemodel';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

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

  updateNotes(id: any) {

    return this.http.put<apiresponse>(this.endPoint  + 'api/updateNotesParser/'+id,this.httpOptions);
    
  }
  

  GetNotes(id:any) {
    return this.http.get<apiresponse>(this.endPoint + 'api/notes?externalId='+id,this.httpOptions)
  }

  GetParsedNotes(id:any) {
    return this.http.get<apiresponse>(this.endPoint + 'api/parsedNotes?externalId='+id,this.httpOptions)
  }

  ignoreNotes(id: any) {

    return this.http.put(this.endPoint  + 'api/ignoreNotes/'+ id,this.httpOptions);
    
	}

}
