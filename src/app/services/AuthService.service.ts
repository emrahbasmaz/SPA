import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    baseUrl = environment.apiUrl+'api/auth/';
    userToken: any;   
    decodedToken:any; 
    currentUser: User;
    photoUrl = new BehaviorSubject<string>('../../assets/user.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    constructor(private http: HttpClient,
                public jwtHelper: JwtHelperService) { 
    }

    changeMemberPhoto(photoUrl : string){
        this.photoUrl.next(photoUrl);
    }
  
    login(model): Observable<any>{
        return  this.http.post(this.baseUrl + 'login', model)
        .pipe(          
          map((response: any) => {
            const user = response;
            if (user && user.tokenString) {
              localStorage.setItem('token', user.tokenString);
              localStorage.setItem('user', JSON.stringify(user.user));
              this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
              this.currentUser = user.user;
              this.userToken = user.tokenString;
              this.changeMemberPhoto(this.currentUser.photoUrl);
              // console.log(this.userToken);
              const token = localStorage.getItem('token');               
              localStorage.setItem('username',this.decodedToken.unique_name);    
           }
          })
          );

        // .subscribe((response: any) => {
        //   const user = response;
        //       if (user && user.tokenString) {
        //         localStorage.setItem('token', user.tokenString);
        //         localStorage.setItem('user', JSON.stringify(user.user));
        //         this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        //         this.currentUser = user.user;
        //         this.userToken = user.tokenString;
        //         this.changeMemberPhoto(this.currentUser.photoUrl);
        //         // console.log(this.userToken);
        //         const token = localStorage.getItem('token');               
        //         localStorage.setItem('username',this.decodedToken.unique_name);    
        //      }
        // },
        // error => {
        //   console.log(error);
        // });
    }
  

    loggedIn(){
      const token = localStorage.getItem('token');      
      return !this.jwtHelper.isTokenExpired(token);
    }
  
    register(model: any) {
      console.log(model);
      return this.http.post(this.baseUrl + 'register', model, {headers: new HttpHeaders()
          .set('Content-Type','application/json')
        });
    }

    private handleError(error:any){
      const applicationError = error.headers.get('Application-Error');
      if(applicationError){
        return Observable.throw(applicationError);
      }
        const serverError =error.json();
        let modelStateError = '';
        if(serverError){
          for(const key in serverError){
            if(serverError[key]){
              modelStateError += serverError[key] + '\n';
            }
          }
        }
        return Observable.throw(modelStateError || 'Server Error');
    }
  }