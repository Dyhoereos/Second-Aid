import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Clinic } from './proc/shared/clinic';
import { Medication } from './proc/shared/medication';
import { MedicationInstruction } from './proc/shared/medicationinstruction';
import { Preinstruction } from './proc/shared/preinstruction';
import { Procedure } from './proc/shared/procedure';
import { Question } from './proc/shared/question';
import { Subprocedure } from './proc/shared/subprocedure';
import { Video } from './proc/shared/video';
import { Patientproc } from './Patientproc';
import { Schedule } from './schedule';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProcService {

  private CLINIC_URL = "http://secondaid.azurewebsites.net/api/Clinics/";
	private MEDICATION_URL = "http://secondaid.azurewebsites.net/api/Medications";
	private MEDICATION_INSTRUCIONS_URL = "http://secondaid.azurewebsites.net/api/MedicationInstructions";
	private PREINSTRUCIONS_URL = "http://secondaid.azurewebsites.net/api/PreInstructions";
	private PROCEDURES_URL = "http://secondaid.azurewebsites.net/api/Procedures";
	private QUESTIONS_URL = "http://secondaid.azurewebsites.net/api/Questionnaires/"; // takes subprocedure id
	private SUBPROCEDURES_URL = "http://secondaid.azurewebsites.net/api/SubProcedures";
  private PATIENT_URL = "http://secondaid.azurewebsites.net/api/UserInfo";
	private VIDEOS_URL = "http://secondaid.azurewebsites.net/api/Videos";
  private PATIENTPROC_URL = "http://secondaid.azurewebsites.net/api/patientprocedures";
  private PATIENTSCHED_URL = "http://secondaid.azurewebsites.net/api/schedules";

  constructor(private http: Http) { }

  getHeaders(){
    	let headers = new Headers();
      headers.append('Accept', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);	
    return headers;
  }

  getClinic(id){
    let headers = this.getHeaders();

    return this.http.get(this.CLINIC_URL + id, {headers})
      .map(response => response.json());
  }

  getClinics(){
    let headers = this.getHeaders();

    return this.http.get(this.CLINIC_URL, {headers})
      .map(response => response.json());
  }

  getMedication(id){
    let headers = this.getHeaders();

    return this.http.get(this.MEDICATION_URL + "/" + id, {headers})
      .map(response => response.json());
  }

  getMedicationInstructions(id){
  	let headers = this.getHeaders();

  	return this.http.get(this.MEDICATION_INSTRUCIONS_URL + '/' + id, {headers})
      .map(response => response.json());
  }

  getPreinstruction(id){
  	let headers = this.getHeaders();

  	return this.http.get(this.PREINSTRUCIONS_URL + "/" + id, {headers})
      .map(response => response.json());
  }

  getPreinstructions(){
    let headers = this.getHeaders();

    return this.http.get(this.PREINSTRUCIONS_URL, {headers})
      .map(response => response.json());
  }

  getProcedures(){
  	let headers = this.getHeaders();

  	return this.http.get(this.PROCEDURES_URL, {headers})
    .map(response => response.json());
  }

  getProcedure(id){
    let headers = this.getHeaders();

    return this.http.get(this.PROCEDURES_URL + "/" + id, {headers})
    .map(response => response.json() as Procedure);
  }

  getQuestions(){
    let headers = this.getHeaders();

    return this.http.get(this.QUESTIONS_URL, {headers})
      .map(response => response.json());
  }

  getQuestion(id){
  	let headers = this.getHeaders();

  	return this.http.get(this.QUESTIONS_URL + "/" + id, {headers})
      .map(response => response.json());
  }

  getSubprocedures(){
    let headers = this.getHeaders();

    return this.http.get(this.SUBPROCEDURES_URL, {headers})
      .map(response => response.json());
  }

  getSubprocedure(id){
  	let headers = this.getHeaders();

  	return this.http.get(this.SUBPROCEDURES_URL + "/" + id, {headers})
      .map(response => response.json());
  }

  getPatient(){
    let headers = this.getHeaders();

    return this.http.get(this.PATIENT_URL, {headers})
      .map(response => response.json());
  }

  getVideo(id){
  	let headers = this.getHeaders();

  	return this.http.get(this.VIDEOS_URL + "/" + id, {headers})
      .map(response => response.json());
  }

  getVideos(){
    let headers = this.getHeaders();

    return this.http.get(this.VIDEOS_URL, {headers})
      .map(response => response.json());
  }

  getPatientProcedure(){
    let headers = this.getHeaders();

    return this.http.get(this.PATIENTPROC_URL, {headers})
      .map(response => response.json() as Patientproc[]);
  }

  getPatientSchedule(){
    let headers = this.getHeaders();

    return this.http.get(this.PATIENTSCHED_URL, {headers})
      .map(response => response.json() as Schedule[]);
  }
}
