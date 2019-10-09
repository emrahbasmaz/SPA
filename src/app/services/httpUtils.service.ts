import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilsService{

    getFindHttpParams(queryParams): HttpParams {
        const params = new HttpParams()
        .set('PageNumber',(queryParams.PageNumber + 1).toString())
        .set('PageSize',(queryParams.PageSize.toString()));

        return params;
    }

    getHttpHeader(){
        const token : string = <string>localStorage.getItem('token');

        return {
                headers: new HttpHeaders({ 'Content-Type' : 'application/json-patch+json',
                                            'accept': 'application/json', 'x-token':token})
               };
        }
    }
