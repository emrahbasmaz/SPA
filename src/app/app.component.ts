import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from './services/AuthService.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from './services/AlertifyService.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username :string;
  
  constructor(private authService: AuthService,
    private jwtHelperService: JwtHelperService){
  }

  ngOnInit(){
    const token = localStorage.getItem('token');
    const user :User = JSON.parse(localStorage.getItem('user'));
    if(token){
      
      this.authService.decodedToken =this.jwtHelperService.decodeToken(token);
      this.username = this.authService.decodedToken.unique_name;
      localStorage.setItem('username',this.username);      
    }
    if(user){
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
  
}
