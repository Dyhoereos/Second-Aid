import { Component, OnInit, Input} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app works!';
  
  constructor(private AuthService: AuthService) {
   }

  ngOnInit(): void {
  }

}