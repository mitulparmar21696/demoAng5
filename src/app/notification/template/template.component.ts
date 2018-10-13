import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Template } from '../shared/template.model';
import {TemplateService} from '../template/shared/template.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  private loading:any;
  private templates: Template[] = [];
  private selectedTemplates: Template[] = [];
  private actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' }
  ];
  private cols: any[] = [
    { field: 'UserType', header: 'User Type' },
    { field: 'Event', header: 'Event' },
    // { field: 'IsEmail', header: 'Is Email' },
    // { field: 'Subject', header: 'Subject' },
    // { field: 'IsSMS', header: 'Is SMS' },
    // { field: 'SMS', header: 'SMS' },
    // { field: 'IsPush', header: 'Is Push' },
    // { field: 'PushNote', header: 'Push Note' },
    // { field: 'LastChanged', header: 'Last Changed' },
    { field: 'IsActive', header: 'Status' }
  ];
  
  constructor(private _ttService:TemplateService,private _router:Router) {
    this.loading=false;
   }

  ngOnInit() {
    this.loading=true;
    this.GetTemplatesList();
  }

  GetTemplatesList(){
    let template = {
      ID: 1,
      NotificationUserType:1,
      Event: 'Hotel Booking-Admin',
      IsEmail: 1,
      Subject: 'Hotel Bookings are open for admin',
      EmailText: 'Hotel Booking Content',
      IsSMS: 1,
      SMSText: 'This is content for SMS',
      IsPush: 1,
      PushNotificationText: 'Push Message Note',
      LastChanged: '12/06/2018',
      IsActive: 1
    }
    
    this._ttService.getTemplateList(template).subscribe((tt: any) => {
      if (tt.status === 200 || tt.status === '200') {
        tt.data.forEach(element => {
          var detail=element;
          if(element.NotificationUserType == 1){
            detail.UserType='Agent';
          }else{
            detail.UserType='Customer';
          }
          this.templates.push(detail)
        });
        this.loading=false;
      } else {
      }
    }, (error) => {
      console.log(error);
    });
  }

  InsertNotificationTemplate(){

  }

  UpdateTemplate(tt) {
    
    this._ttService.setter(tt);
    this._router.navigate(['notification/template-form'])
  }


  DeleteTempate(template:Template){
    console.log("In Delete...");
  }

}
