import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {User} from '../user';
import { Token } from '../token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: Token;
  user:User = new User();

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }


  verify(user : User): void {
    this.AuthService
      .getToken(user.username, user.password)
      .then(token => this.onVerifyResult(token))
      .catch(error => this.handleTokenError(error))
  }


  onVerifyResult(token: Token) {
    // Assign token
    this.token = token;
  }

  handleTokenError(error: any) {
    //do something
  }

}
