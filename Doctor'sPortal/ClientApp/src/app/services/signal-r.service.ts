import { EventEmitter,Injectable, Inject, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from '../shared/models/chartmodel';
import { HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnInit {
  
  public data: ChartModel[];
  onMessageReceived = new EventEmitter<any>();  
  private hubConnection: signalR.HubConnection;   
  endPoint:string;
  headers: HttpHeaders;
  httpOptions: {};
  
  constructor(@Inject(APP_CONFIG) config: AppConfig) {        
        this.endPoint=config.apiEndpoint;

        this.headers = new HttpHeaders({         
           'Access-Control-Allow-Origin': '*' ,          
          'Access-Control-Allow-Method': 'PUT, POST, GET, DELETE, OPTIONS' ,
           'Access-Control-Allow-Headers': '*' ,
           'Content-Type': 'application/json; charset=utf-8',          
      });
      this.httpOptions = {
          headers: this.headers,

      };
    }

  ngOnInit(): void {  }
  public startConnection = () => {    
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(this.endPoint +'chart')
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => 
        {
          
          console.log('Error while starting connection: ' + err)
        })       
  }  
  public registerEvents() {
    console.log("registered");
    this.hubConnection.on('newnotesadded', (message: any) => {  
          
      console.log("logged");
      this.onMessageReceived.emit(message);
    })
  }  
  // private setupHubEventListener() {
  //   const evt = "newUserAdded";
  //   this.hubConnection.on(evt, (data: any) => {
  //     this.onMessageReceived.emit(data);
  //   });
  // }
}