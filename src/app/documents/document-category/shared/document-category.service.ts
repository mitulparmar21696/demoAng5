import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
import { DocumentCategory } from './document-category.model';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class DocumentCategoryService {

  readonly rootUrl = environment.WebAPIUrl;
  private documentCategory = new DocumentCategory();
  private documents: DocumentCategory[];

  setter(tt: DocumentCategory) {
    this.documentCategory = tt;
  }

  getter() {
    return this.documentCategory;
  }

  set_documents( documents: DocumentCategory[]) {
    this.documents = documents;
  }

  getDocuments() {
    return this.documents;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetDocumentCategoryList() {
    const body = {
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'documentcategory', JSON.stringify(body), { headers: reqHeader });
  }

  InsertDocumentCategory(dc: DocumentCategory) {
    const body = {
      AdminID: "0",
      Description: dc.Description ,
      ID: "0",
      IsActive: dc.IsActive == true ? 1 : 0,
      IsUser: dc.IsUser,  
      Name: dc.Name,
      OperationType: "INSERT"
    };
    
    return this.http.post(this.rootUrl + 'documentcategory', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateDocumentCategory(dc: DocumentCategory) {
    const body = {
      AdminID: "0",
      Description: dc.Description ,
      ID: dc.ID,
      IsActive: dc.IsActive == true ? 1 : 0,
      IsUser: dc.IsUser,  
      Name: dc.Name, 
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'documentcategory', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteDocumentCategory(ft: DocumentCategory) {

    const body = {
      ID: ft.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'documentcategory', JSON.stringify(body), { headers: reqHeader });
  }

  GetDocumentCategoryByID(ft: DocumentCategory) {

    const body = {
      ID: ft.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'documentcategory', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'documentcategoryimageupload/' + id + '/image', formData, { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: boolean) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive:  isActive == true ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'documentcategory', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'documentcategory', JSON.stringify(body), { headers: reqHeader });
  }
}
