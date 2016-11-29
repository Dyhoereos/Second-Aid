import { Injectable } from '@angular/core';
import {Token} from './token';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  
  BASE_URL = "http://2aid.azurewebsites.net"

  constructor(private http: Http) { }

  //GET TOKEN CALL
  getToken(username: string, password: string): Promise<Token> {
    // VARS
    var body = 'grant_type=password&username=' + username + '&password=' + password;
    var headers3 = new Headers();
    headers3.append('Content-Type', 'application/x-www-form-urlencoded');
    //RETURN TOKEN OR ERROR
    return this.http
      .post(this.BASE_URL + '/connect/token', body, { headers: headers3 })
      .toPromise()
      .then(response => response.json() as Token)
      .catch(this.handleError);
  }

// ERROR HANDLER
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
