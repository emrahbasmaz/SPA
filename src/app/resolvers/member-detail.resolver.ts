import { User } from '../models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/UserService.service';
import { AlertifyService } from '../services/AlertifyService.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User>{

    constructor(private userService: UserService,
             private router: Router,
             private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot) : Observable<User>{

        return this.userService.getUser(route.params['id'])
        .pipe(
            catchError(error =>{
            this.alertify.error("Problem retrieving data");
            this.router.navigate(['/members']);
            return of(null);
        }));
    }
}