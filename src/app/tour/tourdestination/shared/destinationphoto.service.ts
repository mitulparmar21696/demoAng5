import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
import { Destinationphoto } from './destinationphoto.model';

@Injectable()
export class DestinationphotoService {


  readonly rootUrl = environment.WebAPIUrl;  
  private dp = new Destinationphoto();

  setter(dp: Destinationphoto) {
    this.dp = dp;
  }

  getter() {
    return this.dp;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetDestinationPhotoList(destinationId : number) {
    const body = {
      ImageID: 0,
      DestinationID: destinationId,    
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'DestinationPhotoList', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteDestinationPhoto(imageId : number, destinationId : number) {
    const body = {
      ImageID: imageId,
      DestinationID: destinationId,    
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'DestinationPhotoList', JSON.stringify(body), { headers: reqHeader });
  }

  UploadImage(imageId: number, title: string, destinationId: number, ismain: boolean, operationType: string, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    let isMainImage = ismain == true ? 1 : 0;
    var url = this.rootUrl + 'destinationimage/' + imageId + '/' + destinationId + '/' + title + '/' + isMainImage + '/' + operationType;
    return this.http.post(url, formData, { headers: reqHeader });    
  }

}
