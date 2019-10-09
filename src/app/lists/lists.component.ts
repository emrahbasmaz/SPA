import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Pagination, PaginatedResult } from '../models/pagination';
import { UserService } from '../services/UserService.service';
import { AuthService } from '../services/AuthService.service';
import { AlertifyService } from '../services/AlertifyService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users :User[];
  pagination: Pagination = null;
  likesParam:string;
  userParams: any ={};

  constructor(private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute){ }

  ngOnInit() {
    this.route.data.subscribe( data => {
      if(data['users'].result.length == 0){
        this.alertify.warning('Likers not Found');
      }
      else{
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    }
    });
    this.likesParam = 'Likers';

    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.userId = this.authService.decodedToken.nameid;
    this.userParams.orderBy= 'lastActive';
  }

  loadUsers(){
    if(this.pagination != null){

    this.userService.getUsers( this.pagination.currentPage, this.pagination.itemsPerPage,this.userParams,this.likesParam)
    .subscribe((response: PaginatedResult<User[]>) => {
      this.users = response.result;
      this.pagination = response.pagination;
    },error =>{
      this.alertify.error(error);
    });
  }
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
