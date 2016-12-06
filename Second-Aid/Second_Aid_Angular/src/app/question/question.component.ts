import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProcService } from '../proc.service';
import { Question } from '../proc/shared/question'
import { Subprocedure } from '../proc/shared/subprocedure'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [AuthService, ProcService]
})
export class QuestionComponent implements OnInit {
  subprocedureIds: Array<number> = [];
  procedureId: number;
  subprocedures: Array<Subprocedure>;
  questions: Array<Question> = []; 
  constructor(private AuthService: AuthService, 
              private router: Router, 
              private procService: ProcService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
  	// redirect to login if not logged in 
  	if (!this.AuthService.isLoggedIn()) {
  		console.log("user is not logged in. redirecting to login");
  		this.router.navigate(['logout']);
  	}
  	this.procedureId = this.route.snapshot.params['id'];
  	this.getProcedure(this.procedureId);
  }

  getProcedure(id){
  		this.procService.getProcedure(id)
  			.subscribe(
  				proc => {console.log("got proc "); this.getSubProcs(); },
  				procErr => {console.log("error getting proc " + procErr);}
  			);
  }

  getSubProcs(){
  		this.procService.getSubprocedures()
  			.subscribe(
  				subproc => {console.log("got subproc "); this.selectSubProcs(subproc)},
  				subprocErr => {console.log(subprocErr);}
  			);
  }

  selectSubProcs(subprocs){
  		var neededSubProcs: Array<Subprocedure> = [];
  		for(let s of subprocs){
  			if (s.procedureId == this.procedureId){
  				neededSubProcs.push(s);
  			}
  		}

  		this.getQuestions(neededSubProcs);
  }

  getQuestions(subprocs){
  		this.procService.getQuestions()
  			.subscribe(
  				questions => {console.log("got questions "); this.selectQuestions(questions, subprocs)},
  				questionsErr => {console.log(questionsErr)}
  			);
  }

  selectQuestions(questions, subprocs){
  		for(let s of subprocs){
  			for (let q of questions){
  				if (q.subprocedureId == s.subprocedureId){
  					questions.push(q);
  				}
  			}
  		}
  }

}
