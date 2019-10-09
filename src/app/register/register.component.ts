import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { Router } from '@angular/router';
import { ValuesService } from '../services/ValuesService.service';
import { AlertifyService } from '../services/AlertifyService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  model: any = {};
  values: any;
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm : FormGroup;

  constructor(private authService: AuthService,
              private valuesService: ValuesService,
              private alertify: AlertifyService,
              public router: Router) { 
    
  }

  ngOnInit() {
   this.registerForm = new FormGroup({
    username: new FormControl( '', Validators.required),
    password: new FormControl( '', [Validators.required,Validators.minLength(4),Validators.maxLength(8)])
   });
  }

  getValues() {
    this.valuesService.getValues().subscribe((response => {
      this.values = response;
    }),
      (error: any) => {
        console.log('valuesService get operation failed...');
        this.alertify.error(error);    
      });
  }

  register() {
    console.log(this.model);

    if(this.registerForm.valid){

      this.model.username =this.registerForm.get('username').value;
      this.model.password =this.registerForm.get('password').value;
     this.authService.register(this.model).subscribe((data: any) => {
          this.alertify.success("Registration Successfull");    
          },
          error => {
            this.alertify.error(error);    
          }
        );    
    }
    else  {
      this.alertify.warning("Please fill missing part...");    
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.warning('canceled');    
    this.router.navigateByUrl('/home');
  }

}
