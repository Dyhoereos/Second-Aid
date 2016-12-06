import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProcService } from '../proc.service';
import { Procedure } from './shared/procedure';
import { Clinic } from './shared/clinic';
import { Patientproc } from '../Patientproc';
import {Schedule} from '../Schedule'

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
  patientProceduresObj: Array<Patientproc>;
  schedule: Array<Date> = [];
  patientMeds: Array<Patientproc>=[];
  constructor(private AuthService: AuthService, private router: Router, private procService: ProcService) { }

  ngOnInit() {
  	// redirect to login if not logged in 
  	if (!this.AuthService.isLoggedIn()) {
  		console.log("user is not logged in. redirecting to login");
  		this.router.navigate(['logout']);
  	}
    this.getPatientSchedule();
    this.getClinic();
    this.getPatientProcedures();
  }
//**********Get Patient Schedule**********
 getPatientSchedule() { 
    this.procService.getPatientSchedule()
    .subscribe(
      data => {console.log("getting patient procedures "); this.extractScheduleInfo(data)},
      err => console.log("get patient procedure error: " + err)
      );
  }
  
extractScheduleInfo(procedures: Schedule[]){
    //save all patient's procedure ids
    for(var i = 0; i<procedures.length; i++){
      this.patientProcedures.push(procedures[i].procedureId);
      this.schedule.push(procedures[i].time);
      console.log(this.schedule[i]);
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
//**********end Patient Schedule**********
//**********Procedure Start*****************
 getPatientProcedures() { 
    this.procService.getPatientProcedure()
    .subscribe(
      data => {console.log("getting patient procedures "); this.extractProcedureInfo(data)},
      err => console.log("get patient procedure error: " + err)
      );
  }

  extractProcedureInfo(patientProcs){
    //save all patient's procedure ids
    for(let p of this.patientProcedures) {
        for (let pp of patientProcs){
          if (p == pp.procedureId){
              this.patientMeds.push(pp);
          }
        }
    }    
  }


  //**********Procedure End*****************


  getClinic() {
    this.procService.getClinic(localStorage.getItem('clinic'))
    .subscribe(
      data => {console.log("getting clinics"); this.clinic = data},
      err => console.log("get clinic error: " + err)
      );
  }

  expandClinic(clinic) {
    
  }

  loadMeds(id){

    this.patientMedsToStorage(id);
    this.router.navigate(['medication']);
  }

  loadProcDetails(id){
    this.router.navigate(['procedures/' + id]);
  }

  patientMedsToStorage(id){
    console.log("pushing medication string to storage");
    var medString = "";
    for (let p of this.patientMeds){
      console.log("p " + p);
        if (p.procedureId == Number(id)){
            medString += String(p.medicationId) + ",";
        }
    }
    medString = medString.slice(0, -1);
    
    console.log("med string is " + medString);
    localStorage.setItem('medication_ids', medString);
  }

}