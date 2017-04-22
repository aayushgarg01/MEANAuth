import { Injectable } from '@angular/core';
//This guard service will help protect our routes
import { Router, CanActivate } from '@angular/router';

//We also want to import AuthService because there we have out JWT model
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  //Its the function of the class CanActivate just line ngOnInit
  //We will over ride its function with calling our loggedIn method in auth.service
  //We will guard our application and redirect the user to login page if he is not a valid user
  canActivate(){
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
