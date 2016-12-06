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
  medication: Array<Medication>
  medicationInstruction: Array<MedicationInstruction> = []  ;
  constructor(private AuthService: AuthService, private router: Router, private procService: ProcService) { }

  ngOnInit() {
  	if (!this.AuthService.isLoggedIn()) {
  		console.log("user is not logged in. redirecting to login");
  		this.router.navigate(['login']);
  	}
    this.getMedication()
  }

  getMedication() { 
    this.procService.getMedication()
    .subscribe(
      data => {console.log("getting medication "); this.medication = data;},
      err => console.log("get medication error: " + err),
      () => this.parseMedicationInfo()
      );
  }

  getMedicationInfo(id) { 
    this.procService.getMedicationInstructions(id)
    .subscribe(
      data => {console.log("getting medication info " + data); this.buildMedInfoArray(data);},
      err => console.log("get medication error: " + err)
    );
  }

  parseMedicationInfo(){
  	for (let p of this.medication){
  		this.getMedicationInfo(p.medicationId);
  	}
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

