import { Component, OnInit } from '@angular/core';
import { FacilityType } from '../shared/facility-type.model';
import { FacilityTypeService } from '../shared/facility-type.service';
import { Router } from '@angular/router';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { ActiveInactive } from '../shared/active-inactive.model';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-facilitytype-form',
  templateUrl: './facilitytype-form.component.html',
  styleUrls: ['./facilitytype-form.component.css']
})
export class FacilitytypeFormComponent implements OnInit {

  //FOR INPUT RESET
  @ViewChild('facilityImage')
  facilityImage: any;


   facilityType: FacilityType;

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
  constructor(private _ftService: FacilityTypeService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.facilityType = this._ftService.getter();
    if (this.facilityType.ID == undefined) {
      this.buttonName = "Add";
    }
    else {
      this.buttonName = "Update";
    }
    if (this.facilityType.IsActive != undefined) {
      if (this.facilityType.IsActive == 1) {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Facility Type";
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
    this.isClickedOnce = true;
    this.loading=true;
    var facilityTypeName = $("#facilityName").val().toString();    
    if ($.trim(facilityTypeName) == "") {
      this.facilityType.Name = "";
      this.loading=false;
      alert('Please add facility type name');
    }
    else {
      this.facilityType.IsActive = this.isActiveId;
      if (this.facilityType.ID == undefined) {
        this._ftService.InsertFacilityType(this.facilityType).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            
            this.UploadImageAfterInsert(tt.data[0].ID);
             alert("Facility Type added successfully");
             this._ftService.set_facilities(tt.data);
             this.loading=false;
            this._router.navigate(['/manage/facility_type']);
          }
          else {
            this.loading=false;
            alert('Facility type already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } 
      else {
        this._ftService.UpdateFacilityType(this.facilityType).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(this.facilityType.ID);
            
            alert( "Facility Type updated successfully");
            this._ftService.set_facilities(tt.data);
            this.loading=false;
            this._router.navigate(['/manage/facility_type']);
          }
          else {
            this.loading=false;
            alert('Facility Type already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToFacilityType() {
    this._router.navigate(['/manage/facility_type']);
  }

  UploadImageAfterInsert(id) {
    this._ftService.UploadImage(id, this.formData).subscribe((data: any) => {
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
    console.log(this.facilityImage.nativeElement.files);
    this.facilityImage.nativeElement.value = "";
    console.log(this.facilityImage.nativeElement.files);
}
}
