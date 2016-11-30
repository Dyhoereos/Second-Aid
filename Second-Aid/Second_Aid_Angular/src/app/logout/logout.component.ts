import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [AuthService]
})
export class LogoutComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
  	this.AuthService.logout();
  	console.log("is logged in? " + this.AuthService.isLoggedIn());
  	this.router.navigate(['login']);
  }

}
