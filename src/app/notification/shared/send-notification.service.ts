import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class SendNotificationService {

    readonly rootUrl = environment.WebAPIUrl;
    private notification:any;
    constructor(private http: HttpClient) { 
        this.notification={};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    setter(dt:any){
        this.notification=dt;
    }
    getter(){
        return this.notification;
    }
    GetSendNotificationList() {
        const body = {
            OprationType:"listing",
        };
        var reqHeader = new HttpHeaders({
          //'No-Auth': 'True',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootUrl + 'notificationsend', JSON.stringify(body), { headers: reqHeader });
        // .map((response: Response) => response.json())
        // .catch(this.handleError);
    }
    GetUserList() {
        const body = {
            "OperationType":"listing"
        };
        var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootUrl + 'userregistrations', body, { headers: reqHeader });
    }
    saveNotifications(data:any) {
        var reqHeader = new HttpHeaders({
          //'No-Auth': 'True',
          'Content-Type': 'application/json'
        });
        
        return this.http.post(this.rootUrl + 'notificationsend', data, { headers: reqHeader });
        
        }
        deleteNotification(id:any){
            const body = {
                "OperationType":"delete",
                "ID":id
            };
            var reqHeader = new HttpHeaders({
                //'No-Auth': 'True',
                'Content-Type': 'application/json'
              });
              
            return this.http.post(this.rootUrl + 'notificationsend', body, { headers: reqHeader });
        }

}