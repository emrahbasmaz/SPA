import { User } from '../models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/UserService.service';
import { AlertifyService } from '../services/AlertifyService.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from '../services/AuthService.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{

    pageSize = 5;
    pageNumber=1;
    messageContainer  = 'Unread';

    constructor(private userService: UserService,
             private router: Router,
             private authService : AuthService,
             private alertify: AlertifyService) {                
    }

    resolve(route: ActivatedRouteSnapshot) : Observable<Message[]>{

        return this.userService.getMessages(this.authService.decodedToken.nameid,
                                            this.pageNumber,this.pageSize,
                                            this.messageContainer)
        .pipe(
            catchError(error =>{
            this.alertify.error("Problem retrieving data --> MessagesResolver");
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}