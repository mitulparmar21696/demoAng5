import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';
import { AleartService } from '../../../core/service/alert.service';
// import { AleartService } from '../../../core/service/alert.service.spec';
import { Router } from '@angular/router';

// import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {

  hotels: Hotel[] = [];
  selectedTTs: Hotel[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  private cols: any[] = [
    { field: 'Name', header: 'Hotel Name' },
    { field: 'CityName', header: 'City Name' },
    { field: 'Mobile', header: 'Mobile Number' },
    { field: 'Email', header: 'Email' },
    { field: 'Pincode', header: 'Pin code' },
    // { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedHotelString: string = "";
  nameId: any;
  actionStatus: boolean;
  loading:any;

  readonly defaultImageUrl = environment.DefaultImageTourtype;

  constructor(private _ttService: HotelService, private _router: Router, private  alert: AleartService) {
    this.loading=false;    
  }


  ngOnInit() {
    this.loading=true;
    this.GetHotelList();    
    this.nameId = '1';
  }
  CustomAction() {
    //console.log(this.nameId);
    // if( this.selectedFTs == null) {
    //   this.aleart.showError("please select the values where you want changes!")
    // }
    if (this.nameId && this.selectedTTs && this.selectedTTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
          this.selectedTTs.forEach(element => {
            this.selectedHotelString += element.ID + ",";
          });
          this.selectedHotelString = this.selectedHotelString.length > 0 ? this.selectedHotelString.substring(0, this.selectedHotelString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = true;
            else
              this.actionStatus = false;
            this._ttService.ActionStatus(this.selectedHotelString, this.actionStatus).subscribe((data: any) => {
              this.GetHotelListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ttService.ActionDelete(this.selectedHotelString).subscribe((data: any) => {
              this.GetHotelListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedHotelString = "";
          this.nameId = -1;

        } //if ends 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
     
    }

    else {
      alert('Please select atleast one hotel');
    }
  }
 

  GetHotelList() {
    this.GetHotelListFromService();
  }

  DeleteHotel(tt) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.DeleteHotelFromService(tt);
      this.GetHotelListFromService();
    }
  }

  GetHotelListFromService() {
    this._ttService.GetHotelList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        this.imageExists(element.Image, function (exists) {
          if (!exists) {
            element.Image = environment.DefaultImageTourtype;
          }
        });
      });
      this.hotels = data.data;
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteHotelFromService(tt) {
    this._ttService.DeleteHotel(tt).subscribe((data: any) => {
      this.GetHotelListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertHotel() {
    let hotel = new Hotel();
    this._ttService.setter(hotel);
    this._router.navigate(['/manage/hotel/form'])
  }


  UpdateHotel(tt) {
    this._ttService.setter(tt);
    this._router.navigate(['/manage/hotel/form'])
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }
  Status(changeTo, ft: Hotel) {
    if (confirm('Are you sure to perform this action?') == true) {
      
        console.log(changeTo, ft);
         ft.IsActive = changeTo;
     
          if (changeTo == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          this._ttService.SubActionStatus(ft, this.actionStatus).subscribe((data: any) => {
            this.GetHotelListFromService();
          }, (error) => {
            console.log(error);
          });
        
      
    }
    else{
      this.GetHotelListFromService();
    }
    
    

    
  }
}
