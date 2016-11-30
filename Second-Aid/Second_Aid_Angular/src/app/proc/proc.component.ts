import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proc',
  templateUrl: './proc.component.html',
  styleUrls: ['./proc.component.css'],
  providers: [AuthService]
})
export class ProcComponent implements OnInit {

  constructor(private AuthService: AuthService,private router: Router) { }

  ngOnInit() {
  	// redirect to login if not logged in 
  	if (!this.AuthService.isLoggedIn()){
  		console.log("user is not logged in. redirecting to login");
  		this.router.navigate(['login']);
  	}
  }

}