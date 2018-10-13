import { Component, OnInit } from '@angular/core';
import { RoomType } from '../shared/room-type.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { RoomTypeService } from '../shared/room-type.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-room-type-listing',
  templateUrl: './room-type-listing.component.html',
  styleUrls: ['./room-type-listing.component.css']
})
export class RoomTypeListingComponent implements OnInit {

  roomTypeCollection: RoomType[] = [];
  roomType = new RoomType();
  selectedRoomTypes: RoomType[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedroomTypeString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;


  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _roomTypeService: RoomTypeService, 
              private _router: Router ) {
                this.loading=false;    
  }

  ngOnInit() {
    this.loading=true;
    this.GetRoomTypeListFromService();  
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedRoomTypes && this.selectedRoomTypes.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedRoomTypes.forEach(element => {
            this.selectedroomTypeString += element.ID + ",";
          });
          this.selectedroomTypeString = this.selectedroomTypeString.length > 0 ? this.selectedroomTypeString.substring(0, this.selectedroomTypeString.length - 1) : ""
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._roomTypeService.ActionStatus(this.selectedroomTypeString, this.actionStatus).subscribe((data: any) => {
              this.GetRoomTypeListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._roomTypeService.ActionDelete(this.selectedroomTypeString).subscribe((data: any) => {
              this.GetRoomTypeListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedroomTypeString = "";
          this.nameId = -1;

        } //if ends 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one room type');
    }
  }

  GetRoomTypeList() {
    this.GetRoomTypeListFromService();
  }

  DeleteRoomType(tt) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.DeleteRoomTypeFromService(tt);
      this.GetRoomTypeListFromService();
    }
    else {
        this.GetRoomTypeListFromService();
      }
  }

  GetRoomTypeListFromService() {
    this._roomTypeService.GetRoomTypeList().subscribe((data: any) => {
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourType;
        //   }
        // });
      });
      this._roomTypeService.set_roomTypeCollection(data.data);
      this.roomTypeCollection = this._roomTypeService.getRoomTypeCollection();
      this.loading=false;
    }, (error) => {
      console.log(error);
    });
  }

  DeleteRoomTypeFromService(tt) {
    this._roomTypeService.DeleteRoomType(tt).subscribe((data: any) => {
      this.GetRoomTypeListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertRoomType() {
    let roomType = new RoomType();
    this._roomTypeService.setter(roomType);
    this._router.navigate(['/manage/room_type/form'])
  }


  UpdateRoomType(tt) {
        this._roomTypeService.setter(tt);
        this._router.navigate(['/manage/room_type/form'])
 
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: RoomType) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      ft.IsActive = changeTo;
      this._roomTypeService.UpdateRoomType(ft).subscribe((success:any) => {
      this._roomTypeService.set_roomTypeCollection(success.data);
      this.roomTypeCollection = this._roomTypeService.getRoomTypeCollection();
    });
    }
      
    else 
      {
        this.GetRoomTypeListFromService();
      }
     
  }

}
