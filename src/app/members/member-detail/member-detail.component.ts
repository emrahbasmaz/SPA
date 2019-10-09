import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/UserService.service';
import { AlertifyService } from 'src/app/services/AlertifyService.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';
import { TimeAgoPipe } from 'time-ago-pipe';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;

  user: User;  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe((data:any)=> {
     this.user = data['user'];
   });   

    this.route.queryParams.subscribe(params => {
       const selectedTab = params['tab'];
       this.memberTabs.tabs[selectedTab > 0  ? selectedTab : 0].active = true;
  });

   this.galleryOptions = [
    {
      width:'500px',
      height:'500px',
      imagePercent:100,
      thumbnailsColumns:4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview:false
    }
  ];
  this.galleryImages = this.getImage();
  }

  getImage(){
    const imagesUrl =[];
    for(let i=0 ; i< this.user.photos.length ; i++){

      imagesUrl.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }

    return imagesUrl;
  }

  loadUser(){
    this.userService.getUser(this.route.snapshot.params['id'])
                    .subscribe((response => {
                      this.user = response;
                    }),
                    (error => {
                      this.alertify.error(error);
                    })
    );
  }

  selectedTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

}
