import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProcService } from '../proc.service';
import { Procedure } from './shared/procedure';
import { Clinic } from './shared/clinic';
import { Patientproc } from '../Patientproc';

@Component({
  selector: 'app-proc',
  templateUrl: './proc.component.html',
  styleUrls: ['./proc.component.css'],
  providers: [AuthService, ProcService]
})
export class ProcComponent implements OnInit {
  procedures: Array<Procedure> = [];
  clinic: Clinic;
  patientProcedures: Array<number>=[];
  constructor(private AuthService: AuthService, private router: Router, private procService: ProcService) { }

  ngOnInit() {
  	// redirect to login if not logged in 
  	if (!this.AuthService.isLoggedIn()) {
  		console.log("user is not logged in. redirecting to login");
  		this.router.navigate(['logout']);
  	}
    this.getPatientProcedures();
    this.getClinic();
  }

  // getProcedures() { 
  //   this.procService.getProcedures()
  //   .subscribe(
  //     data => {console.log("getting procedures "); this.expandProcedures(data)},
  //     err => console.log("get procedure error: " + err)
  //     );
  // }

 getPatientProcedures() { 
    this.procService.getPatientProcedure()
    .subscribe(
      data => {console.log("getting patient procedures "); this.extractProcedureInfo(data)},
      err => console.log("get patient procedure error: " + err)
      );
  }

  extractProcedureInfo(procedures: Patientproc[]){
    //save all patient's procedure ids
    for(var i = 0; i<procedures.length; i++){
      this.patientProcedures.push(procedures[i].procedureId);
    }
    //call procedures
    this.getProcedures();
  }

  getProcedures() { 
    this.procService.getProcedures()
        .subscribe(
          data => {console.log("getting procedures "); this.expandProcedures(data)},
          err => console.log("get procedure error: " + err)
          );
    }
  
  expandProcedures(procedures: Procedure[]) {
    var i = 0;
    var j = 0;
    while(i< this.patientProcedures.length){
      if(procedures[j].procedureId == this.patientProcedures[i]){
         this.procedures.push(procedures[j]);
        i++;
        //j=0; should be in order
      }
      else
        j++;
    }
  }


  getClinic() {
    this.procService.getClinic(localStorage.getItem('clinic'))
    .subscribe(
      data => {console.log("getting clinics"); this.clinic = data},
      err => console.log("get clinic error: " + err)
      );
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