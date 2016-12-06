import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Token } from '../token';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  token: Token;
  user:User = new User();

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
    // if user is already logged in, redirect to /procedures, otherwise keep them at /login
    if (this.AuthService.isLoggedIn()){
      console.log("user is already logged in, redirecting to /procedures");
      this.router.navigate(['/procedures']);
    } else {
      console.log("user is not logged in, staying in login screen");
    }
  }

  // authenticate user login
  verify(username, password){
    console.log("verifying");
    this.AuthService.login(username, password)
      .subscribe( 
        data =>  {console.log("logged in: " + data); this.router.navigate(['/procedures']);},
        err => console.log("verify error" + err) // TODO: handle error
      );
  }


  onVerifyResult(token: Token) {
    // Assign token
    this.token = token;
  }

  handleTokenError(error: any) {
    //do something
  }

}
