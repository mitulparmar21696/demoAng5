import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Packageimage } from './packageimage.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PackageimageService {

  readonly rootUrl = environment.WebAPIUrl;
  private packageImage = new Packageimage();

  setter(p: Packageimage) {
    this.packageImage = p;
  }

  getter() {
    return this.packageImage;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetPackageImageList(packageId: number) {
    var fd = new FormData();
    var url = this.rootUrl + 'adminItineraryImage/' + packageId + '/listing';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(url, fd, { headers: reqHeader });
  }

  InsertPackageImage(imageData : any, packageId : number, operationType : string) {
    var fd = new FormData();
    fd.append("JsonData", JSON.stringify(imageData));
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.rootUrl + 'adminItineraryImage/' + packageId + '/' + operationType, fd, { headers: reqHeader });
  }

  UpdatePackageImage(pi: Packageimage) {
    const body = {
      ID: pi.ID,
      ImageID: pi.ImageID,
      PackageID: pi.PackageID,
      IsMain: pi.IsMain,
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageimage', JSON.stringify(body), { headers: reqHeader });
  }

  DeletePackageImage(pi: Packageimage) {
    const body = {
      ID: pi.ID,
      ImageID: pi.ImageID,
      PackageID: pi.PackageID,
      IsMain: pi.IsMain,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageimage', JSON.stringify(body), { headers: reqHeader });
  }

  GetPackageImageByID(pi: Packageimage) {
    const body = {
      ID: pi.ID,
      ImageID: pi.ImageID,
      PackageID: pi.PackageID,
      IsMain: pi.IsMain,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageimage', JSON.stringify(body), { headers: reqHeader });
  }

  ImageUpload(packageId: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'packagedocument/' + packageId + "/insert", formData, { headers: reqHeader });
  }

}
