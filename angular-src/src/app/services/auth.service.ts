import { Injectable } from '@angular/core';
//We want to make s POST request so we need Http module
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  //This fucntion will be called from register.component to hit the register API
  //Writing .map after the post method is an observable.
  //I think this means that we can observe the response in json format
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.169.3.13:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  //This fucntion is called at the time when user tries to login, just same as register
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.169.3.13:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  //Here we are just calling the profile API via get request
  getProfile(){
    let headers = new Headers();

    //here we are calling a fucntion written below which sets authToken
    //Since authToken is the class property we can use it here directly
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://10.169.3.13:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  //Loading token from local storage into local variable of this Class
  loadToken(){
    //Fetching locally stored token from local storage
    const token = localStorage.getItem('id_token');

    //Passing the token to authToken which is the class property of this class AuthService
    this.authToken = token
  }

  //This fucntion uses angular2-jwt module to verify if the token has been expired or not
  //We will call this from our navbar.html to enable disable different links from navbar
  loggedIn(){
    //this checks token and returns True/ False
    return tokenNotExpired();
  }
  //This function saves data in local storage in form of key-value pair
  storeData(token, user){

    //Here we are using key as id_token and not just token because there is some
    //inbuilt mechanism in Angular JWT to validate a token by using id_token automatically
    localStorage.setItem('id_token', token);

    //Local storage can only store data in form of string and not Objects
    //Token is already in form of String so we directly used it but here in case of user we are converting it
    localStorage.setItem('user', JSON.stringify(user));

    //Now we will set the 2 variable of this local class created above
    this.authToken = token;
    this.user = user;
  }

  //Logout function: The idea is to delete the locally stored token and user details
  logout(){
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }

}
