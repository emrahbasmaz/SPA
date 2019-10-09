import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/UserService.service';
import { AlertifyService } from 'src/app/services/AlertifyService.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService.service';
import { HttpResponse } from '@angular/common/http';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList =[{value: 'male', display:'Males'},{value:'female', display:'Females'}]
  userParams: any ={};
  pagination: Pagination;
  paginatedResult : PaginatedResult<User[]> = new PaginatedResult<User[]>();

  constructor(private userService: UserService,
    private root: ActivatedRoute,
    private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.root.data.subscribe((data:any)=>{
      this.users= data['user'].result;
      this.pagination = data['user'].pagination;
    });
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.userId = this.user.id ;
    this.userParams.orderBy= 'lastActive';
  }

  loadUsers(){
    this.userService.getUsers( this.pagination.currentPage, this.pagination.itemsPerPage,this.userParams)
    .subscribe((response: PaginatedResult<User[]>) => {
      this.users = response.result;
      this.pagination = response.pagination;
    },error =>{
      this.alertify.error(error);
    });
  }

  resetFilters(){
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  smallnumPages(){
    console.log("smalnum");
  }

}
