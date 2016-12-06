import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProcService } from '../proc.service';
import { Procedure } from './shared/procedure';
import { Clinic } from './shared/clinic';

@Component({
  selector: 'app-proc',
  templateUrl: './proc.component.html',
  styleUrls: ['./proc.component.css'],
  providers: [AuthService, ProcService]
})
export class ProcComponent implements OnInit {
  procedures: Array<Procedure>;
  clinic: Clinic;
  constructor(private AuthService: AuthService, private router: Router, private procService: ProcService) { }

  ngOnInit() {
  	// redirect to login if not logged in 
  	if (!this.AuthService.isLoggedIn()) {
  		console.log("user is not logged in. redirecting to login");
  		this.router.navigate(['login']);
  	}
    this.getProcedures();
    this.getClinic();
  }

  getProcedures() { 
    this.procService.getProcedures()
    .subscribe(
      data => {console.log("getting procedures "); this.expandProcedures(data)},
      err => console.log("get procedure error: " + err)
      );
  }

  getClinic() {
    this.procService.getClinic()
    .subscribe(
      data => {console.log("getting clinics"); this.clinic = data},
      err => console.log("get clinic error: " + err)
      );
  }

  expandProcedures(procedures) {
    this.procedures = procedures;
  }

  expandClinic(clinic) {
    
  }

  
  loadMeds(){
    this.router.navigate(['medication']);
  }

  loadProcDetails(id){
    this.router.navigate(['procedures/' + id]);
  }


}