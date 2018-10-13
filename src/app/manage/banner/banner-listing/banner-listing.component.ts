import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from '../shared/banner.model';
import { BannerService } from '../shared/banner.service';
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
  selector: 'app-banner-listing',
  templateUrl: './banner-listing.component.html',
  styleUrls: ['./banner-listing.component.css']
})
export class BannerListingComponent implements OnInit {
  banners: Banner[] = [];
  banner = new Banner();
  selectedTTs: Banner[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'BannerTitle', header: 'Title' },
    { field: 'BannerType', header: 'Type' },
    { field: 'DestinationName', header: 'DestinationName' },
    { field: 'FromDate', header: 'From Date' },
    { field: 'ToDate', header: 'To Date' },
    { field: 'BannerImage', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedfacilityTypeString: string = "";
  nameId: any;
  actionStatus: boolean;
  checkedValue: any;
  selectedBannerString: string = "";
  loading:any;
  readonly defaultImageUrl = environment.DefaultImageTourtype;

  constructor(private _ttService: BannerService, private _router: Router, private  alert: AleartService) {    
  this.loading=false;
  }

  ngOnInit() {
    this.loading=true;
    this.GetBannerList();    
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
            this.selectedBannerString += element.ID + ",";
          });
          this.selectedBannerString = this.selectedBannerString.length > 0 ? this.selectedBannerString.substring(0, this.selectedBannerString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = true;
            else
              this.actionStatus = false;
            this._ttService.ActionStatus(this.selectedBannerString, this.actionStatus).subscribe((data: any) => {
              this.GetBannerListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ttService.ActionDelete(this.selectedBannerString).subscribe((data: any) => {
              this.GetBannerListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedBannerString = "";
          this.nameId = -1;

        } //if ends 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
     
    }

    else {
      alert('Please select atleast one Banner');
    }
  }
  GetBannerList() {
    this.GetBannerListFromService();
  }

  DeleteBanner(tt) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.DeleteBannerFromService(tt);
      this.GetBannerListFromService();
    }
  }

  GetBannerListFromService() {
    this._ttService.GetBannerList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        this.imageExists(element.BannerImage, function (exists) {
          if (!exists) {
            element.BannerImage = environment.DefaultImageTourtype;
          }
        });
      });
      this._ttService.setbanners(data.data);
      this.banners = this._ttService.getbanners();
      // this.banners = data.data;
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteBannerFromService(tt) {
    this._ttService.DeleteBanner(tt).subscribe((data: any) => {
      this.GetBannerListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertBanner() {
    let banner = new Banner();
    this._ttService.setter(banner);
    this._router.navigate(['/manage/banner/form'])
  }


  UpdateBanner(tt) {
    this._ttService.setter(tt);
    this._router.navigate(['/manage/banner/form'])
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }
  Status(changeTo, ft: Banner) {
    if (confirm('Are you sure to perform this action?') == true) {
      
        console.log(changeTo, ft);
         ft.IsActive = changeTo;
     
          if (changeTo == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          this._ttService.SubActionStatus(ft, this.actionStatus).subscribe((data: any) => {
            this.GetBannerListFromService();
          }, (error) => {
            console.log(error);
          });
        
      
    }
    else{
      this.GetBannerListFromService();
    }
    
    

    
  }
}
