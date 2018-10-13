import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Packagefaq } from './packagefaq.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PackagefaqService {

  readonly rootUrl = environment.WebAPIUrl;
  private packageFAQ = new Packagefaq();

  setter(p: Packagefaq) {
    this.packageFAQ = p;
  }

  getter() {
    return this.packageFAQ;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetPackageFAQList(packageId: number) {
    const body = {
      FAQID: 0,
      PackageID: packageId,
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageFAQ', JSON.stringify(body), { headers: reqHeader });
  }

  PackageFAQOPeraions(packageId : number, faqIds : string, operationType : string) {
    const body = {
      FAQID: faqIds,
      PackageID: packageId,
      IsActive: 1,
      OperationType: operationType,
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageFAQ', JSON.stringify(body), { headers: reqHeader });
  }

  // UpdatePackageFAQ(packageId : number, faqIds : string) {
  //   const body = {
  //     FAQID: faqIds,
  //     PackageID: packageId,
  //     IsActive: 1,
  //     OperationType: "update",
  //   };
  //   var reqHeader = new HttpHeaders({
  //     //'No-Auth': 'True',
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post(this.rootUrl + 'packageFAQ', JSON.stringify(body), { headers: reqHeader });
  // }

  DeletePackageFAQ(faqId: number, packageId: number) {
    const body = {
      FAQID: faqId,
      PackageID: packageId,
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageFAQ', JSON.stringify(body), { headers: reqHeader });
  }

  GetPackageFAQByID(faqId: number, packageId: number) {
    const body = {
      FAQID: faqId,
      PackageID: packageId,
      IsActive: 1,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageFAQ', JSON.stringify(body), { headers: reqHeader });
  }

}
