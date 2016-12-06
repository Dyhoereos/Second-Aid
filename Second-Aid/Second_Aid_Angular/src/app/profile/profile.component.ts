import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProcService } from '../proc.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService, ProcService]
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(private AuthService: AuthService, private router: Router, private ProcService: ProcService) { }

  ngOnInit() {
  	  // redirect to login if not logged in 
    	if (!this.AuthService.isLoggedIn()){
    		console.log("user is not logged in. redirecting to login");
    		this.router.navigate(['logout']);
    	}

      this.getPatientInfo();
  }

  getPatientInfo(){
      this.ProcService.getPatient()
          .subscribe(
              patient => {console.log("got patient profile info"); this.user = patient;},
              patientErr => {console.log("get patient profile info error " + patientErr);}
          );
  }


}
