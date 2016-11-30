import { Component, OnInit } from '@angular/core';
import { ProcService } from '../proc.service';

@Component({
  selector: 'app-proc-detail',
  templateUrl: './proc-detail.component.html',
  styleUrls: ['./proc-detail.component.css'],
  providers: [ProcService]
})
export class ProcDetailComponent implements OnInit {

  constructor(private procService: ProcService) { }

  ngOnInit() {
  	this.testGets();
  }

  testGets(): void{
  	this.procService.getMedication().then(data => console.log("medication " + data));
    this.procService.getPreinstructions().then(data => console.log("preinstructions " + data));
    this.procService.getProcedures().then(data => console.log("procedures " + data));
    this.procService.getQuestions().then(data => console.log("questions " + data));
    this.procService.getSubprocedures().then(data => console.log("subprocedures " + data));
    this.procService.getVideos().then(data => console.log("videos " + data));
    this.procService.getMedicationInstructions().then(data => console.log("medinstr " + data));
  }

}
