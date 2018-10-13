import { Component, OnInit, ViewChild } from '@angular/core';
import { WayToReach } from '../shared/way-to-reach.model';
import { ActiveInactive } from '../../facility-type/shared/active-inactive.model';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { WayToReachService } from '../shared/way-to-reach.service';

@Component({
  selector: 'app-way-to-reach-form',
  templateUrl: './way-to-reach-form.component.html',
  styleUrls: ['./way-to-reach-form.component.css']
})
export class WayToReachFormComponent implements OnInit {
  
  //FOR INPUT RESET
  @ViewChild('wayToReachImage')
  wayToReachImage: any;

   wayToReach: WayToReach;

  selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
  //  facilites: FacilityType[];
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
  constructor(private _wtrService: WayToReachService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.wayToReach = this._wtrService.getter();
    if (this.wayToReach.ID == undefined) {
      this.buttonName = "Add";
    }
    else {
      this.buttonName = "Update";
    }
    if (this.wayToReach.IsActive != undefined) {
      if (this.wayToReach.IsActive == 1) {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Way to reach";
  }

  onChange(event) {
    var files = event.srcElement.files;
    console.log(files[0].type)
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
    var wayToReachName = $("#wayToReachName").val().toString();    
    if ($.trim(wayToReachName) == "") {
      this.wayToReach.Name = "";
      this.loading=false;
      alert('Please add Way to reach name');
    }
    else {
      this.wayToReach.IsActive = this.isActiveId;
      //INSERT
      if (this.wayToReach.ID == undefined) {
        this._wtrService.InsertWayToReach(this.wayToReach).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(tt.data[0].ID);
            console.log(tt);

             alert("Way to reach added successfully");

             this._wtrService.set_wayToReachCollection(tt.data);
             this.loading=false;
            this._router.navigate(['/manage/way_to_reach']);
          }
          else {
            this.loading=false;
            alert('Way to reach already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } 
      else {
        this._wtrService.UpdateWayToReach(this.wayToReach).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(this.wayToReach.ID);
            alert( "Way to reach updated successfully");
            this._wtrService.set_wayToReachCollection(tt.data);
            this.loading=false;
            this._router.navigate(['/manage/way_to_reach']);
          }
          else {
            this.loading=false;
            alert('Way to reach already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToWayToReach() {
    this._router.navigate(['/manage/way_to_reach']);
  }

  UploadImageAfterInsert(id) {
    this._wtrService.UploadImage(id, this.formData).subscribe((data: any) => {
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
    console.log(this.wayToReachImage.nativeElement.files);
    this.wayToReachImage.nativeElement.value = "";
    console.log(this.wayToReachImage.nativeElement.files);
}
}