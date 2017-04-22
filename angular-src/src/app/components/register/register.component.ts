import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Here we are making properties of RegisterComponent i.e. the values it is going to use from form
  name: String;
  username: String;
  email: String;
  password: String;

//Everytime we import a service we need to include that in the constructor
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

    //Creating a local user variable to be used in below fucntions
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //Required fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Calling registerUser() to initiate the POST request
    //Since we used .map in registerUser (observable) we have to use .subscribe()
    //Inside this subscribe we are going to get out data (res.json)
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now Registered and can Log in', {cssClass: 'alert-success', timeout: 3000});
        //Now since registration happened successfully we can now route the user to login page
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wring while Registering', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
