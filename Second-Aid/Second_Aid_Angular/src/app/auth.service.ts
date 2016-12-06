import { Injectable } from '@angular/core';
import {Token} from './token';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {
  BASE_URL = "http://secondaid.azurewebsites.net"

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
    let creds: string = 'username='+username+'&password='+password+'&grant_type=password'+'&clinic_id=1';
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
          var expiryTime = new Date();
          expiryTime.setSeconds(expiryTime.getSeconds() + res.expires_in)
          localStorage.setItem('expiry_time', expiryTime.toUTCString())
          return true;
        }
        return false;
      });
  }

  isLoggedIn() {
    // check if token exists
    let authToken = localStorage.getItem('auth_token');
    if (authToken === null) return false;
    
    // compare token expiry time with current time
    let expiryTime = new Date(localStorage.getItem('expiry_time'));
    let currentTime = new Date();
    
    return expiryTime.toUTCString() > currentTime.toUTCString();
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expiry_time');
  }

}
