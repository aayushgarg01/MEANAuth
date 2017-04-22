import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Adding properties on login components
  username: String;
  password: String;

  //constructor contains the imported services even user defined services
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {

    //Creating a local user variable to be used in below fucntions
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        //This means that the user is authenticated successfully and our authenticate API returns
        //Token as well as user details. The whole idea of a token is to maintain session for a while with it
        //So we need to store it either in cookies or local storage, we are using local storage
        this.authService.storeData(data.token, data.user);

        this.flashMessage.show('You are now Logged in', {
          cssClass: 'alert-success',
          timeout: 3000});

        //Now since registration happened successfully we can now route the user to login page
        this.router.navigate(['/dashboard']);

      } else {

        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});

        this.router.navigate(['/login']);
      }
    })
  }

}
