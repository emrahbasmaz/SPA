import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/services/AlertifyService.service';
import { UserService } from 'src/app/services/UserService.service';
import { AuthService } from 'src/app/services/AuthService.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Photo } from 'src/app/models/photo';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { PhotoForCreationDto } from 'src/app/models/photoForCreationDto';
import * as _ from 'underscore';


@Component({
  selector: 'app-photo-editor-component',
  templateUrl: './photo-editor-component.component.html',
  styleUrls: ['./photo-editor-component.component.css']
})
export class PhotoEditorComponentComponent implements OnInit {
   
  @Input() photos:Photo[];
  @Input() user: User;
  
  baseUrl: 'https://localhost:44389/';

  public progress: number;
  public message: string;
  photoForCreationDto:PhotoForCreationDto;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  currentMain:Photo;

  constructor(private http: HttpClient,
              private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { 
              }

  ngOnInit() {
    this.photoForCreationDto = new  PhotoForCreationDto();
   }

  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
  }
 
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }
   
  onSubmit() {

    const formData = new FormData();
    formData.append('files', this.fileData);
    formData.append('fileName', this.fileData.name);
    formData.append('userId', this.user.id.toString());

    // this.photoForCreationDto.formData.push(this.fileData);
    // this.photoForCreationDto.fileName = this.fileData.name;
    // this.photoForCreationDto.userId = this.user.id;
     
    this.fileUploadProgress = '0%';
 
    this.http.post('https://localhost:44389/api/Photos', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);          
        alert('SUCCESS !!');
      }         
    }) 
  }

  setMainPhoto(){

    this.userService.setMainPhoto(this.user.id, this.photos[0].id).subscribe(() =>  {
        this.currentMain = _.findWhere(this.photos,{isMain: true});
        this.currentMain.isMain = false;
        this.photos[0].isMain = true;
        this.authService.changeMemberPhoto(this.photos[0].url);
        localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });

    // this.http.post('https://localhost:44389/api/users/'+this.user.id + '/photos/' + this.user.photos[0].id+'/setMain',
    //               this.user.id);
    
  }

  deletePhoto(id:number){
    this.alertify.confirm('Are you sure do you want to delete this photo ?', ()=> {
      this.userService.deleteUser(this.authService.decodedToken.namid,id)
      .subscribe(() => {
        this.photos.splice(this.photos.findIndex(p=> p.id === id),1);
        this.alertify.success('Photo has been deleted');
        }, error => {
          this.alertify.error(error);
        }
      )
    }
    )
  }
}
