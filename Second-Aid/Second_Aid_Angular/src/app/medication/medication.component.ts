import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProcService } from '../proc.service';

import { Medication } from '../proc/shared/medication';
import { MedicationInstruction } from '../proc/shared/medicationInstruction';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css'],
  providers: [AuthService, ProcService]
})
export class MedicationComponent implements OnInit {
  medication: Array<Medication> = []
  medicationInstruction: Array<MedicationInstruction> = [];
  medicationIds: Array<string>;
  constructor(private AuthService: AuthService, 
              private router: Router, 
              private procService: ProcService) { }

  ngOnInit() {
  	if (!this.AuthService.isLoggedIn()) {
  		console.log("user is not logged in. redirecting to login");
  		this.router.navigate(['logout']);
  	}

    this.getMedicationIds()
    this.getMedicationAndInfo();
  }

  getMedicationIds(){
      var fromLocalStorage = localStorage.getItem('medication_ids');
      // if (fromLocalStorage === null){
      //   this.router.navigate('procedures');
      // }
      this.medicationIds = fromLocalStorage.split(",");
  }

  getMedicationAndInfo(){
    for (let mid of this.medicationIds){
      this.getMedication(mid);
      this.getMedicationInfo(mid);
    }
  }

  getMedication(id){
    this.procService.getMedication(id)
        .subscribe(
            medication => {console.log("got medication"); this.medication.push(medication)},
            medErr => {console.log("error getting mediation " + medErr);}
        );
  }

  getMedicationInfo(id) { 
    this.procService.getMedicationInstructions(id)
    .subscribe(
      data => {console.log("getting medication info " + data); this.medicationInstruction.push(data) },
      err => console.log("get medicationinfo error: " + err)
    );
  }

  buildMedInfoArray(medInfo){
    this.medicationInstruction.push(medInfo)
  }

  checkMeds(med){
    var m: MedicationInstruction = med;
    this.medicationInstruction.push(m);
    this.medicationInstruction.filter(x => x.medicationId == m.medicationId)[0];
  }

  displayMedInfoDesc(id){
      if (this.medicationInstruction.filter(x => x.medicationId == id)[0]){
        return this.medicationInstruction.filter(x => x.medicationId == id)[0].instruction;
      }
    }
}

