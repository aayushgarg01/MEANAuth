import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;

  //constructor contains the imported services even user defined services
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  //This method gets executed just after constructor that means all the
  //dependencies and variables are initiated, now you can run some basic initial setup logic
  //Unlike all other Components we do not need a method here to be called from aprofile.html file
  //Rather here we only want to make sure that its a genuine user, so we call getProfile()
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      //We are filling up the local user variable from what we get from /profile API
      //This value will be used in HTML to display user content
      this.user = profile.user;
    },

    //If the user would have not logged in with proper credentials a token wouldn't have been generated
    //Since there is no token in local storage it will give UNAUTHORIZED - 401 error in return
    err => {
      console.log(err);
      return false;
    });
  }

}
