import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Packageinfo } from './packageinfo.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PackageinfoService {

  readonly rootUrl = environment.WebAPIUrl;
  private packageInfo = new Packageinfo();

  setter(p: Packageinfo) {
    this.packageInfo = p;
  }

  getter() {
    return this.packageInfo;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  GetPackageInfoList(packageId: number) {
    const body = {
      ID: packageId,
      Info: "required",
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageinfo', JSON.stringify(body), { headers: reqHeader });
  }

  InsertPackageInfo(packageId: number, info : string) {
    const body = {
      ID: packageId,
      Info: info,
      OperationType: "packageinfo",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageinfo', JSON.stringify(body), { headers: reqHeader });
  }


}
