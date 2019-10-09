import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../services/ValuesService.service.js';
import { AlertifyService } from '../services/AlertifyService.service.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  values: any;
  
  constructor(public valuesService: ValuesService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getValues();
  }

  registerToggle() {
    
    this.registerMode = true;
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

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}

