import { Component, OnInit, Input } from '@angular/core';
import { Token } from './token';
import { AuthService } from './auth.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'app works!';
  token: Token;
  user:User = new User();

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {}

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