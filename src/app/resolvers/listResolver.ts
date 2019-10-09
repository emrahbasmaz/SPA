import { User } from '../models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/UserService.service';
import { AlertifyService } from '../services/AlertifyService.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListResolver implements Resolve<User[]>{

    pageSize = 5;
    pageNumber=1;
    likeParams ='Likers';
    userParams:any ={};

    constructor(private userService: UserService,
             private router: Router,
             private alertify: AlertifyService) {
                let user :any = JSON.parse(localStorage.getItem('user')); 
                
                this.userParams.gender = user.gender;
                this.userParams.minAge = 18;
                this.userParams.maxAge = 99;
                this.userParams.userId = user.id;
                this.userParams.orderBy = 'lastActive';
    }

    resolve(route: ActivatedRouteSnapshot) : Observable<User[]>{

        return this.userService.getUsers(this.pageNumber,this.pageSize, this.userParams,this.likeParams)
        .pipe(
            catchError(error =>{
            this.alertify.error("Problem retrieving data --> ListResolver");
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}