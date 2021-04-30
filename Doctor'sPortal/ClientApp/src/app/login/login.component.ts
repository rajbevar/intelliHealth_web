import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import swal from 'sweetalert2';
@Component({
  selector: 'Login',
  styles: ['./login.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public password: string;
  public email: string;
  returnUrl: string;
  model: any = {};
  constructor(
    private route: ActivatedRoute,   
    private router: Router  ,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
    
  ) {
  }

  public ngOnInit() {
    window.dispatchEvent(new Event('resize'));
   }

  login() {
    //localStorage.setItem('IsAuthendicated', "true");
    // window.location.href = this.returnUrl;
    
    let that= this;
    that.email=that.model.username;
    this.ng4LoadingSpinnerService.show();   
    if(that.model.username.toLowerCase( ) === "testuser")
    {
      this.ng4LoadingSpinnerService.hide(); 
      this.router.navigate( ['patients'] ); 
    }
  }
    

}
