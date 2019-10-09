import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/UserService.service';
import { AuthService } from 'src/app/services/AuthService.service';
import { AlertifyService } from 'src/app/services/AlertifyService.service';
import { error } from 'util';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user : User;
  constructor(private authService : AuthService,
        private userService : UserService,
        private alertify: AlertifyService) { }

  ngOnInit() {
    console.log(this.user.id);
  }

  sendLike(id:number){
    this.userService.sendLike(this.authService.decodedToken.nameid,id)
    .subscribe(()=> {
      this.alertify.success('liked' + this.user.username);
    },error => {
      this.alertify.error(error);
    });

  }

}
