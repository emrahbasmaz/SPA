import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpParams,HttpResponse,HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { PaginatedResult } from '../models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    
    baseUrl = environment.apiUrl+'api/';

    constructor(private http: HttpClient) {

    }

    getUsers(page?, itemsPerPage?,userParams?,likesParams?): Observable<PaginatedResult<User[]>> {
        const paginateResult : PaginatedResult<User[]> = new PaginatedResult<User[]>();
        let params = new HttpParams();
        if(page != null && itemsPerPage != null){
            params = params.append('PageNumber',page);
            params = params.append('PageSize',itemsPerPage);  
        }
        if(userParams != null){
            params = params.append('userId',userParams.userId);
            params = params.append('Gender',userParams.gender);
            params = params.append('MinAge',userParams.minAge);
            params = params.append('MaxAge',userParams.maxAge); 
            params = params.append('OrderBy',userParams.orderBy); 
        }
        if(likesParams === 'Likers'){
            params = params.append('Likers','true');
        }

        if(likesParams === 'Likees'){
            params = params.append('Likees','true');
        }
        
        return this.http.get<User[]>(this.baseUrl+'Users',{ observe: 'response',params})
        .pipe(
            map(response =>  {
                paginateResult.result  = response.body;
                if(response.headers.get('Pagination') != null){
                  paginateResult.pagination = JSON.parse(response.headers.get('Pagination'));
                }            
            return paginateResult;
            })
        );
    }

    getUser(id:any):Observable<User>{
        return this.http.get<User>(this.baseUrl+ 'Users/' + id);
    }

    updateUser(id : number, user: User){
        return this.http.put(this.baseUrl+ 'Users/'+id,user);
    }

    deleteUser(userId:number,id:number){
        return this.http.delete(this.baseUrl + 'users/'+ userId + '/photos/'+ id);
    }
    setMainPhoto(userId:number , id:number){
            return this.http.post(this.baseUrl + 'users/'+ userId + '/photos/'+ id + '/setMain' , {});
    }

    sendLike(id:number, recepientId:number){
            return this.http.post(this.baseUrl+'users/'+id+'/like/'+recepientId,{});
    }

    getMessages(id:number , page?, itemsPerPage?,messageContainer?){
        const paginateResult : PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
        let params = new HttpParams();
        if(page != null && itemsPerPage != null){
            params = params.append('PageNumber',page);
            params = params.append('PageSize',itemsPerPage);  
        }
         params = params.append('MessageContainer',messageContainer);
         //Messages?PageNumber=1&PageSize=5&UserId=1
         return this.http.get<Message[]>(this.baseUrl+'Messages',{ observe: 'response',params})
         .pipe(
             map(response =>  {
                 paginateResult.result  = response.body;
                 if(response.headers.get('Pagination') != null){
                   paginateResult.pagination = JSON.parse(response.headers.get('Pagination'));
                 }            
             return paginateResult;
             })
         );
    }

    getMessageThread(id:number ,recipientId:number){
        return this.http.get(this.baseUrl + 'Messages/'+ recipientId + '/'+ id);
    }

    sendMessage(userId:number,  newMessage: any){
        return this.http.post(this.baseUrl + 'Messages/'+ newMessage.recipientId,newMessage);
    }

    deleteMessage(userId:number,id:number){
        return this.http.delete(this.baseUrl + 'Messages/'+ id + '/user/'+ userId);
    }

    markAsRead(userId : number,id:number){
        this.http.post(this.baseUrl + 'Messages/'+ id + '/user/'+ userId + '/read' , {});

    }
}