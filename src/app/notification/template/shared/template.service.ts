import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import { Hotel } from './hotel.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TemplateService {
  readonly rootUrl = environment.WebAPIUrl;
  private template :any;

  setter(tt: any) {
    
    this.template = tt;
  }

  getter() {
    
    
    return this.template;
  }
  
  constructor(private http: HttpClient) { }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  saveTemplate(data:any) {
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    
    return this.http.post(this.rootUrl + 'notificationtemplate', data, { headers: reqHeader });
    
    }
    getTemplateList(data:any) {
      data.OperationType ="listing" 
      var reqHeader = new HttpHeaders({
        //'No-Auth': 'True',
        'Content-Type': 'application/json'
      });
      return this.http.post(this.rootUrl + 'notificationtemplate', data, { headers: reqHeader });
      
      }

}
