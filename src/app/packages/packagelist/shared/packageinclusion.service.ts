import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Packageinclusion } from './packageinclusion.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PackageinclusionService {

  readonly rootUrl = environment.WebAPIUrl;
  private packageInclusion = new Packageinclusion();

  setter(p: Packageinclusion) {
    this.packageInclusion = p;
  }

  getter() {
    return this.packageInclusion;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetPackageInclusionList(packageId: number) {
    const body = {
      ID: 0,
      PackageID: packageId,
      Inclusion: "",
      Exclusion: "",
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageinclusion', JSON.stringify(body), { headers: reqHeader });
  }

  InsertPackageInclusion(id: number,packageId : number, inclusion : string, exclusion : string, operationType : string) {
    const body = {
      ID: id,
      PackageID: packageId,
      Inclusion: inclusion,
      Exclusion: exclusion,
      IsActive: 1,
      OperationType:operationType,
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageinclusion', JSON.stringify(body), { headers: reqHeader });
  }

  DeletePackageInclusion(piId: number, packageId: number) {
    const body = {
      ID: piId,
      PackageID: packageId,
      Inclusion: "",
      Exclusion: "",
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageinclusion', JSON.stringify(body), { headers: reqHeader });
  }

  GetPackageInclusionByID(piId: number, packageId: number) {
    const body = {
      ID: piId,
      PackageID: packageId,
      Inclusion: "",
      Exclusion: "",
      IsActive: 1,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageinclusion', JSON.stringify(body), { headers: reqHeader });
  }

}
