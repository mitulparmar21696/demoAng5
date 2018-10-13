import { Injectable } from '@angular/core';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RoomType } from './room-type.model';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});
@Injectable()
export class RoomTypeService {
  readonly rootUrl = environment.WebAPIUrl;
  private roomType = new RoomType();
  private roomTypeCollection: RoomType[];

  setter(roomType: RoomType) {
    this.roomType = roomType;
  }

  getter() {
    return this.roomType;
  }

  set_roomTypeCollection( roomTypeCollection: RoomType[]) {
    this.roomTypeCollection = roomTypeCollection;
  }

  getRoomTypeCollection() {
    return this.roomTypeCollection;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetRoomTypeList() {
    const body = {
      ID: "",
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'roomtype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  InsertRoomType(roomType: RoomType) {
    const body = {
      ID: "",
      Name: roomType.Name,
      IsActive: roomType.IsActive ,
      OperationType: "insert"
    };

    return this.http.post(this.rootUrl + 'roomtype', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateRoomType(roomType: RoomType) {
    const body = {
      ID: roomType.ID,
      Name: roomType.Name,
      IsActive: roomType.IsActive,
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'roomtype', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteRoomType(roomType: RoomType) {

    const body = {
      ID: roomType.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'roomtype', JSON.stringify(body), { headers: reqHeader });
  }

  GetRoomTypeByID(roomType: RoomType) {

    const body = {
      ID: roomType.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'roomtype', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'roomTypeimageupload/' + id + '/image', formData, { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'roomtype', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'roomtype', JSON.stringify(body), { headers: reqHeader });
  }

}
