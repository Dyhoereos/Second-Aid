import { Component, OnInit } from '@angular/core';
import { ProcService } from '../proc.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';

import { Procedure } from '../proc/shared/procedure';
import { Subprocedure } from '../proc/shared/subprocedure';
import { Preinstruction } from '../proc/shared/preinstruction';
import { Video } from '../proc/shared/video';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-proc-detail',
  templateUrl: './proc-detail.component.html',
  styleUrls: ['./proc-detail.component.css'],
  providers: [AuthService, ProcService]
})
export class ProcDetailComponent implements OnInit {
  procedure: Procedure;
  allSubprocedures: Array<Subprocedure>;
  neededSubprocedures: Array<Subprocedure> = [];
  videos: Array<Video>;
  preinstructions: Array<Preinstruction>;

  constructor(private AuthService: AuthService, 
              private ProcService: ProcService, 
              private route: ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {
    this.route.params
    this.getProcedure(this.route.snapshot.params['id']);
    this.getAllVideosAndPreinstructions();
  }

   getProcedure(id){
    this.ProcService.getProcedure(id)
      .subscribe(
        procedure => {console.log("getting procedure "); 
               this.procedure = procedure;
               this.ProcService.getSubprocedures()
                   .subscribe(
                         subprocedures => {this.allSubprocedures = subprocedures; this.getSpecificSubProcedures()},
                         subprocErr => console.log("get all subproc error: " + subprocErr)
                     );
               },
        procErr => console.log("get procedure error: " + procErr),
      );
   }

   getAllVideosAndPreinstructions(){
     this.ProcService.getVideos()
         .subscribe(
               videos => {this.videos = videos; console.log("got vids " + videos);},
               vidErr => console.log(vidErr)
           );
     this.ProcService.getPreinstructions()
         .subscribe(
               preinstructions => {this.preinstructions = preinstructions; console.log("got preinstructions " + preinstructions);},
               preInstErr => console.log(preInstErr)
           );
   }

   getSpecificSubProcedures(){
       for (let sp of this.allSubprocedures){
           if (sp.procedureId == this.procedure.procedureId){
               this.neededSubprocedures.push(sp);
           }
       }
   }

   getPreinstructions(id){
       var tmp: Array<Preinstruction> = [];
       for (let pi of this.preinstructions){
           if (pi.subProcedureId == id){
             tmp.push(pi);
           }
       }
       return tmp;
   }

   getVideos(id){
       var tmp: Array<Video> = [];
       for(let v of this.videos){
           if (v.subProcedureId == id){
              tmp.push(v);
       }
       return tmp;
   }


}