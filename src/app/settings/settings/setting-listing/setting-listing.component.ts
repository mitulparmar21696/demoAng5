import { Component, OnInit, ViewChild } from '@angular/core';
import { Setting } from '../shared/setting.model';
import { SettingService } from '../shared/setting.service';
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
  selector: 'app-setting-listing',
  templateUrl: './setting-listing.component.html',
  styleUrls: ['./setting-listing.component.css']
})
export class SettingListingComponent implements OnInit {

  settings: Setting[] = [];
  selectedTTs: Setting[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },

  ];
  cols: any[] = [
    { field: 'SettingKey', header: 'Setting key' },
    // { field: 'Description', header: 'Description' },
    { field: 'Value', header: 'Setting value' },
    { field: 'ModifiedOn', header: 'Last Modified' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedSettingString: string = "";
  nameId: any;
  actionStatus: boolean;

  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _ttService: SettingService, private _router: Router, private  alert: AleartService) {    
  this.loading=false;
  }

  ngOnInit(): void {
    this.loading=true;
    this.GetSettingList();    
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
            this.selectedSettingString += element.ID + ",";
          });
          this.selectedSettingString = this.selectedSettingString.length > 0 ? this.selectedSettingString.substring(0, this.selectedSettingString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = true;
            else
              this.actionStatus = false;
            this._ttService.ActionStatus(this.selectedSettingString, this.actionStatus).subscribe((data: any) => {
              this.GetSettingListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          

          else {
            console.log('select valid action');
          }

          this.selectedSettingString = "";
          this.nameId = -1;

        } //if ends 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
     
    }

    else {
      alert('Please select atleast one settings');
    }
  }
  

  GetSettingList() {
    this.GetSettingListFromService();
  }

 

  GetSettingListFromService() {
    this._ttService.GetSettingList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        
      });
      this.settings = data.data;
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  

  InsertSetting() {
    let setting = new Setting();
    this._ttService.setter(setting);
    this._router.navigate(['/settings/settings/form'])
  }


  UpdateSetting(tt) {
    this._ttService.setter(tt);
    this._router.navigate(['/settings/settings/form'])
  }

 
  Status(changeTo, ft: Setting) {
    if (confirm('Are you sure to perform this action?') == true) {
        console.log(changeTo, ft);
      
         ft.IsActive = changeTo;
         this._ttService.UpdateSetting(ft).subscribe((success:any) => {
           this._ttService.setter(success.data);
           success.data.forEach(element => {
            element.IsActive = element.IsActive == "True" ? true : false;
            
          });
          this.settings = success.data;
         });
      }
      else 
      {
        this.GetSettingListFromService();
        console.log('dont do anything');
      }
    
    
    

    
  }

}
