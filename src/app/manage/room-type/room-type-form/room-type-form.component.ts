import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomType } from '../shared/room-type.model';
import { ActiveInactive } from '../../facility-type/shared/active-inactive.model';
import { RoomTypeService } from '../shared/room-type.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';

@Component({
  selector: 'app-room-type-form',
  templateUrl: './room-type-form.component.html',
  styleUrls: ['./room-type-form.component.css']
})
export class RoomTypeFormComponent implements OnInit {

  
  //FOR INPUT RESET
  @ViewChild('roomImage')
  roomImage: any;

   roomType: RoomType;

  selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
 
   buttonName: string = "Add";

   isClickedOnce: boolean = false;

   isInvalidFile: boolean = false;

   DropdownIsActiveList = [
    new ActiveInactive(1, "Active"),
    new ActiveInactive(0, "Inactive")
  ];
formData = new FormData();
isActiveId: any;
loading:any;
constructor(private _roomTypeService: RoomTypeService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.roomType = this._roomTypeService.getter();
    if (this.roomType.ID == undefined) {
      this.buttonName = "Add";
    }
    else {
      this.buttonName = "Update";
    }
    if (this.roomType.IsActive != undefined) {
      if (this.roomType.IsActive == "1") {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Room Type";
  }

  onChange(event) {
    var files = event.srcElement.files;
    if( files[0].type  == 'image/png' ||  files[0].type == 'image/jpg'  ||  files[0].type == 'image/jpeg') {
      this.isInvalidFile = false;
      this.formData.append('Data', files[0], files[0].name);    
    }
    else {
      alert("Only Image files can be uploaded");
      this.resetImage();
      this.isInvalidFile = true;
      return this.isInvalidFile;
    }
  }


  processForm() {
    this.loading=true;
    this.isClickedOnce = true;
    var roomTypeName = $("#roomTypeName").val().toString();    
    if ($.trim(roomTypeName) == "") {
      this.roomType.Name = "";
      this.loading=false;
      alert('Please add room type name');
    }
    else {
      this.roomType.IsActive = this.isActiveId;
      //INSERT
      if (this.roomType.ID == undefined) {
        this._roomTypeService.InsertRoomType(this.roomType).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(tt.data[0].ID); 

             alert("Room Type added successfully");
            
             this._roomTypeService.set_roomTypeCollection(tt.data);
             this.loading=false;
             this._router.navigate(['/manage/room_type']);
          }
          else {
            this.loading=false;
            alert('Room type already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } 
      //UPDATE
      else {
        this._roomTypeService.UpdateRoomType(this.roomType).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(this.roomType.ID);
            

            alert( "Room Type updated successfully");

            this._roomTypeService.set_roomTypeCollection(tt.data);
            this.loading=false;
            this._router.navigate(['/manage/room_type']);
          }
          else {
            this.loading=false;
            alert('Room Type already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToRoomType() {
    this._router.navigate(['/manage/room_type']);
  }
  UploadImageAfterInsert(id) {
    this._roomTypeService.UploadImage(id, this.formData).subscribe((data: any) => {
      this.loading=false;
      return data;
    }, (error) => {
      console.log(error);
    })
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg'
      || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'img') {
      return true;
    }
    else {
      return false;
    }
  }

  resetImage() {
    console.log(this.roomImage.nativeElement.files);
    this.roomImage.nativeElement.value = "";
    console.log(this.roomImage.nativeElement.files);
}

}
