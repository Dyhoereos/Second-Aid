import { Component, OnInit, Input, NgZone } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app works!';
  loggedIn : Boolean;
  
  constructor(private AuthService: AuthService) {
   }

  ngOnInit(): void {
    if (this.AuthService.isLoggedIn()){
      this.loggedIn=true;
    } else {
      this.loggedIn=false;
    }
  }

}