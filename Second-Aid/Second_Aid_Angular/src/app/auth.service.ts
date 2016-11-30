import { Injectable } from '@angular/core';
import {Token} from './token';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  
  BASE_URL = "http://2aid.azurewebsites.net"

  constructor(private http: Http) {}

  //GET TOKEN CALL
  // getToken(username: string, password: string) {
  //   // VARS
  //   let body = 'grant_type=password&username=' + username + '&password=' + password;
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   //RETURN TOKEN OR ERROR
  //   return this.http
  //     .post(this.BASE_URL + '/connect/token', body, { headers: headers })
  //     .toPromise()
  //     .then(response => response.json() as Token)
  //     .catch(this.handleError);
  // }

    login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let creds: string = 'username='+username+'&password='+password+'&grant_type=password';
    return this.http
      .post(
        this.BASE_URL + '/connect/token',
        creds,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.access_token) {
          localStorage.setItem('auth_token', res.access_token);
          return true;
        }
        return false;
      });
  }

  validateToken(token){
    //make call to check token
    //return true if token is valid, else delete token from localstorage and return false
    return true;
    // localStorage.removeItem('auth_token');
    // return false;

  }

// ERROR HANDLER
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  isLoggedIn() {
    // check if token exists
    let authToken = localStorage.getItem('auth_token');
    if (authToken === null) return false;
    
    // if token exists, check if token is valid
    let validToken = this.validateToken(authToken);
    if (!validToken) return false;

    return true;
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

}
