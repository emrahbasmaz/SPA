import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/AuthService.service.js';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/AlertifyService.service.js';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model: any = {};
  username:any; 
  registerMode : boolean = false;
  loggedInMode: boolean = false;
  photoUrl: string;
  constructor(public authservice: AuthService,
              private alertify: AlertifyService,
              public router: Router) { }

  ngOnInit() {
    this.authservice.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
  }

  login() {
    this.authservice.login(this.model)
      .subscribe(data => {
          this.alertify.success('Logged in Successfully');
      },
      error =>{
        this.alertify.error('Failed to Login');
      },
      () => {
        this.router.navigateByUrl('/members');
      }
    );
     
    this.username = localStorage.getItem('username');
  }

  logout() {
    this.authservice.userToken = null;
    this.authservice.currentUser = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    this.alertify.success('logged out successfully');    
    //Route to home
    this.router.navigate(['/home']);
  }

  loggedIn() {
    // this.login();
    return  this.authservice.loggedIn();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
    this.router.navigateByUrl('/register');
  }

}

