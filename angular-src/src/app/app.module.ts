//This is basically the metting point of all the components we will create

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

//These are user defined services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

//This is user defined guard service
import { AuthGuard } from './guards/auth.guard';

//We are here routing URL requests towards the components.
const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},

  //Since we have written a stand alone guard service we can use that directly on Routes
  //Where we wish to redorect the users in case they are not logged in properly
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  //All user defined @Components will be included here
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],

  //Anything written inside imports can be accessed throught our application
  //All the core fucntions to be used through application are included here
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //appRoutes is supposed to be an object defined above which is an array of all the routes
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],

  //All the user defined services are included here
  providers: [
    ValidateService,
    AuthService,
    AuthGuard
  ],

  //Which component is to be bootstraped at the start? comes here
  bootstrap: [AppComponent]
})
export class AppModule { }
