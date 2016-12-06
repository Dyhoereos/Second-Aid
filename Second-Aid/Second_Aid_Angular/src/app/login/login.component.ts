import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Clinic } from '../proc/shared/clinic';
import { Token } from '../token';
import { Router } from '@angular/router';
import { ProcService } from '../proc.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, ProcService]
})
export class LoginComponent implements OnInit {
  error: string;
  clinic: Clinic;

  constructor(private AuthService: AuthService, private router: Router, private ProcService: ProcService) { }

  ngOnInit() {
    // if user is already logged in, redirect to /procedures, otherwise keep them at /login
    if (this.AuthService.isLoggedIn()){
      console.log("user is already logged in, redirecting to /procedures");
      this.router.navigate(['/procedures']);
    } else {
      console.log("user is not logged in, staying in login screen");
    }

    this.getClinics();
  }

  // authenticate user login
  verify(username, password, clinic){
    console.log("verifying");
    this.AuthService.login(username, password, clinic)
      .subscribe( 
        data =>  {console.log("logged in: " + data); this.router.navigate(['/procedures']);},
        err => {console.log("login error " + err); this.error = "Login failed. Please check your username, password or clinic id.";}
      );
  }
   
   getClinics(){
       this.ProcService.getClinics()
           .subscribe(
               clinics => {console.log("got clinics list"); this.clinic = clinics},
               clinicErr => {console.log("error getting clinics list: " + clinicErr);}
            );
   }
}
