import { User } from '../models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/UserService.service';
import { AlertifyService } from '../services/AlertifyService.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/AuthService.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UserService,
             private router: Router,
             private authService: AuthService,
             private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot) : Observable<User>{
        var user = JSON.parse(localStorage.getItem('user'));
        if(this.authService.decodedToken == null){
            return this.userService.getUser(user.getItem("id"))
            .pipe(
                catchError(error =>{
                this.alertify.error("Problem retrieving data on MemberEditResolver");
                this.router.navigate(['/members']);
                return of(null);
            }));
        }
        return this.userService.getUser(this.authService.decodedToken.nameid)
        .pipe(
            catchError(error =>{
            this.alertify.error("Problem retrieving data on MemberEditResolver");
            this.router.navigate(['/members']);
            return of(null);
        }));
    }
}