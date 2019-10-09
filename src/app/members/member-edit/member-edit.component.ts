import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/AlertifyService.service';
import { UserService } from 'src/app/services/UserService.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService.service';
import { PhotoEditorComponentComponent } from '../photo-editor-component/photo-editor-component.component';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user: User;

  @ViewChild("photoEditor",{static: true})
   photoEditor: PhotoEditorComponentComponent;
  @ViewChild("editForm",{static: false}) 
  editForm: NgForm;
  photoUrl: string;

  constructor(private root: ActivatedRoute,
            private alertify: AlertifyService,
            private userService: UserService,
            private authService: AuthService) { }

  ngOnInit() {
    this.root.data.subscribe((data:any) =>{
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photourl => this.photoUrl = photourl);
  }

  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe((data:any) =>{
      this.editForm.reset(this.user);
      this.alertify.success("Profile updated");      
    },error => {
      this.alertify.error(error);
    });    
  }

  tabClick(){
    this.photoEditor.photos = this.user.photos;
    this.photoEditor.user = this.user;
  }

}
