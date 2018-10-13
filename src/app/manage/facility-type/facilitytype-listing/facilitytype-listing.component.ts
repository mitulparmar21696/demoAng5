import { Component, OnInit } from '@angular/core';
import { FacilityTypeService } from '../shared/facility-type.service';
import { FacilityType } from '../shared/facility-type.model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-facilitytype-listing',
  templateUrl: './facilitytype-listing.component.html',
  styleUrls: ['./facilitytype-listing.component.css']
})
export class FacilitytypeListingComponent implements OnInit {

  facilities: FacilityType[] = [];
  facility = new FacilityType();
  selectedFTs: FacilityType[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'Description', header: 'Description' },
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedfacilityTypeString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;


  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _ttService: FacilityTypeService, 
              private _router: Router ) {
                this.loading=false;    
  }

  ngOnInit() {
    this.loading=true;
    this.GetFacilityTypeListFromService();  
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedFTs && this.selectedFTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedFTs.forEach(element => {
            this.selectedfacilityTypeString += element.ID + ",";
          });
          this.selectedfacilityTypeString = this.selectedfacilityTypeString.length > 0 ? this.selectedfacilityTypeString.substring(0, this.selectedfacilityTypeString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._ttService.ActionStatus(this.selectedfacilityTypeString, this.actionStatus).subscribe((data: any) => {
              this.GetFacilityTypeListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ttService.ActionDelete(this.selectedfacilityTypeString).subscribe((data: any) => {
              this.GetFacilityTypeListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedfacilityTypeString = "";
          this.nameId = -1;

        }  
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one facility type');
    }
  }

  GetFacilityTypeList() {
    this.GetFacilityTypeListFromService();
  }

  DeleteFacilityType(tt) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.DeleteFacilityTypeFromService(tt);
      this.GetFacilityTypeListFromService();
    }
    else {
        this.GetFacilityTypeListFromService();
      }
  }

  GetFacilityTypeListFromService() {
    this._ttService.GetFacilityTypeList().subscribe((data: any) => {
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourtype;
        //   }
        // });
      });
      this._ttService.set_facilities(data.data);
      this.facilities = this._ttService.getFacilities();
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteFacilityTypeFromService(tt) {
    this._ttService.DeleteFacilityType(tt).subscribe((data: any) => {
      this.GetFacilityTypeListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertFacilityType() {
    let facilityType = new FacilityType();
    this._ttService.setter(facilityType);
    this._router.navigate(['/manage/facility_type/form'])
  }

  UpdateFacilityType(tt) {
        this._ttService.setter(tt);
        this._router.navigate(['/manage/facility_type/form'])
     }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: FacilityType) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      ft.IsActive = changeTo;
      this._ttService.UpdateFacilityType(ft).subscribe((success:any) => {
        //ADDED TO UPLOAD IMAGE
        success.data.forEach(element => {
          element.IsActive = element.IsActive == 1 ? true : false;
          // this.imageExists(element.Image, function (exists) {
          //   if (!exists) {
          //     element.Image = environment.DefaultImageTourtype;
          //   }
          // });
        });
      this._ttService.set_facilities(success.data);
      this.facilities = this._ttService.getFacilities();
      
    });
    }
      
    else 
      {
        this.GetFacilityTypeListFromService();
      }
  }
}
